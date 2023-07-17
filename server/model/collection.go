package model

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Name string `gorm:"size:255;not null" json:"name"`
	//SubCollection []*Collection `gorm:"many2many:sub_collection;constraint:OnDelete:CASCADE"`
	ParentId uint         `gorm:"default:0" json:"parent_id"`
	Children []Collection `gorm:"foreignkey:parent_id"`
	UserID   uint         `json:"user_id"`
	User     User         `gorm:"foreignKey:user_id"`
}

func (collection *Collection) Save() (*Collection, error) {

	err := database.Database.Create(&collection).Error
	if err != nil {
		return nil, err
	}
	return collection, nil
}

func (collection *Collection) FindById(id int) (Collection, error) {

	var coll Collection
	err := database.Database.Where("id=?", id).Find(&coll).Limit(1).Error
	if err != nil {
		return Collection{}, err
	}
	return coll, nil
}

type CollectionList struct {
	ID       uint
	Name     string
	ParentId uint
}

func GetAllCollectionByParentID(id int, userID uint) ([]CollectionList, error) {

	var collectionList []CollectionList

	err := database.Database.Model(&Collection{}).Where("parent_id=?", id).Where("user_id=?", userID).Find(&collectionList).Error

	if err != nil {
		return []CollectionList{}, err
	}
	return collectionList, nil
}

func FindByCurrentUserAndID(id int, userID uint) (Collection, error) {
	var collection Collection

	err := database.Database.Where("id=?", id).Where("user_id=?", userID).Find(&collection).Error

	if err != nil {
		return Collection{}, err
	}

	return collection, nil

}

func (collection *Collection) UpdateCollection() error {

	err := database.Database.Save(&collection).Error

	if err != nil {
		return err
	}
	return nil
}

func GetUserCollectionTree(userID uint) ([]TreeItem, error) {
	var rootNodes []Collection
	result := database.Database.Preload("Children").Preload("User").Select("id, name, parent_id").Where("parent_id = 0 AND user_id = ?", userID).Find(&rootNodes)
	if result.Error != nil {
		fmt.Println("Failed to retrieve tree structure:", result.Error)
		return nil, result.Error
	}
	var tree []TreeItem
	for _, rootNode := range rootNodes {
		rootNode = retrieveChildren(database.Database, rootNode)
		rootItem := createTreeItem(rootNode)

		tree = append(tree, rootItem)
	}

	return tree, nil
}

func retrieveChildren(db *gorm.DB, node Collection) Collection {
	var children []Collection
	db.Preload("Children").Select("id, name, parent_id").Where("parent_id = ?", node.ID).Find(&children)
	node.Children = children

	for i := range children {
		children[i] = retrieveChildren(db, children[i])
	}

	return node
}

type TreeItem struct {
	ID       uint       `json:"id"`
	Name     string     `json:"name"`
	Children []TreeItem `json:"children"`
	ParentID uint       `json:"parent_id"`
}

func createTreeItem(node Collection) TreeItem {
	item := TreeItem{
		ID:       node.ID,
		Name:     node.Name,
		ParentID: node.ParentId,
	}

	for _, child := range node.Children {
		childItem := createTreeItem(child)
		item.Children = append(item.Children, childItem)
	}

	return item
}
