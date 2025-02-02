package handlers

import (
	"net/http"

	"github.com/haile-paa/Pa-Crypto-Market-Place/middleware"
)

// HandleRequest is the exported function Vercel requires
func HandleRequest(w http.ResponseWriter, r *http.Request) {
	mux := http.NewServeMux()

	// Routes for registration and login
	mux.HandleFunc("/register", RegisterHandler)
	mux.HandleFunc("/login", LoginHandler)

	// Add the CryptoHandler with JWT verification middleware
	mux.HandleFunc("/crypto", middleware.VerifyToken(CryptoHandler))

	// Serve HTTP requests
	mux.ServeHTTP(w, r)
}
