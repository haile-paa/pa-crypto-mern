package handler

import (
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

// Handler processes requests for Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading .env file")
	}

	// Allowed CORS origins
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	originsList := strings.Split(allowedOrigins, ",")

	// Connect to MongoDB
	if err := db.ConnectDB(); err != nil {
		http.Error(w, "Database connection failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Create CORS middleware
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   originsList,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Apply CORS and handle routes
	corsMiddleware.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/api/register":
			handlers.RegisterHandler(w, r)
		case "/api/login":
			handlers.LoginHandler(w, r)
		case "/api/crypto":
			middleware.VerifyToken(handlers.CryptoHandler)(w, r)
		case "/":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("API working"))
		default:
			http.NotFound(w, r)
		}
	})).ServeHTTP(w, r)
}
