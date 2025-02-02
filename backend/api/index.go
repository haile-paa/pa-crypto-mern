package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/haile-paa/Pa-Crypto-Market-Place/handlers"
	"github.com/haile-paa/Pa-Crypto-Market-Place/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"golang.org/x/net/context"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// Create a timeout context
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Set allowed origins
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:5173"
	}
	originsList := strings.Split(allowedOrigins, ",")

	// Setup CORS middleware
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   originsList,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Serve request
	corsMiddleware.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-ctx.Done():
			// If the request takes too long, return a timeout response
			http.Error(w, "Request timed out", http.StatusGatewayTimeout)
			return
		default:
			// Route handling
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
		}
	})).ServeHTTP(w, r)
}
