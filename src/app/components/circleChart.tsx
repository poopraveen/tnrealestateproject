import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Custom plugin for rendering center text (percentage or value)
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, chartArea, data } = chart;
    const { width, height, top, left } = chartArea;
    const fontSize = (height / 100).toFixed(2);
    ctx.restore();
    ctx.font = `${fontSize * 3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
    const percentage = (data.datasets[0].data[0] / total * 100).toFixed(2); // Calculate percentage for the first slice
    ctx.fillText(`${percentage}%`, width / 2 + left, height / 2 + top);
    ctx.save();
  },
};

// Donut chart data
const data = {
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

// Circular Diagram Component (Donut Chart)
const CircularDiagram = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Sales Breakdown</h3>
      <div className="relative">
        <Doughnut data={data} options={{ plugins: [centerTextPlugin] }} />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
          <span>Red</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></div>
          <span>Blue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></div>
          <span>Yellow</span>
        </div>
      </div>
    </div>
  );
};

export default CircularDiagram;
