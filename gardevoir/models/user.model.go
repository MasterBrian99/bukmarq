package models

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/database"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"html"
	"strings"
)

func UsersModel() *BaseModel {
	mod := &BaseModel{
		ModelConstructor: &common.ModelConstructor{
			Gorm: database.Database,
		},
	}
	return mod
}

func MigrateUsers() {
	err := database.Database.AutoMigrate(&User{})
	if err != nil {
		return
	}
}

type User struct {
	gorm.Model
	Username  string      `gorm:"type:varchar(255);unique;not null" json:"username"`
	Email     string      `gorm:"type:varchar(255);default:''" json:"email"`
	FirstName string      `gorm:"default:''"`
	LastName  string      `gorm:"default:''"`
	Password  string      `gorm:"not null"`
	Workspace []Workspace `gorm:"foreignKey:user_id"`
}

type AuthenticationInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email"`
}

func (mod *BaseModel) CreateUser(body AuthenticationInput) error {
	user := User{
		Email:    body.Email,
		Username: body.Username,
		Password: body.Password,
	}
	workspace := Workspace{
		Name:        "Personal",
		Description: "personal items",
	}
	err := mod.Gorm.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&user).Error; err != nil {
			return err
		}
		workspace.UserID = user.ID
		if err := tx.Create(&workspace).Error; err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return err
	}
	return nil
}

func (user *User) BeforeSave(*gorm.DB) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(passwordHash)
	user.Username = html.EscapeString(strings.TrimSpace(user.Username))
	user.Email = html.EscapeString(strings.TrimSpace(user.Email))
	return nil
}

func (mod *BaseModel) CheckUsernameAvailability(username string) (bool, error) {
	var user User
	record := database.Database.Where("username=?", username).Limit(1).Find(&user)
	if record.Error != nil {
		//if error send row is existed
		return true, nil
	} else if record.RowsAffected > 0 {
		//if record found send true

		return true, nil
	}
	//if not found record found send false
	return false, nil
}

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
