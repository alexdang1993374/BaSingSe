package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"passwordmaker.com/m/v2/controllers"
)

//Routes for API
func Routes(router *gin.Engine) {
	router.GET("/login", controllers.GetAllLogins)
	router.POST("/login", controllers.CreateLogin)
	router.GET("/login/:loginWebsite", controllers.GetSingleLogin)
	router.PUT("/login/:loginId", controllers.EditLogin)
	router.DELETE("/login/:loginWebsite", controllers.DeleteLogin)
}

func welcome(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  200,
		"message": "Welcome To API",
	})
	return
}
