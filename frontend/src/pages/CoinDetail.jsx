import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PriceChart from "./PriceChart";
import LoadingSpinner from "../components/LoadingSpinner";

const CoinDetail = () => {
  const { id } = useParams(); // Get the coin ID from the URL
  const [coinData, setCoinData] = useState(null);
  const [priceData, setPriceData] = useState(null); // State for price chart data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        // Fetch coin details
        const coinResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoinData(coinResponse.data);

        // Fetch historical price data for the chart
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: "7", // Fetch data for the last 7 days
            },
          }
        );

        // Format price data for the chart
        const formattedData = {
          labels: priceResponse.data.prices.map((price) =>
            new Date(price[0]).toLocaleDateString()
          ),
          prices: priceResponse.data.prices.map((price) => price[1]),
        };

        setPriceData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!coinData) {
    return <div className='text-center text-white'>Coin not found.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-white p-6'>
      <div className='max-w-4xl w-full space-y-6'>
        {/* Coin Header */}
        <div className='flex items-center space-x-4'>
          <img
            src={coinData.image.large}
            alt={coinData.name}
            className='w-12 h-12'
          />
          <h1 className='text-4xl font-bold'>{coinData.name}</h1>
          <p className='text-gray-400 text-2xl'>
            ({coinData.symbol.toUpperCase()})
          </p>
        </div>

        {/* Coin Price and Market Data */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='bg-white/10 p-4 rounded-lg'>
            <p className='text-gray-400'>Current Price</p>
            <p className='text-2xl font-bold'>
              ${coinData.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div className='bg-white/10 p-4 rounded-lg'>
            <p className='text-gray-400'>Market Cap</p>
            <p className='text-2xl font-bold'>
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Price Change */}
        <div className='bg-white/10 p-4 rounded-lg'>
          <p className='text-gray-400'>24H Change</p>
          <p
            className={`text-2xl font-bold ${
              coinData.market_data.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        {/* Price Chart */}
        <div className='bg-white/10 p-4 rounded-lg'>
          <p className='text-gray-400'>Price Chart (Last 7 Days)</p>
          <div className='h-64'>
            {priceData ? (
              <PriceChart data={priceData} />
            ) : (
              <p className='text-gray-400'>Loading chart...</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className='bg-white/10 p-4 rounded-lg'>
          <p className='text-gray-400'>Description</p>
          <p
            className='text-lg'
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
