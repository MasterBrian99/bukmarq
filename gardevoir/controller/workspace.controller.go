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

}
