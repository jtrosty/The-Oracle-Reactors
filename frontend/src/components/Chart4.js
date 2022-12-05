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
  PointElement,
  LineElement
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Chart4(props) {
	var data4 = props["data4"];
	var inType = props["inType"];
	
	var type = null;
	
	if(inType == null) type = "Line";
	else type = inType;
	
	var options = null;
	if(type === "Bar") {
		options = {
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
					  size: 30
				  }
			  }
			},
			scales: {
				x: {
					type: 'category',
					title: {
						display: true,
						text: "Time of Day - 24HR; 15 Minute Intervals",
						color: '#FFF',
						font: {
							size: 16
						}
					},
					ticks: {
						color: '#FFF',
						autoSkip: true,
						maxTicksLimit: 24,
						font: {
							size: 16
						}
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
						color: '#FFF',
						font: {
							size: 16
						}
					},
					grid: {
						color: 'rgba(255, 255, 255, 0.1)'
					}
				}
			}
		};
	}
	else {
		options = {
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
					  size: 30
				  }
			  }
			},
			elements: {
				line: {
					backgroundColor: '#FFF',
					borderColor: 'rgba(255,255,255,0.6)',
					borderWidth: 2
				},
				point: {
					radius: 4
				}
			},
			scales: {
				x: {
					type: 'category',
					title: {
						display: true,
						text: "Time of Day - 24HR; 15 Minute Intervals",
						color: '#FFF',
						font: {
							size: 16
						}
					},
					ticks: {
						color: '#FFF',
						autoSkip: true,
						maxTicksLimit: 24,
						font: {
							size: 16
						}
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
						color: '#FFF',
						font: {
							size: 16
						}
					},
					grid: {
						color: 'rgba(255, 255, 255, 0.1)'
					}
				}
			}
		};
	}
  console.log(data4);
  var xlabels = [];
  for(let i = 0; i < data4.length; i++) {
    xlabels.push(data4[i][0].toString());
	if(xlabels[i][0] === '0') xlabels[i] = xlabels[i].slice(1, xlabels[i].length-4);
	else xlabels[i] = xlabels[i].slice(0, xlabels[i].length-4);
	xlabels[i] = xlabels[i].replaceAll("::", ":");
  }

  var seriesInjury = [];
  for(let i = 0; i < data4.length; i++) {
	var l = {};
	l.x = xlabels[i]
	l.y = data4[i][1]
    seriesInjury.push(l);
  }

  var seriesDeath = [];
  for(let i = 0; i < data4.length; i++) {
    var l = {};
	l.x = xlabels[i]
	l.y = data4[i][2]
    seriesDeath.push(l);
  }
  
  if(type === "Bar") {
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
  else {
	const data = {
		datasets: [
		  {
			label: "Percent Injury Rate",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.7)"
		  },
		  {
			label: "Percent Death Rate",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.7)"
		  },
		],
	  };
	  
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart4;