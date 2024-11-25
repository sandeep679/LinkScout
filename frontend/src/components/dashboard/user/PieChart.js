import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  console.log(data.length);

  useEffect(()=>{
    const country = [];
    const count = [];
    const backgroundColors = [];
    const borderColors = [];

    if (data && data.length > 0) {
      data.forEach((item, index) => {
        country.push(item.name);
        count.push(item.count);

        // Dynamically assign colors, repeating if necessary
        const baseColors = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ];
        const borderBaseColors = [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ];

        backgroundColors.push(baseColors[index % baseColors.length]);
        borderColors.push(borderBaseColors[index % borderBaseColors.length]);
      });
      console.log(country);
      console.log(count);
      console.log(backgroundColors);
      console.log(borderColors);
      
      
      
      

    //   setChartData({
    //     labels: country, // Countries
    //     datasets: [
    //       {
    //         label: 'Clicks per Country',
    //         data: count, // Counts
    //         backgroundColor: backgroundColors,
    //         borderColor: borderColors,
    //         borderWidth: 1,
    //       },
    //     ],
    //   });
    // }

    setChartData({
      labels: country,
      datasets: [{
        label: 'My First Dataset',
        data: count,
        backgroundColor: backgroundColors,
        borderColor:borderColors,
        hoverOffset: 4
      }]
    })
  }
  },[data])
  
  
    
    return <Pie data={chartData} />;
  
}

export default PieChart;
