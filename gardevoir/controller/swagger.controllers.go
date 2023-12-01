package controller

import (
	"github.com/MasterBrian99/bukmarq/common"
	"github.com/MasterBrian99/bukmarq/docs"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"net/http"
)

func SwaggersController(r *gin.Engine) *BaseController {
	ctr := &BaseController{
		ControllerConstructor: &common.ControllerConstructor{},
	}

	ctr.SwaggersRoutes(r)

	return ctr
}

// @BasePath /

// HealthCheck PingExample godoc
// @Summary health check
// @Schemes
// @Description do health check
// @Tags swagger
// @Accept json
// @Produce json
// @securityDefinitions.apikey jwtTokenAuth
// @in header
// @name <YourTokenName>
// @Success 200 {string} Healthy
// @Router /healthcheck [get]
func HealthCheck(g *gin.Context) {
	g.JSON(http.StatusOK, "Healthy")
}

func (ctr *BaseController) SwaggersRoutes(r *gin.Engine) {
	docs.SwaggerInfo.BasePath = "/"

	r.GET("/healthcheck", HealthCheck)

	ginSwagger.WrapHandler(swaggerfiles.Handler,
		ginSwagger.URL("/swagger/doc.json"),
		ginSwagger.DefaultModelsExpandDepth(-1))

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
