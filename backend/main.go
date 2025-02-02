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

// HandleRequest is the main handler for Vercel
func HandleRequest(w http.ResponseWriter, r *http.Request) {
	mux := http.NewServeMux()

	// Health check route
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API working"))
	})

	// Routes for registration and login
	mux.HandleFunc("/register", handlers.RegisterHandler)
	mux.HandleFunc("/login", handlers.LoginHandler)

	// Add the CryptoHandler with JWT verification middleware
	mux.HandleFunc("/crypto", middleware.VerifyToken(handlers.CryptoHandler))

	// Serve HTTP requests
	mux.ServeHTTP(w, r)
}

// Handler is required for Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Set allowed origins
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	originsList := strings.Split(allowedOrigins, ",")

	// Connect to MongoDB
	db.ConnectDB()

	// CORS middleware
	handler := cors.New(cors.Options{
		AllowedOrigins:   originsList,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(http.HandlerFunc(HandleRequest))

	// Serve the request
	handler.ServeHTTP(w, r)
}

func main() {
	// Set default port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	fmt.Println("Server is running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, http.HandlerFunc(Handler)))
}
