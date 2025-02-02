package handlers

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

// CryptoData represents the structure of the cryptocurrency data
type CryptoData struct {
	ID                       string  `json:"id"`
	Symbol                   string  `json:"symbol"`
	Name                     string  `json:"name"`
	Image                    string  `json:"image"`
	CurrentPrice             float64 `json:"current_price"`
	MarketCap                float64 `json:"market_cap"`
	PriceChangePercentage24H float64 `json:"price_change_percentage_24h"`
}

// Fetch data from CoinGecko API
func fetchCryptoData() ([]CryptoData, error) {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	// Get API key from environment variable
	apiKey := os.Getenv("COINGECKO_API_KEY")
	if apiKey == "" {
		return nil, err
	}

	url := "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	// Add your CoinGecko API key to the request header
	req.Header.Add("x-cg-demo-api-key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data []CryptoData
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return nil, err
	}

	return data, nil
}

// CryptoHandler serves crypto data as a response
func CryptoHandler(w http.ResponseWriter, r *http.Request) {
	data, err := fetchCryptoData()
	if err != nil {
		http.Error(w, "Failed to fetch crypto data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
