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

func WorkspaceController(r *gin.Engine) *BaseController {
	ctr := &BaseController{
		ControllerConstructor: &common.ControllerConstructor{
			// Collection: core.InitMongoDB().Collection("testUsersCollection"),
		},
	}

	ctr.WorkspaceRoutes(r)

	return ctr
}

func (ctr *BaseController) WorkspaceRoutes(r *gin.Engine) {
	api := r.Group("api/v1/workspace")
	api.Use(middleware.JwtAuthMiddleware())
	{
		api.POST("/", func(ctx *gin.Context) {
			createWorkspace(ctx, ctr)
		})
		api.GET("/", func(ctx *gin.Context) {
			getAllWorkspaces(ctx, ctr)
		})
		api.PUT("/", func(ctx *gin.Context) {
			updateWorkspace(ctx, ctr)
		})
		api.GET("/:id", func(ctx *gin.Context) {
			updateWorkspace(ctx, ctr)
		})
	}
}

func updateWorkspace(ctx *gin.Context, ctr *BaseController) {
	//id := ctx.Param("id")
	//ctx.JSON(http.StatusOK, gin.H{"id": id})
	body, err := utils.GetBody[models.WorkspaceUpdateInput](ctx)
	if err != nil {
		return
	}
	user, err := models.AuthModel().CurrentUser(ctx)

	workspace, exist, err := models.WorkspaceModel().GetWorkspaceByUserAndWorkspaceRole(&user, body.Id, models.WorkspaceAdminRole)
	if !exist || err != nil {
		ctx.JSON(http.StatusNotFound, helpers.Response{Code: http.StatusNotFound, Message: utils.ErrorMessageList["WORKSPACE_NOT_FOUND"]})
		return
	}

	workspace.Name = body.Name
	workspace.Description = body.Description

	err = models.WorkspaceModel().UpdateWorkspace(workspace)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, helpers.Response{Code: http.StatusInternalServerError, Message: utils.ErrorMessageList["INTERNAL_SERVER_ERROR"]})
		return
	}
	ctx.JSON(http.StatusCreated, helpers.Response{Code: http.StatusCreated, Message: "Success"})
	return
}

func createWorkspace(ctx *gin.Context, ctr *BaseController) {
	body, err := utils.GetBody[models.WorkspaceCreateInput](ctx)

	user, err := models.AuthModel().CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, helpers.Response{Code: http.StatusUnauthorized, Message: utils.ErrorMessageList["UNAUTHORIZED"]})
		return
	}
	err = models.WorkspaceModel().CreateWorkspace(body, &user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, helpers.Response{Code: http.StatusInternalServerError, Message: utils.ErrorMessageList["INTERNAL_SERVER_ERROR"]})
		return

	}
	ctx.JSON(http.StatusCreated, helpers.Response{Code: http.StatusCreated, Message: "Success"})
	return

}

func getAllWorkspaces(ctx *gin.Context, ctr *BaseController) {

	user, err := models.AuthModel().CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, helpers.Response{Code: http.StatusUnauthorized, Message: utils.ErrorMessageList["UNAUTHORIZED"]})
		return

	}
	byUserWorkspaceList, err := models.WorkspaceModel().GetAllWorkspacesByUser(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, helpers.Response{Code: http.StatusInternalServerError, Message: utils.ErrorMessageList["INTERNAL_SERVER_ERROR"]})
		return
	}
	ctx.JSON(http.StatusCreated, helpers.Response{Code: http.StatusCreated, Message: "Success", Data: byUserWorkspaceList})
	return

}
