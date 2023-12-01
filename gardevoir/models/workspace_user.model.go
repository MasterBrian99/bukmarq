package models

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/database"
	"gorm.io/gorm"
)

type WorkspaceRole string

const (
	WorkspaceAdminRole WorkspaceRole = "admin"
	WorkspaceUserRole  WorkspaceRole = "user"
)

func WorkspaceUserModel() *BaseModel {
	mod := &BaseModel{
		ModelConstructor: &common.ModelConstructor{
			Gorm: database.Database,
		},
	}
	return mod
}

func MigrateWorkspaceUser() {
	err := database.Database.AutoMigrate(&WorkspaceUser{})
	if err != nil {
		return
	}
}

type WorkspaceUser struct {
	gorm.Model
	UserID      uint          `gorm:"column:user_id"`
	WorkspaceID uint          `gorm:"column:workspace_id"`
	UserRole    WorkspaceRole `gorm:"type:varchar(255);not null;default:'user'" json:"user_role"`
}
