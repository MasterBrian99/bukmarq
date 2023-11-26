package models

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Name string `gorm:"size:255;not null" json:"name"`
	//SubCollection []*Collection `gorm:"many2many:sub_collection;constraint:OnDelete:CASCADE"`
	ParentId uint `gorm:"default:0" json:"parent_id"`
	//Children []Collection `gorm:"foreignkey:parent_id"`
	WorkspaceID uint `gorm:"not null" json:"workspace_id"`
}

func CollectionModel() *BaseModel {
	mod := &BaseModel{
		ModelConstructor: &common.ModelConstructor{
			Gorm: database.Database,
		},
	}
	return mod
}

func MigrateCollections() {
	err := database.Database.AutoMigrate(&Collection{})
	if err != nil {
		return
	}
}
