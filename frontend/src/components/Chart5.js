//Edit the chart data for http://localhost:3000/Query5.js
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

function Chart5(props) {
	var data5 = props["data5"];
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
				  text: 'Percent of Drivers Receiving Citations Given in School Zones, in Construction Zones, and on Regular Roads Over Time',
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
						text: "% of Drivers Receiving Citations",
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
				  text: 'Percent of Drivers Receiving Citations Given in School Zones, in Construction Zones, and on Regular Roads Over Time',
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
						text: "% of Drivers Receiving Citations",
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
  for(let i = 0; i < data5.length; i++) {
	var put = true;
	for(let j = 0; j < xlabels.length; j++) {
		if(xlabels[j].toString() == data5[i][2]) {
			put = false;
			break;
		}
	}
    if(put) xlabels.push(data5[i][2].toString());
  }
  xlabels.sort(function(a, b){return a - b});

  var seriesNeither = [];
  for(let i = 0; i < data5.length; i++) {
	if(data5[i][0] == "N" && data5[i][1] == "N") {
		var l = {};
		l.x = data5[i][2].toString();
		l.y = data5[i][3];
		seriesNeither.push(l);
	}
  }

  var seriesSchool = [];
  for(let i = 0; i < data5.length; i++) {
	if(data5[i][0] == "Y" && data5[i][1] == "N") {
		var l = {};
		l.x = data5[i][2].toString();
		l.y = data5[i][3];
		seriesSchool.push(l);
	}
  }
  
  var seriesConstruction = [];
  for(let i = 0; i < data5.length; i++) {
	if(data5[i][0] == "N" && data5[i][1] == "Y") {
		var l = {};
		l.x = data5[i][2].toString();
		l.y = data5[i][3];
		seriesConstruction.push(l);
	}
  }
  
  var seriesBoth = [];
  for(let i = 0; i < data5.length; i++) {
	if(data5[i][0] == "Y" && data5[i][1] == "Y") {
		var l = {};
		l.x = data5[i][2].toString();
		l.y = data5[i][3];
		seriesBoth.push(l);
	}
  }
  
  if(type === "Bar") {
	  const data = {
		datasets: [
		  {
			label: "Neither School Zone Nor Construction Zone",
			data: seriesNeither,
			backgroundColor: "rgba(255, 150, 150, 0.5)"
		  },
		  {
			label: "School Zone",
			data: seriesSchool,
			backgroundColor: "rgba(150, 150, 255, 0.5)"
		  },
		  {
			label: "Construction Zone",
			data: seriesConstruction,
			backgroundColor: "rgba(150, 255, 150, 0.5)"
		  },
		  {
			label: "Both School Zone and Construction Zone",
			data: seriesBoth,
			backgroundColor: "rgba(150, 150, 150, 0.5)"
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
			label: "Neither School Zone Nor Construction Zone",
			data: seriesNeither,
			backgroundColor: "rgba(255, 150, 150, 0.7)"
		  },
		  {
			label: "School Zone",
			data: seriesSchool,
			backgroundColor: "rgba(150, 150, 255, 0.7)"
		  },
		  {
			label: "Construction Zone",
			data: seriesConstruction,
			backgroundColor: "rgba(150, 255, 150, 0.7)"
		  },
		  {
			label: "Both School Zone and Construction Zone",
			data: seriesBoth,
			backgroundColor: "rgba(150, 150, 150, 0.7)"
		  },
		],
	  };
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart5;