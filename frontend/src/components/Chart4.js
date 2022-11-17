//Edit the chart data for http://localhost:3000/Query4.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart4(data4) {
	var options = {
		responsive: true,
		parsing: {
		  xAxisKey: 'x',
		  yAxisKey: 'y'
		},
		plugins: {
		  legend: {
			position: "top",
			labels: {
				color: '#FFF'
			}
		  },
		  title: {
			  display: true,
			  text: 'Average Percent Injury and Death Rates Over the Course of A Day',
			  color: '#FFF',
			  font: {
				  size: 30,
			  }
		  }
		},
		scales: {
			x: {
				type: 'category',
				title: {
					display: true,
					text: "Time of Day (HH::MM::SS) - 15 Minute Intervals",
					color: '#FFF'
				},
				ticks: {
					color: '#FFF'
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.1)'
				}
			},
			y: {
				title: {
					display: true,
					text: "Average Injury/Death Rate (%)",
					color: '#FFF'
				},
				ticks: {
					color: '#FFF'
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.1)'
				}
			}
		}
	};
  
  var xlabels = [];
  for(let i = 0; i < data4.data4.length; i++) {
    xlabels.push(data4.data4[i][0].toString());
  }

  var seriesInjury = [];
  for(let i = 0; i < data4.data4.length; i++) {
	var l = {}
	l.x = xlabels[i]
	l.y = data4.data4[i][1]
    seriesInjury.push(l);
  }

  var seriesDeath = [];
  for(let i = 0; i < data4.data4.length; i++) {
    var l = {}
	l.x = xlabels[i]
	l.y = data4.data4[i][2]
    seriesDeath.push(l);
  }

  const data = {
    datasets: [
      {
        label: "Percent Injury Rate",
        data: seriesInjury,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Percent Death Rate",
        data: seriesDeath,
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      },
    ],
  };
  return (
        <Bar options={options} data={data} />
  );
}

export default Chart4;