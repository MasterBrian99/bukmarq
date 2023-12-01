package common

import "github.com/gin-gonic/gin"

type ControllerConstructor struct {
}

type ControllerInterface interface {
	RegisterRoutes(*gin.Engine)
}
