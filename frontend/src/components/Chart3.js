//Edit the chart data for http://localhost:3000/Query3.js
//For Both Bar and Line datasets, I left off {label: "INOPERATIVE (EXPLAIN IN NARRATIVE)", value:"2"} and 
//{label: "OTHER (EXPLAIN IN NARRATIVE)", value:"17"} as possible options to display
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

function Chart3(props) {
	var data3 = props["data3"];
	var inType = props["inType"];
	var type = null;
	var options = null;
	
	if(inType == null) 
		type = "Line";
	else 
		type = inType;
	
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
				  text: 'Average Number of Injuries At Intersections Over Time',
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
						text: "Average Number of Injuries",
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
				  text: 'Average Number of Injuries At Intersections Over Time',
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
						text: "Average Number of Injuries",
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

//This part needs to transform seriesInjury and seriesDeath to series
//for each traffic control device
  
  var xlabels = [];
  for(let i = 0; i < data3.length; i++) {
    xlabels.push(data3[i][0].toString());
	if(xlabels[i][0] === '0') xlabels[i] = xlabels[i].slice(1, xlabels[i].length-4);
	else xlabels[i] = xlabels[i].slice(0, xlabels[i].length-4);
	xlabels[i] = xlabels[i].replaceAll("::", ":");
  }

  var seriesInjury = [];
  for(let i = 0; i < data3.length; i++) {
	var l = {};
	l.x = xlabels[i]
	l.y = data3[i][1]
    seriesInjury.push(l);
  }

  var seriesDeath = [];
  for(let i = 0; i < data3.length; i++) {
    var l = {};
	l.x = xlabels[i]
	l.y = data3[i][2]
    seriesDeath.push(l);
  }
  
  if(type === "Bar") {
	  const data = {
		datasets: [
		  {
			label: "No Traffic Control Device",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Officer",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.5)"
		  },
		  {
			label: "Flagman",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Signal Light",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.5)"
		  },
		  {
			label: "Flashing Red Light",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Flashing Yellow Light",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.5)"
		  },
		  {
			label: "Stop Sign",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Yield Sign",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.5)"
		  },
		  {
			label: "Warning Sign",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Center Stripe/Divider",
			data: seriesDeath,
			backgroundColor: "rgba(53, 162, 235, 0.5)"
		  },
		  {
			label: "No Passing Zone",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "RR Gate/Signal",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Crosswalk",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Bike Lane",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Marked Lanes",
			data: seriesInjury,
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: "Signal Light with a Red Light Running Camera",
			data: seriesInjury,
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
			  label: "No Traffic Control Device",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Officer",
			  data: seriesDeath,
			  backgroundColor: "rgba(53, 162, 235, 0.5)"
			},
			{
			  label: "Flagman",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Signal Light",
			  data: seriesDeath,
			  backgroundColor: "rgba(53, 162, 235, 0.5)"
			},
			{
			  label: "Flashing Red Light",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Flashing Yellow Light",
			  data: seriesDeath,
			  backgroundColor: "rgba(53, 162, 235, 0.5)"
			},
			{
			  label: "Stop Sign",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Yield Sign",
			  data: seriesDeath,
			  backgroundColor: "rgba(53, 162, 235, 0.5)"
			},
			{
			  label: "Warning Sign",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Center Stripe/Divider",
			  data: seriesDeath,
			  backgroundColor: "rgba(53, 162, 235, 0.5)"
			},
			{
			  label: "No Passing Zone",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "RR Gate/Signal",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Crosswalk",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Bike Lane",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Marked Lanes",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
			{
			  label: "Signal Light with a Red Light Running Camera",
			  data: seriesInjury,
			  backgroundColor: "rgba(255, 99, 132, 0.5)"
			},
		],
	  };
	  
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart3;