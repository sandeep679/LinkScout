import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, TimeScale, Tooltip, Legend ,LinearScale} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, TimeScale, Tooltip, Legend,LinearScale);

const VisitHistoryChart = ({ visitHistory }) => {
  // Function to convert time into decimal hour format (e.g., 18:44 -> 18.7333)
  console.log('visit');
  
  
  
  const getDecimalHour = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    
    const minutes = date.getMinutes();
    return hours +( minutes)/ 60; // Convert minutes to decimal hours
  };


  const data = {
    labels: visitHistory.map(item => new Date(item.timestamp)), // X-axis labels (dates)
    datasets: [
      {
        label: 'Visit Time',
        data: visitHistory.map(item => getDecimalHour(item.timestamp)), // Y-axis data in decimal format (hour + minutes/60)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dd-MM-yyyy',
          },
        },
        title: {
          display: true,
          text: 'Date (Day-Month-Year)',
        },
        ticks: {
        color: "white", // Label color for X-axis
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)", // Gridline color for X-axis
      },
      },
      y: {
        min: 0,
        max: 24, // Y-axis from 0 to 24 hours
        ticks: {
          stepSize: 1, // Show every hour on Y-axis
          color: "white",
          callback: (value) => `${value}:00`, // Format ticks to show full hours (e.g., 0:00, 1:00, 2:00...)
        },
        title: {
          display: true,
          text: 'Hour (24-hour format)',
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Gridline color for Y-axis
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const modifiedDateString = context.label.replace("p.m.", "PM").replace("a.m.", "AM");
            const date = new Date(modifiedDateString);  
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return `Time: ${hours}:${minutes}:${seconds}`;
          },
        },
        labels: {
          color: "white", // Color for the legend labels
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default VisitHistoryChart;
