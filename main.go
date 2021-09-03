package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"passwordmaker.com/m/v2/config"
	"passwordmaker.com/m/v2/routes"
)

func main() {
	config.Connect()
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))

	// Setup route group for the API
	routes.Routes(router)

	// Start and run the server
	router.Run(":5000")
}
