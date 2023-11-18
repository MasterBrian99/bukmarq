package common

import "gorm.io/gorm"

type ModelConstructor struct {
	Gorm *gorm.DB
}
