package controller

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/gin-gonic/gin"
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
	{
		api.POST("/", func(ctx *gin.Context) {
			createWorkspace(ctx, ctr)
		})
	}
}

func createWorkspace(ctx *gin.Context, ctr *BaseController) {

}
