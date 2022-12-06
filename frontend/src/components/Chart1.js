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

  var seriesNames = [];
  for(let i = 0; i < data1.length; i++) {
	var add = true;
	for(let j = 0; j < seriesNames.length; j++) {
		if(data1[i][0] == seriesNames[j]) {
			add = false;
			break;
		}
	}
	if(add) seriesNames.push(data1[i][0]);

	
  }

  var series = [];
  
  for(let i = 0; i < seriesNames.length; i++) {
	  series.push([]);
	  for(let j = 0; j < data1.length; j++) {
		if(data1[j][0] == seriesNames[i]) {
			var l = {};
			l.x = data1[j][1].toString();
			l.y = data1[j][2];
			series[i].push(l);
		}
	  }
	  
  }
  console.log("name is"+ seriesNames);


  
  
  const clabels = [{label: "Don't Filter", value: "DNF"}, {label: "NONE", value:"0"}, {label: "ANIMAL ON ROAD - DOMESTIC", value:"1"}, {label: "ANIMAL ON ROAD - WILD", value:"2"}, {label: "BACKED WITHOUT SAFETY", value:"3"}, {label: "CHANGED LANE WHEN UNSAFE", value:"4"}, {label: "DISABLED IN TRAFFIC LANE", value:"14"}, {label: "DISREGARD STOP AND GO SIGNAL", value:"15"}, {label: "DISREGARD STOP SIGN OR LIGHT", value:"16"}, {label: "DISREGARD TURN MARKS AT INTERSECTION", value:"17"}, {label: "DISREGARD WARNING SIGN AT CONSTRUCTION", value:"18"}, {label: "DISTRACTION IN VEHICLE", value:"19"}, {label: "DRIVER INATTENTION", value:"20"}, {label: "DROVE WITHOUT HEADLIGHTS", value:"21"}, {label: "FAILED TO CONTROL SPEED", value:"22"}, {label: "FAILED TO DRIVE IN SINGLE LANE", value:"23"}, {label: "FAILED TO GIVE HALF OF ROADWAY", value:"24"}, {label: "FAILED TO HEED WARNING SIGN", value:"25"}, {label: "FAILED TO PASS TO LEFT SAFELY", value:"26"}, {label: "FAILED TO PASS TO RIGHT SAFELY", value:"27"}, {label: "FAILED TO SIGNAL OR GAVE WRONG SIGNAL", value:"28"}, {label: "FAILED TO STOP AT PROPER PLACE", value:"29"}, {label: "FAILED TO STOP FOR SCHOOL BUS", value:"30"}, {label: "FAILED TO STOP FOR TRAIN", value:"31"}, {label: "FAILED TO YIELD RIGHT OF WAY - EMERGENCY VEHICLE", value:"32"}, {label: "FAILED TO YIELD RIGHT OF WAY - OPEN INTERSECTION", value:"33"}, {label: "FAILED TO YIELD RIGHT OF WAY - PRIVATE DRIVE", value:"34"}, {label: "FAILED TO YIELD RIGHT OF WAY - STOP SIGN", value:"35"}, {label: "FAILED TO YIELD RIGHT OF WAY - TO PEDESTRIAN", value:"36"}, {label: "FAILED TO YIELD RIGHT OF WAY - TURNING LEFT", value:"37"}, {label: "FAILED TO YIELD RIGHT OF WAY - TURN ON RED", value:"38"}, {label: "FAILED TO YIELD RIGHT OF WAY - YIELD SIGN", value:"39"}, {label: "FATIGUED OR ASLEEP", value:"40"}, {label: "FAULTY EVASIVE ACTION", value:"41"}, {label: "FIRE IN VEHICLE", value:"42"}, {label: "FLEEING OR EVADING POLICE", value:"43"}, {label: "FOLLOWED TOO CLOSELY", value:"44"}, {label: "HAD BEEN DRINKING", value:"45"}, {label: "HANDICAPPED DRIVER", value:"46"}, {label: "ILL", value:"47"}, {label: "IMPAIRED VISIBILITY", value:"48"}, {label: "IMPROPER START FROM PARKED POSITION", value:"49"}, {label: "LOAD NOT SECURED", value:"50"}, {label: "OPENED DOOR INTO TRAFFIC LANE", value:"51"}, {label: "OVERSIZED VEHICLE OR LOAD", value:"52"}, {label: "OVERTAKE AND PASS INSUFFICIENT CLEARANCE", value:"53"}, {label: "PARKED AND FAILED TO SET BRAKES", value:"54"}, {label: "PARKED IN TRAFFIC LANE", value:"55"}, {label: "PARKED WITHOUT LIGHTS", value:"56"}, {label: "PASSED IN NO PASSING LANE", value:"57"}, {label: "PASSED ON RIGHT SHOULDER", value:"58"}, {label: "PEDESTRIAN FAILED TO YIELD RIGHT OF WAY TO VEHICLE", value:"59"}, {label: "UNSAFE SPEED", value:"60"}, {label: "SPEEDING - (OVERLIMIT)", value:"61"}, {label: "TAKING MEDICATION", value:"62"}, {label: "TURNED IMPROPERLY - CUT CORNER ON LEFT", value:"63"}, {label: "TURNED IMPROPERLY - WIDE RIGHT", value:"64"}, {label: "TURNED IMPROPERLY - WRONG LANE", value:"65"}, {label: "TURNED WHEN UNSAFE", value:"66"}, {label: "UNDER INFLUENCE - ALCOHOL", value:"67"}, {label: "UNDER INFLUENCE - DRUG", value:"68"}, {label: "WRONG SIDE - APPROACH OR INTERSECTION", value:"69"}, {label: "WRONG SIDE - NOT PASSING", value:"70"}, {label: "WRONG WAY - ONE WAY ROAD", value:"71"}, {label: "CELL/MOBILE PHONE USE", value:"72"}, {label: "ROAD RAGE", value:"73"}, {label: "OTHER", value:"74"}, {label: "CELL/MOBILE DEVICE USE - TALKING", value:"75"}, {label: "CELL/MOBILE DEVICE USE - TEXTING", value:"76"}, {label: "CELL/MOBILE DEVICE USE - OTHER", value:"77"}, {label: "CELL/MOBILE DEVICE USE - UNKNOWN", value:"78"}, {label: "FAILED TO SLOW OR MOVE OVER FOR VEHICLES DISPLAYING EMERGENCY LIGHTS", value:"79"}];


  var ContributingFactor = [];
  var readableLabels = [];
  for(let i = 0; i < data1.length; i++) {
	var l = {};
	l.x = xlabels[i]
	l.y = data1[i][2]
	l.factor = data1[i][0];
	//console.log("x = "+l.x+" y = "+l.y+" factor = "+l.factor);
	for(let j = 0; j <clabels.length; j++) {
		if(clabels[j]["value"] == l.factor){
			l.factorName = clabels[j].label;
			//console.log("Labele Name = "+l.factorName);
			
		}
	}

    ContributingFactor.push(l);
  }

  readableLabels.push(ContributingFactor[1].factorName);
  for(let i = 0; i < ContributingFactor.length; i++) {
	//console.log("Contributing Factor = "+ContributingFactor[i].factorName);
	//console.log(typeof ContributingFactor[i].factorName);
  
	for(let j = 0; j < readableLabels.length; j++) {
		
			//console.log(typeof readableLabels[j]);

		if(readableLabels[j] !== ContributingFactor[i].factorName){
			readableLabels.push(ContributingFactor[i].factorName);
			//console.log("pushed " + ContributingFactor[i].factorName);
			break;
		}
	
	}
}


  if(type === "Bar") {
	  const data = {
		datasets: [
		  {
			label: readableLabels[0],
			data: series[0],
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: readableLabels[1],
			data: series[1],
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: readableLabels[2],
			data: series[2],
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: readableLabels[3],
			data: series[3],
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  },
		  {
			label: readableLabels[4],
			data: series[4],
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		  }
		  
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
				label: readableLabels[0],
				data: series[0],
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			  },
			  {
				label: readableLabels[1],
				data: series[1],
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			  },
			  {
				label: readableLabels[2],
				data: series[2],
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			  },
			  {
				label: readableLabels[3],
				data: series[3],
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			  },
			  {
				label: readableLabels[4],
				data: series[4],
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			  }
		],
	  };
	  
	return (
		<Line options={options} data={data} />
	);
  }
}

export default Chart1;