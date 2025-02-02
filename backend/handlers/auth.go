package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/haile-paa/Pa-Crypto-Market-Place/models"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET")) // Get JWT secret from environment variables

// Claims represents the JWT claims
type Claims struct {
	Email    string `json:"email"`
	Username string `json:"username"` // Include username in JWT claims
	jwt.StandardClaims
}

// RegisterHandler handles user registration
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Ensure all fields are provided
	if user.Username == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "All fields (username, email, password) are required", http.StatusBadRequest)
		return
	}

	// Check if the user already exists
	existingUser, err := models.FindUserByEmail(user.Email)
	if err == nil && existingUser.Email != "" {
		http.Error(w, "User already exists", http.StatusConflict)
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Save the new user in the database
	user.Password = string(hashedPassword)
	if err := models.InsertUser(user); err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully!"})
}

// LoginHandler handles user login and returns a JWT
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var loginRequest models.User
	if err := json.NewDecoder(r.Body).Decode(&loginRequest); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Ensure all fields are provided
	if loginRequest.Email == "" || loginRequest.Password == "" {
		http.Error(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Find the user in the database
	existingUser, err := models.FindUserByEmail(loginRequest.Email)
	if err != nil || existingUser.Email == "" {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Compare the provided password with the hashed password
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(loginRequest.Password))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	// Create JWT token
	expirationTime := time.Now().Add(24 * time.Hour) // Token expires in 24 hours
	claims := &Claims{
		Email:    existingUser.Email,
		Username: existingUser.Username, // Include username in JWT
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return the token and username
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"token":    tokenString,
		"username": existingUser.Username, // Send username in response
	})
}
