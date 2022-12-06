//Edit the chart data for http://localhost:3000/Query1.js
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


// how to show the chart
function Chart1(props) {
	var data1 = props["data1"]; // the data from the server
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
				  //title of the chart
				  text: 'Average Percent Crash over Course of Years',
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
						text: "Year",
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
						text: "Average Crash Rate (%)",
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
				  text: 'Average Percent Crash over Course of Years',
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
						text: "Year",
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
						text: "Average Crash Rate (%)",
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
  

	/*
	Data coming in:
	 CONTRIBUTING_FACTOR_1, CRASH_YEAR, 
			COUNT(Crash.CRASH_ID) / 
				(SELECT COUNT(CRASH_ID) FROM Crash) * 100
	*/

	//parsing data

	//console.log(data1);


  var xlabels = [];
  for(let i = 0; i < data1.length; i++) {
    xlabels.push(data1[i][1].toString());

  }


  var ContributingFactor = [];
  for(let i = 0; i < data1.length; i++) {
	var l = {};
	l.x = xlabels[i]
	l.y = data1[i][2]
    ContributingFactor.push(l);
  }




  if(type === "Bar") {
	  const data = {
		datasets: [
		  {
			label: "Percent Injury Rate",
			data: ContributingFactor,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
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
			data: ContributingFactor,
			backgroundColor: "rgba(255, 99, 132, 0.7)"
		  },

		],
	  };
	  
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart1;