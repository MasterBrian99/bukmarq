package middleware

import (
	"net/http"

	"github.com/MasterBrian99/bukmarq/helper"

	"github.com/gin-gonic/gin"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.ValidateJWT(context)
		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"message": "Authentication required"})
			context.Abort()
			return
		}
		context.Next()
	}
}
