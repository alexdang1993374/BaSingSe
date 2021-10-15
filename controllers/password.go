package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v9"
	"github.com/go-pg/pg/v9/orm"
	guuid "github.com/google/uuid"
)

var dbConnect *pg.DB

//InitiateDB initiates the database
func InitiateDB(db *pg.DB) {
	dbConnect = db
}

//Password Table created
type Login struct {
	ID        string    `json:"id"`
	Website   string    `json:"website"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

//CreateLoginTable makes the login table
func CreateLoginTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createError := db.CreateTable(&Login{}, opts)
	if createError != nil {
		log.Printf("Error while creating login table, Reason: %v\n", createError)
		return createError
	}
	log.Printf("Login table created")
	return nil
}

//GetAllLogins in request
func GetAllLogins(c *gin.Context) {
	var login []Login
	err := dbConnect.Model(&login).Order("website").Select()
	if err != nil {
		log.Printf("Error while getting all passwords, Reason: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "All Logins",
		"data":    login,
	})
	return
}

//CreateLogin request
func CreateLogin(c *gin.Context) {
	var login Login
	c.BindJSON(&login)
	username := login.Username
	website := login.Website
	password := login.Password
	id := guuid.New().String()
	insertError := dbConnect.Insert(&Login{
		ID:        id,
		Username:  username,
		Website:   website,
		Password:  password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	})
	if insertError != nil {
		log.Printf("Error while inserting new login into db, Reason: %v\n", insertError)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": "Login created Successfully",
	})
	return
}

//GetSingleLogin request
func GetSingleLogin(c *gin.Context) {
	loginWebsite := c.Param("loginWebsite")
	var login Login
	query := "website='" + loginWebsite + "'"
	err := dbConnect.Model(&login).Where(query).Select()
	if err != nil {
		log.Printf("Error while getting a single login, Reason: %v\n", err)
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": "Login not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "Single Login",
		"data":    login,
	})
	return
}

//EditLogin request
func EditLogin(c *gin.Context) {
	loginID := c.Param("loginId")
	var login Login
	c.BindJSON(&login)
	username := login.Username
	password := login.Password
	website := login.Website
	_, err := dbConnect.Model(&Login{}).Set("username = ?", username).Where("id = ?", loginID).Update()
	_, err = dbConnect.Model(&Login{}).Set("password = ?", password).Where("id = ?", loginID).Update()
	_, err = dbConnect.Model(&Login{}).Set("website = ?", website).Where("id = ?", loginID).Update()
	if err != nil {
		log.Printf("Error, Reason: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  500,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":  200,
		"message": "Login Edited Successfully",
	})
	return
}

//DeleteLogin request
func DeleteLogin(c *gin.Context) {
	loginID := c.Param("loginId")
	var login Login
	query := "id='" + loginID + "'"
	fmt.Print(query)
	findErr := dbConnect.Model(&login).Where(query).Select()
	if findErr != nil {
		log.Printf("Error while getting a single login, Reason: %v\n", findErr)
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": "Login not found",
		})
		return
	}
	_, err := dbConnect.Model(&login).Where("id = ?", loginID).Delete()
	if err != nil {
		log.Printf("Error while deleting a single login, Reason: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "Login deleted successfully",
	})
	return
}
