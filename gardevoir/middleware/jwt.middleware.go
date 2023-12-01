package middleware

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/helpers"
	"github.com/MasterBrian99/bukmarq/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		err := utils.TokenValid(ctx)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, helpers.Response{
				Code:    http.StatusUnauthorized,
				Message: utils.ErrorMessageList["UNAUTHORIZED"],
			})
			fmt.Println(err)
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}
