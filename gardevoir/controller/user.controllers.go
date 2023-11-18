package controller

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/helpers"
	"github.com/MasterBrian99/bukmarq/models"
	"github.com/MasterBrian99/bukmarq/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UsersController(r *gin.Engine) *BaseController {
	ctr := &BaseController{
		ControllerConstructor: &common.ControllerConstructor{
			// Collection: core.InitMongoDB().Collection("testUsersCollection"),
		},
	}

	ctr.UsersRoutes(r)

	return ctr
}

func (ctr *BaseController) UsersRoutes(r *gin.Engine) {
	api := r.Group("/users")
	{

		api.POST("/", func(ctx *gin.Context) {
			createUser(ctx, ctr)
		})

	}
}

func createUser(ctx *gin.Context, ctr *BaseController) {
	body, err := utils.GetBody[models.AuthenticationInput](ctx)
	if err != nil {
		return
	}
	userIsExist, err := models.UsersModel().CheckUsernameAvailability(body.Username)

	if err != nil {
		// Handle the error
		ctx.JSON(http.StatusInternalServerError, helpers.Response{Code: http.StatusInternalServerError, Message: utils.ErrorMessageList["INTERNAL_SERVER_ERROR"]})
		return
	} else if userIsExist {
		ctx.JSON(http.StatusConflict, helpers.Response{Code: http.StatusConflict, Message: utils.ErrorMessageList["USER_ALREADY_EXIST"]})
		return
	}

	err = models.UsersModel().CreateUser(body)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, helpers.Response{Code: http.StatusInternalServerError, Message: utils.ErrorMessageList["INTERNAL_SERVER_ERROR"]})
		return
	}
	ctx.JSON(http.StatusCreated, helpers.Response{Code: http.StatusCreated, Message: "Success", Data: gin.H{"username": body.Username, "email": body.Email}})
}
