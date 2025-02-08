import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Coin = ({ searchQuery }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("USD");

  const conversionRates = {
    USD: 1,
    EUR: 0.95,
    ETB: 127,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${backendUrl}/crypto`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setCryptoData(data);
        } else {
          console.error("Expected an array, but got:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!cryptoData.length) {
    return (
      <div className='text-center text-white p-8 bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-4'>🚀 Explore Cryptocurrencies</h1>
        <p className='text-lg text-gray-300 mb-6'>
          To view real-time cryptocurrency data, please log in or create an
          account.
        </p>
        <p className='text-sm text-gray-400 mt-4'>
          Use Dummy Username, Email, and Password!
        </p>
      </div>
    );
  }

  const filteredData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='px-4 sm:px-8 lg:px-16 py-6'>
      {/* Currency Selector */}
      <div className='flex justify-end mb-4'>
        <label className='text-white mr-2'>Currency:</label>
        <select
          className='p-2 bg-gray-800 text-white rounded'
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value='USD'>USD ($)</option>
          <option value='EUR'>EUR (€)</option>
          <option value='ETB'>ETB (ETB)</option>
        </select>
      </div>

      {/* Cryptocurrencies List */}
      {filteredData.map((crypto, index) => (
        <Link
          to={`/coin/${crypto.id}`}
          key={crypto.id}
          className='block hover:bg-white/10 transition-colors duration-200 mb-4'
        >
          <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 text-white py-4 border-b-2 border-gray-400'>
            <p className='hidden sm:block text-center'>{index + 1}</p>
            <div className='flex items-center space-x-2'>
              <img src={crypto.image} alt={crypto.name} className='w-6 h-6' />
              <p className='text-sm sm:text-base'>{crypto.name}</p>
              <p className='text-xs sm:text-sm text-gray-400'>
                ({crypto.symbol.toUpperCase()})
              </p>
            </div>
            <div className='sm:hidden space-y-1'>
              <p>
                {currency === "USD" && "$"}
                {currency === "EUR" && "€"}
                {currency === "ETB" && "ETB "}
                {(
                  crypto.current_price * conversionRates[currency]
                ).toLocaleString()}
              </p>
              <p
                className={`${
                  crypto.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
            <p className='hidden sm:block text-center sm:text-left'>
              {currency === "USD" && "$"}
              {currency === "EUR" && "€"}
              {currency === "ETB" && "ETB "}
              {(
                crypto.current_price * conversionRates[currency]
              ).toLocaleString()}
            </p>
            <p
              className={`hidden sm:block text-center sm:text-left ${
                crypto.price_change_percentage_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className='text-right'>
              {currency === "USD" && "$"}
              {currency === "EUR" && "€"}
              {currency === "ETB" && "ETB "}
              {(crypto.market_cap * conversionRates[currency]).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Coin;
