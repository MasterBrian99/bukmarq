package main

import (
	"github.com/MasterBrian99/bukmarq/controller"
	"github.com/MasterBrian99/bukmarq/database"
	"github.com/MasterBrian99/bukmarq/models"
	"github.com/gin-gonic/gin"
)

// @title           Bukmarq Backend Server
// @version         0.0.1
// @description     Server Implementation
// @termsOfService  https://github.com/MasterBrian99/bukmarq

// @contact.name   API Support
// @contact.url    https://github.com/MasterBrian99/bukmarq
// @contact.email  pasindu@tuta.com

// @license.name  MIT
// @license.url   https://opensource.org/license/mit/

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.apikey Authentication
// @in header
// @name Authorization

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	r := gin.Default()

	database.InitDB()

	models.MigrateUsers()
	controller.UsersController(r)
	controller.AuthController(r)
	controller.SwaggersController(r)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
	print("Hello")
}
