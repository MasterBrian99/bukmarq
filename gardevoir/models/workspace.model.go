package models

import (
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
}

type WorkspaceCreateInput struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
}
