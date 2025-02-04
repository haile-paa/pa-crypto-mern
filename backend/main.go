package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/haile-paa/Pa-Crypto-Market-Place/db"
	"github.com/haile-paa/Pa-Crypto-Market-Place/handlers"
	"github.com/haile-paa/Pa-Crypto-Market-Place/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load environment variables from .env file
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found, using Railway environment variables")
		}
	}

	// Get PORT from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to 8080 if PORT is not set
	}

	// Connect to MongoDB
	db.ConnectDB()

	// Create a new ServeMux for better route management
	mux := http.NewServeMux()

	// Routes for registration and login
	mux.HandleFunc("/register", handlers.RegisterHandler)
	mux.HandleFunc("/login", handlers.LoginHandler)

	// Add the CryptoHandler with JWT verification middleware
	mux.HandleFunc("/crypto", middleware.VerifyToken(handlers.CryptoHandler))

	// Enable CORS for frontend requests
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Adjust as needed
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	// Start the server
	fmt.Println("Server is running on port", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
