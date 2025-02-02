import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PriceChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    if (chartRef.current && data) {
      // Destroy the existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Create a new chart instance and store it in the ref
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Price (USD)",
              data: data.prices,
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  if (!data) {
    return <p className='text-gray-400'>No chart data available.</p>;
  }

  return <canvas ref={chartRef} />;
};

export default PriceChart;
