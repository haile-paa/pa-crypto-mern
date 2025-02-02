package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/haile-paa/Pa-Crypto-Market-Place/db"
	"github.com/haile-paa/Pa-Crypto-Market-Place/handlers"
	"github.com/haile-paa/Pa-Crypto-Market-Place/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// HandleRequest is the exported function Vercel requires
func HandleRequest(w http.ResponseWriter, r *http.Request) {
	// Create a new ServeMux
	mux := http.NewServeMux()

	// Routes for registration and login
	mux.HandleFunc("/register", handlers.RegisterHandler)
	mux.HandleFunc("/login", handlers.LoginHandler)

	// Add the CryptoHandler with JWT verification middleware
	mux.HandleFunc("/crypto", middleware.VerifyToken(handlers.CryptoHandler))

	// Serve HTTP requests
	mux.ServeHTTP(w, r)
}

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get PORT from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to 8080 if PORT is not set
	}

	// Get allowed origins from environment variable
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	originsList := strings.Split(allowedOrigins, ",")

	// Connect to MongoDB
	db.ConnectDB()

	// Enable CORS for frontend requests
	handler := cors.New(cors.Options{
		AllowedOrigins:   originsList,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(http.HandlerFunc(HandleRequest))

	// Start the server
	fmt.Println("Server is running on port", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
