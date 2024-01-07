package models

import (
	"errors"
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

func WorkspaceModel() *BaseModel {
	mod := &BaseModel{
		ModelConstructor: &common.ModelConstructor{
			Gorm: database.Database,
		},
	}
	return mod
}

func MigrateWorkspace() {
	err := database.Database.AutoMigrate(&Workspace{})
	if err != nil {
		return
	}
}

type Workspace struct {
	gorm.Model
	Name          string          `gorm:"type:varchar(255);not null" json:"name"`
	Description   string          `gorm:"type:text;default:''" json:"description"`
	WorkspaceUser []WorkspaceUser `gorm:"foreignKey:workspace_id"`
	Collection    []Collection    `gorm:"foreignKey:workspace_id"`
}

type WorkspaceCreateInput struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

type WorkspaceUpdateInput struct {
	Id uint `json:"id" binding:"required"`
	WorkspaceCreateInput
}

func (mod *BaseModel) CreateWorkspace(body WorkspaceCreateInput, user *User) error {
	workspace := Workspace{
		Name:        body.Name,
		Description: body.Description,
	}
	err := mod.Gorm.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&workspace).Error; err != nil {
			return err
		}
		workspaceUser := WorkspaceUser{
			WorkspaceID: workspace.ID,
			UserID:      user.ID,
			UserRole:    WorkspaceAdminRole,
		}
		if err := tx.Create(&workspaceUser).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil

}

type WorkspaceAll struct {
	Id          uint   `json:"id"`
	UserRole    string `json:"role"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (mod *BaseModel) GetAllWorkspacesByUser(user *User) ([]WorkspaceAll, error) {
	var result []WorkspaceAll
	err := mod.Gorm.Table("workspaces").
		Select("workspaces.id as id, workspace_users.user_role, workspaces.name, workspaces.description").
		Joins("inner join workspace_users on workspaces.id = workspace_users.workspace_id").
		Where("workspace_users.user_id = ?", user.ID).
		Scan(&result).Error

	if err != nil {
		return nil, err
	}
	//fmt.Printf("", result)
	return result, nil

}

func (mod *BaseModel) GetWorkspaceByUserAndWorkspaceRole(user *User, id uint, workspaceRole WorkspaceRole) (Workspace, bool, error) {
	var result Workspace
	err := mod.Gorm.Joins("INNER JOIN workspace_users wu ON workspaces.id = wu.workspace_id").
		Where("wu.user_id = ? AND wu.workspace_id = ? AND wu.user_role = ?", user.ID, id, workspaceRole).
		First(&result).
		Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return Workspace{}, false, nil
		}
		return Workspace{}, false, err
	}
	return result, true, nil
	//result, err := mod.Gorm.Table("workspaces").Where("workspace_users.user_id = ?", user.ID).Scan(&Workspace{}).Error
}

func (mod *BaseModel) UpdateWorkspace(workspace Workspace) error {
	err := mod.Gorm.Save(&workspace).Error
	if err != nil {
		return err
	}
	return nil
}
