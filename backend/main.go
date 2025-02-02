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

// API is the main handler for Vercel serverless functions
func API(w http.ResponseWriter, r *http.Request) {
	// Load environment variables (only in local development)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading .env file")
	}

	// Set allowed origins
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	originsList := strings.Split(allowedOrigins, ",")

	// Connect to MongoDB
	db.ConnectDB()

	// Create a new ServeMux
	mux := http.NewServeMux()

	// Health check route
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API working"))
	})

	// Routes for registration and login
	mux.HandleFunc("/api/register", handlers.RegisterHandler)
	mux.HandleFunc("/api/login", handlers.LoginHandler)

	// Add the CryptoHandler with JWT verification middleware
	mux.HandleFunc("/api/crypto", middleware.VerifyToken(handlers.CryptoHandler))

	// CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   originsList,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	// Serve the request
	corsHandler.ServeHTTP(w, r)
}

// Handler is required for Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	API(w, r)
}

// For local development
func main() {
	// Set default port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create a handler
	handler := http.HandlerFunc(API)

	// Start server
	fmt.Println("Server is running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
