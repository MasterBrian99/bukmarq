package database

import (
	"fmt"
	"github.com/MasterBrian99/bukmarq/config"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"os"
)

var Database *gorm.DB

func InitDB() {
	println("Connecting gorm")
	var dialector gorm.Dialector
	provider := config.GetEnvOrDefault("DB_PROVIDER", "sqlite")
	connectionString := config.GetEnvOrDefault("DB_CONNECTION_STRING", "bukmarq_db")
	switch provider {
	case "postgres":
		dialector = postgres.Open(connectionString)
	case "sqlite":
		var dbFilePath = config.GetEnvOrDefault("SQLITE_FOLDER_PATH", "bukmarq_db")
		if err := os.MkdirAll(dbFilePath, os.ModePerm); err != nil {
			log.Fatalf("Error creating  database folder: %v", err)
		}
		dbFilePath = fmt.Sprintf("%s/%s", dbFilePath, connectionString)
		dialector = sqlite.Open(dbFilePath + "?_journal_mode=WAL")
	}
	var err error
	Database, err = gorm.Open(dialector, &gorm.Config{})

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Connection Opened")

}

/*
func CheckDatabaseConnection(db *sql.DB) error {
	// Set a timeout for the ping operation
	timeout := 5 * time.Second

	// Ping the database to check the connection
	err := db.Ping()
	if err != nil {
		return fmt.Errorf("error pinging database: %v", err)
	}

	// Check if the connection is still alive by setting a deadline
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return fmt.Errorf("error checking if the database connection is alive: %v", err)
	}
	println("Pinging database")
	return nil
}
**/
