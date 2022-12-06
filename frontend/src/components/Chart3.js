//Edit the chart data for http://localhost:3000/Query3.js
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
				  text: 'Average Number of Injuries Categorized by Traffic Control Device Type Over Time',
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
				  text: 'Average Number of Injuries Categorized by Traffic Control Device Type Over Time',
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

  var xlabels = [];
  for(let i = 0; i < data3.length; i++) {
    xlabels.push(data3[i][0].toString());
  }

  var seriesNames = [];
  for(let i = 0; i < data3.length; i++) {
	var add = true;
	for(let j = 0; j < seriesNames.length; j++) {
		if(data3[i][0] == seriesNames[j]) {
			add = false;
			break;
		}
	}
	if(add) seriesNames.push(data3[i][0]);
  }

  var series = [];
  
  for(let i = 0; i < seriesNames.length; i++) {
	  series.push([]);
	  for(let j = 0; j < data3.length; j++) {
		if(data3[j][0] == seriesNames[i]) {
			var l = {};
			l.x = data3[j][1].toString();
			l.y = data3[j][2];
			series[i].push(l);
		}
	  }
	  console.log(series[i]);
  }
  
  var readableLabels = [];
  const ttclabels = [{label: "Don't Filter", value: "DNF"}, {label: "NONE", value:"1"}, {label: "INOPERATIVE", value:"2"}, {label: "OFFICER", value:"3"}, {label: "FLAGMAN", value:"4"}, {label: "SIGNAL LIGHT", value:"5"}, {label: "FLASHING RED LIGHT", value:"6"}, {label: "FLASHING YELLOW LIGHT", value:"7"}, {label: "STOP SIGN", value:"8"}, {label: "YIELD SIGN", value:"9"}, {label: "WARNING SIGN", value:"10"}, {label: "CENTER STRIPE/DIVIDER", value:"11"}, {label: "NO PASSING ZONE", value:"12"}, {label: "RR GATE/SIGNAL", value:"13"}, {label: "CROSSWALK", value:"15"}, {label: "BIKE LANE", value:"16"}, {label: "OTHER", value:"17"}, {label: "MARKED LANES", value:"20"}, {label: "SIGNAL LIGHT WITH RED LIGHT RUNNING CAMERA", value:"21"}];
  
  for(let i = 0; i < seriesNames.length; i++) {
	  for(let j = 0; j < ttclabels.length; j++) {
		if(ttclabels[j]["value"] == seriesNames[i].toString()) {
			readableLabels.push(ttclabels[j]["label"]);
			break;
		}
	  }
  }
  
  for(let i = seriesNames.length; i < 5; i++) {
	  readableLabels.push("No Series");
  }
  
  if(type === "Bar") {
	  const data = {
		datasets: [
		  {
			label: readableLabels[0] ,
			data: series[0],
			backgroundColor: "rgba(255, 155, 155, 0.5)"
		  },
		  {
			label: readableLabels[1],
			data: series[1],
			backgroundColor: "rgba(155, 255, 155, 0.5)"
		  },
		  {
			label: readableLabels[2],
			data: series[2],
			backgroundColor: "rgba(155, 155, 255, 0.5)"
		  },
		  {
			label: readableLabels[3],
			data: series[3],
			backgroundColor: "rgba(155, 155, 155, 0.5)"
		  },
		  {
			label: readableLabels[4],
			data: series[4],
			backgroundColor: "rgba(255, 255, 255, 0.5)"
		  }
		]
	  };
	  
	return (
		<Bar options={options} data={data} />
	);
  }
  else {
	const data = {
		datasets: [
		  {
			label: readableLabels[0],
			data: series[0],
			backgroundColor: "rgba(255, 155, 155, 0.7)"
		  },
		  {
			label: readableLabels[1],
			data: series[1],
			backgroundColor: "rgba(155, 255, 155, 0.7)"
		  },
		  {
			label: readableLabels[2],
			data: series[2],
			backgroundColor: "rgba(155, 155, 255, 0.7)"
		  },
		  {
			label: readableLabels[3],
			data: series[3],
			backgroundColor: "rgba(155, 155, 155, 0.7)"
		  },
		  {
			label: readableLabels[4],
			data: series[4],
			backgroundColor: "rgba(255, 255, 255, 0.7)"
		  }
		]
	  };
	  
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart3;