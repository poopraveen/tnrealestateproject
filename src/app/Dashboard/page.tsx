'use client'
import { useState } from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,  // Add PointElement for line charts
  LineElement,   // Add LineElement for line charts
  TooltipItem,   // Import TooltipItem for proper typing
} from 'chart.js';

// Register all chart components needed
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,  // Register the PointElement
  LineElement    // Register the LineElement
);

const Dashboard = () => {
  const [pieData, setPieData] = useState({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
    }],
  });

  const [lineData, setLineData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales Over Time',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.1,
    }],
  });

  const [barData, setBarData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Revenue',
      data: [120, 90, 150, 180, 200],
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5',
      borderWidth: 1,
    }],
  });

  // Data for the Circular (Donut) Chart
  const circularData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My Dataset',
        data: [300, 50, 100],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      },
    ],
  };

  // Calculate the total sum
  const total = circularData.datasets[0].data.reduce((acc, value) => acc + value, 0);

  // Options for the Circular (Donut) Chart with custom center text plugin
  const circularOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          // Define the tooltip callback with proper typing
          label: function (tooltipItem: TooltipItem<any>) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc: any, value: any) => acc + value, 0); // Calculate total
            const currentValue = dataset.data[tooltipItem.dataIndex]; // Current value
            const percentage = ((currentValue / total) * 100).toFixed(2); // Calculate percentage

            // Format the tooltip to show the value and percentage
            return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
          },
        },
      },
      // Custom plugin to draw the total in the center of the donut chart
      beforeDraw: function (chart: any) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const fontSize = 20;
        const fontFamily = 'Arial';
        const fontStyle = 'bold';

        // Set the font size and style
        ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000'; // Color of the text

        // Draw the total count in the center of the donut chart
        ctx.fillText(total, centerX, centerY);
      },
    },
    cutout: '60%', // This makes the chart a donut
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Pie Chart Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Pie Chart</h3>
        <div className="relative">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Line Chart Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Line Chart</h3>
        <div className="relative">
          <Line data={lineData} />
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Bar Chart</h3>
        <div className="relative">
          <Bar data={barData} />
        </div>
      </div>

      {/* Circular (Donut) Chart Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Circular Chart (Donut)</h3>
        <div className="relative">
          <Doughnut data={circularData} options={circularOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
