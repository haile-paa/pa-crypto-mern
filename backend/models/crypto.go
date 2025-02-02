package models

// CryptoData represents the structure of cryptocurrency data
type CryptoData struct {
	ID                       string  `json:"id"`
	Symbol                   string  `json:"symbol"`
	Name                     string  `json:"name"`
	Image                    string  `json:"image"`
	CurrentPrice             float64 `json:"current_price"`
	MarketCap                float64 `json:"market_cap"`
	PriceChangePercentage24H float64 `json:"price_change_percentage_24h"`
}
