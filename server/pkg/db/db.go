package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func NewDatabase(filename string) (*Database, error) {
	db, err := gorm.Open("sqlite3", filename)
	if err != nil {
		return nil, err
	}
	return &Database{db}, nil
}

type Database struct {
	DB *gorm.DB
}
