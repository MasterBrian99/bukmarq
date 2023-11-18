package controller

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/helpers"
	"github.com/MasterBrian99/bukmarq/middleware"
	"github.com/MasterBrian99/bukmarq/models"
	"github.com/MasterBrian99/bukmarq/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthController(r *gin.Engine) *BaseController {
	ctr := &BaseController{
		ControllerConstructor: &common.ControllerConstructor{
			// Collection: core.InitMongoDB().Collection("testUsersCollection"),
		},
	}

	ctr.AuthRoutes(r)

	return ctr
}
func (ctr *BaseController) AuthRoutes(r *gin.Engine) {
	api := r.Group("/auth")
	{
		api.POST("/login", func(ctx *gin.Context) {
			login(ctx, ctr)
		})
	}
	api.Use(middleware.JwtAuthMiddleware())
	{
		api.GET("/profile", func(ctx *gin.Context) {
			profile(ctx, ctr)
		})
	}
}
func login(ctx *gin.Context, ctr *BaseController) {
	body, err := utils.GetBody[models.AuthenticationInput](ctx)
	if err != nil {
		return
	}
	token, err := models.AuthModel().LoginCheck(body.Username, body.Password)

	if err != nil || token == "" {
		ctx.JSON(http.StatusBadRequest, helpers.Response{Code: http.StatusBadRequest, Message: utils.ErrorMessageList["USERNAME_PASSWORD_WRONG"]})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token})
}
func profile(ctx *gin.Context, ctr *BaseController) {
	user, err := models.AuthModel().CurrentUser(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err)
	}

	ctx.JSON(http.StatusOK, user)
}
