import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h3>Sales Overview</h3>
      <Line data={data} />
    </div>
  );
};

export default SalesChart;
