
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getLabels() {
  const labels = [];
  for(let i = 1; i < 30; i++) {
    labels.push(i + "");
  }
  return labels;
}

function convertProps(data) {
  const output = [];
  for(let i = 0; i < data.length; i++) {
    output.push(data[i].views);
  }
  return output;
}

const LineGraph = (props) => {

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Views Over Time',
        data: convertProps(props.data),
        borderColor: 'rgba(34, 139, 34, 1)', // Dark green
        backgroundColor: 'rgba(34, 139, 34, 0.2)', // Light green
        tension: 0.4, // Makes the line curved
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Video Preformance Over 30 Days',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
