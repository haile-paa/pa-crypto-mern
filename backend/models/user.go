package models

import (
	"context"

	"github.com/haile-paa/Pa-Crypto-Market-Place/db"

	"go.mongodb.org/mongo-driver/bson"
)

// User represents the structure of a user in the database
type User struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

// FindUserByEmail checks if a user exists in the database
func FindUserByEmail(email string) (*User, error) {
	var user User
	collection := db.GetDB().Collection("users")
	filter := bson.M{"email": email}
	err := collection.FindOne(context.TODO(), filter).Decode(&user)
	return &user, err
}

// InsertUser inserts a new user into the database
func InsertUser(user User) error {
	collection := db.GetDB().Collection("users")
	_, err := collection.InsertOne(context.TODO(), user)
	return err
}
