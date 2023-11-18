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
	api := r.Group("api/v1/auth")
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

// LoginAuth godoc
// @Summary      login as a user
// @Description  login as a user with username and password.email field is not required
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        data body models.AuthenticationInput true  "User Create"
// @Success      200  {object}  helpers.Response
// @Failure      500  {object}  helpers.Response
// @Failure      409  {object}  helpers.Response
// @Router       /api/v1/auth/login [post]
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

	ctx.JSON(http.StatusOK, helpers.Response{Code: http.StatusOK, Message: "Success", Data: gin.H{"token": token}})
}

// Profile godoc
// @Summary      get current user profile
// @Description  get current user profile
// @Tags         auth
// @Produce      json
// @Success      200  {object}  helpers.Response
// @Failure      500  {object}  helpers.Response
// @Failure      409  {object}  helpers.Response
// @Security Authentication
// @Router       /api/v1/auth/profile [get]
func profile(ctx *gin.Context, ctr *BaseController) {
	user, err := models.AuthModel().CurrentUser(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, helpers.Response{Code: http.StatusUnauthorized, Message: utils.ErrorMessageList["UNAUTHORIZED"]})
		return
	}

	ctx.JSON(http.StatusOK, helpers.Response{Code: http.StatusOK, Message: "Success", Data: gin.H{"username": user.Username, "email": user.Email, "id": user.ID}})
}
