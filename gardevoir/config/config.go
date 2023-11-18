package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

func GetEnvOrDefault(key, defaultValue string) string {

	value, err := LoadConfig(key)
	if err != nil {
		value, exists := os.LookupEnv(key)
		if !exists {
			return defaultValue
		}
		return value
	}
	return value

}

func GetEnv(key string) string {
	value, err := LoadConfig(key)
	if err != nil {
		value, exists := os.LookupEnv(key)
		if !exists {
			panic(fmt.Sprintf(" %s env variable cannot be found ", key))
		}
		return value
	}
	return value
}

func LoadConfig(key string) (string, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return "", err
	}
	return os.Getenv(key), nil
}
