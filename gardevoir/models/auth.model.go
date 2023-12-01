package models

import (
	"errors"
	"fmt"
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/config"
	"github.com/MasterBrian99/bukmarq/database"
	"github.com/MasterBrian99/bukmarq/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
)

func AuthModel() *BaseModel {
	mod := &BaseModel{
		ModelConstructor: &common.ModelConstructor{
			Gorm: database.Database,
		},
	}

	return mod
}

func (mod *BaseModel) LoginCheck(username, password string) (string, error) {
	var err error

	user := User{}

	err = mod.Gorm.Limit(1).Where("username=?", username).Find(&user).Error

	if err != nil || user.ID == 0 {
		return "", err
	}

	err = VerifyPassword(password, user.Password)

	if err != nil && errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		return "", err
	}

	token, err := GenerateToken(user)

	if err != nil {
		return "", err
	}

	return token, nil
}

func GenerateToken(user User) (string, error) {

	tokenLifespan, err := strconv.Atoi(config.GetEnvOrDefault("TOKEN_HOUR_LIFESPAN", "1000"))

	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(tokenLifespan)).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(config.GetEnv("API_SECRET")))

}
func (mod *BaseModel) CurrentUser(ctx *gin.Context) (User, error) {
	var user User

	userId, err := utils.ExtractTokenID(ctx)
	fmt.Println(user)

	if err != nil {
		return user, err
	}

	user = UsersModel().GetOneUser(userId)

	if err != nil {
		return user, err
	}

	return user, nil
}
func (mod *BaseModel) GetOneUser(userId uint) User {
	var user User

	result := mod.Gorm.Limit(1).Where("id = ?", userId).Find(&user)

	if result.Error != nil {
		fmt.Println(result.Error)
		return user
	}

	return user
}
