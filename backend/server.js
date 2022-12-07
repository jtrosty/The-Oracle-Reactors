//This page retrieves query data from Oracle Database
const express = require('express');
const oracledb = require('oracledb');
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;
dotenv.config();
var cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>{console.log(`listen to port ${PORT}`);})

database_initialized = false

const attrToAttribute = {aszf: "Active_School_Zone_Flag",   ai: "At_Intersection",              cdc: "Crash_Death_Count", 
                        czf: "Construction_Zone_Flag",      ssf: "Stop_Sign_Flag",              ysf: "Yield_Sign_Flag",         tct: "Traffic_Control_Type",
	                      dow: "Day_Of_Week",                 ctic: "Crash_Total_Injury_Count",   ct1: "Crash_Time",              ct2: "Crash_Time", 
                        cd1: "Crash_Date",                  cd2: "Crash_Date",                  udc: "Death_Count",             vmn: "Vehicle_Model_Name", 
                        vm: "Vehicle_Make",                 unic: "Not_Injured_Count",          utic: "Total_Injury_Count",     vmy: "Vehicle_Model_Year", 
                        cf1: "Contributing_Factor_1",       cf2: "Contributing_Factor_2",       cf3: "Contributing_Factor_3",   cvt: "CMV_Vehicle_Type", 
                        ud: "Description",                  c: "Citation",                      d: "Died",                      e: "Ethnicity", 
                        g: "Gender",                        a: "Age",                           ni: "Not_Injured"};


//Connection Management
async function init_database() {
	try {
		await oracledb.createPool({
			user: process.env.USER_NAME, 
            password: process.env.DB_PASSWORD, 
            connectionString: process.env.DB_URL
		});
		console.log("Successfully created connection pool");
		database_initialized = true
	}
	catch (err) {
		console.log("Encountered an error creating a connection pool, retrying");
		await init_database();
	}
}

async function deinit_database() {
	try {
		await oracledb.getPool().close(10);
		console.log("Successfully closed connection pool");
		process.exit(0);
	}
	catch (err) {
		console.log("Encountered an error closing the connection pool, retrying");
		await deinit_database();
	}
}
//End Connection Management


//Query 1
app.get('/getQuery1', async (req, res) => {
  const attribute = req.query.attr.split("|")
  const op = req.query.op.split("|")
  const val = req.query.val.split("|")
  let sqlStrings = [];

  for (let i = 0; i < attribute.length - 1; i++) {
    let temp = attrToAttribute[attribute[i]]
    if (temp != null && temp.length > 0) {
      sqlStrings.push(`${temp}  ${op[i]}  ${val[i]}`);
    }
  }
  async function fetchQuery1() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		let filters = sqlStrings.join(' AND ')
		if (sqlStrings.length > 0) {
			filters = ` AND ${filters}`
		}

		const query = 
		  `SELECT CONTRIBUTING_FACTOR_1, CRASH_YEAR, 
			COUNT("CWOJTAK".Crash.CRASH_ID) / 
				(SELECT COUNT(CRASH_ID) FROM "CWOJTAK".Crash) * 100
			FROM "CWOJTAK".Crash
			JOIN "DYLANTOSH".Unit ON 
				"CWOJTAK".Crash.CRASH_ID = "DYLANTOSH".Unit.CRASH_ID
			WHERE CONTRIBUTING_FACTOR_1 IN
				(SELECT CONTRIBUTING_FACTOR_1 
					FROM "CWOJTAK".Crash
					JOIN "DYLANTOSH".Unit ON 
						"CWOJTAK".Crash.CRASH_ID = "DYLANTOSH".Unit.CRASH_ID
					WHERE CONTRIBUTING_FACTOR_1 IS NOT NULL
					${filters}
					GROUP BY CONTRIBUTING_FACTOR_1
					ORDER BY COUNT("CWOJTAK".Crash.CRASH_ID) DESC
					FETCH FIRST 6 ROWS ONLY)
			${filters}
			GROUP BY CONTRIBUTING_FACTOR_1, CRASH_YEAR
			ORDER BY CONTRIBUTING_FACTOR_1 ASC, CRASH_YEAR ASC
		  `


		const result = await connection.execute(query)
		console.log("Completed request");
	  
	  try {
			await connection.close();
	  }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
	  
      return result;
    } 
    catch(error) {
      return error;
    }
  }

  fetchQuery1()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//Query 2
app.get('/getQuery2', async (req, res) => {
  const attribute = req.query.attr.split("|")
  const op = req.query.op.split("|")
  const val = req.query.val.split("|")
  let sqlStrings = [];

  for (let i = 0; i < attribute.length - 1; i++) {
    let temp = attrToAttribute[attribute[i]]
    if (temp != null && temp.length > 0) {
      sqlStrings.push(`${temp}  ${op[i]}  ${val[i]}`);
    }
  }
  async function fetchQuery2() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		let filters = sqlStrings.join(' AND ')
		if (sqlStrings.length > 0) {
			filters = ` AND ${filters}`
		}

		const query = 
		  `SELECT DISTINCT VEHICLE_MAKE, VEHICLE_MODEL_NAME, CRASH_YEAR, AVG(DEATH_COUNT) 
			FROM "DYLANTOSH".Unit
			JOIN "CWOJTAK".Crash ON "CWOJTAK".Crash.CRASH_ID = "DYLANTOSH".Unit.CRASH_ID
			WHERE (VEHICLE_MAKE, VEHICLE_MODEL_NAME) IN 
				(SELECT VEHICLE_MAKE, VEHICLE_MODEL_NAME
					FROM "DYLANTOSH".Unit
					JOIN "CWOJTAK".Crash ON "CWOJTAK".Crash.CRASH_ID = "DYLANTOSH".Unit.CRASH_ID
					WHERE VEHICLE_MAKE IS NOT NULL AND VEHICLE_MODEL_NAME IS NOT NULL
					${filters}
					GROUP BY VEHICLE_MAKE, VEHICLE_MODEL_NAME
					HAVING COUNT(*) > 0.005 * (SELECT COUNT(*) FROM "DYLANTOSH".Unit, "CWOJTAK".Crash
						WHERE VEHICLE_MAKE IS NOT NULL AND VEHICLE_MODEL_NAME IS NOT null
						AND "DYLANTOSH".Unit.CRASH_ID = "CWOJTAK".Crash.CRASH_ID
						${filters})
					ORDER BY AVG(DEATH_COUNT) DESC
					FETCH FIRST 5 ROWS ONLY)
			${filters}
			GROUP BY VEHICLE_MAKE, VEHICLE_MODEL_NAME, CRASH_YEAR
			ORDER BY VEHICLE_MAKE ASC, VEHICLE_MODEL_NAME ASC, CRASH_YEAR ASC
		  `

		const result = await connection.execute(query)
		console.log("Completed request");
	  
	  try {
			await connection.close();
	  }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
	  
      return result;
    } 
    catch(error) {
      return error;
    }
  }

  fetchQuery2()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//Query 3
app.get('/getQuery3', async (req, res) => {
  const attribute = req.query.attr.split("|")
  const op = req.query.op.split("|")
  const val = req.query.val.split("|")
  let sqlStrings = [];

  for (let i = 0; i < attribute.length - 1; i++) {
    let temp = attrToAttribute[attribute[i]]
    if (temp != null && temp.length > 0) {
      sqlStrings.push(`${temp}  ${op[i]}  ${val[i]}`);
    }
  }
  async function fetchQuery3() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		let filters = sqlStrings.join(' AND ')
		if (sqlStrings.length > 0) {
			filters = ` AND ${filters}`
		}

		const query = 
		  `SELECT TRAFFIC_CONTROL_TYPE, CRASH_YEAR, 
			AVG(CRASH_TOTAL_INJURY_COUNT)
			FROM "CWOJTAK".Crash C
			WHERE EXISTS
				(SELECT 1 FROM "DYLANTOSH".Unit U
					WHERE C.CRASH_ID = U.CRASH_ID
					AND U.CMV_VEHICLE_TYPE IS NOT NULL)
				AND TRAFFIC_CONTROL_TYPE IN
				(SELECT TRAFFIC_CONTROL_TYPE
					FROM "CWOJTAK".Crash
					WHERE TRAFFIC_CONTROL_TYPE IS NOT NULL
					${filters}
					GROUP BY TRAFFIC_CONTROL_TYPE
					ORDER BY COUNT("CWOJTAK".Crash.CRASH_ID) DESC
					FETCH FIRST 5 ROWS ONLY)
			${filters}
			GROUP BY TRAFFIC_CONTROL_TYPE, CRASH_YEAR
			ORDER BY TRAFFIC_CONTROL_TYPE ASC, CRASH_YEAR ASC
		  `


		const result = await connection.execute(query)
		console.log("Completed request");
	  
	  try {
			await connection.close();
	  }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
	  
      return result;
    } 
    catch(error) {
      return error;
    }
  }

  fetchQuery3()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//Query 4
app.get('/getQuery4', async (req, res) => {
  const attribute = req.query.attr.split("|")
  const op = req.query.op.split("|")
  const val = req.query.val.split("|")
  let sqlStrings = [];

  for (let i = 0; i < attribute.length - 1; i++) {
    let temp = attrToAttribute[attribute[i]]
    if (temp != null && temp.length > 0) {
      sqlStrings.push(`${temp}  ${op[i]}  ${val[i]}`);
    }
  }
  async function fetchQuery4() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		let filters = sqlStrings.join(' AND ')
		if (sqlStrings.length > 0) {
			filters = ` AND ${filters}`
		}

		const query = 
		  `SELECT 
			TO_CHAR(DATE '1970-01-01'
				+ FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96, 'HH24::MI::SS')
			AS CRASH_TIME,
			AVG(TOTAL_INJURY_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT + DEATH_COUNT)) * 100 
			AS PercentInjury, 
			AVG(DEATH_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT + DEATH_COUNT)) * 100
			AS PercentDeath
			FROM "DYLANTOSH".Unit U
			JOIN "CWOJTAK".Crash C ON C.CRASH_ID = U.CRASH_ID
			WHERE TOTAL_INJURY_COUNT + NOT_INJURED_COUNT + DEATH_COUNT <> 0
				AND 2 >= (SELECT COUNT(*) FROM "JONATHAN.TROST".Person P WHERE P.CRASH_ID = C.CRASH_ID)
			${filters}
			GROUP BY
				DATE '1970-01-01' + 
				FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96
			ORDER BY CRASH_TIME ASC
		  `

		const result = await connection.execute(query)
		console.log("Completed request");
	  
	  try {
			await connection.close();
	  }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
      return result;
    } 
    catch(error) {
      return error;
    }
  }

  fetchQuery4()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//Query 5
app.get('/getQuery5', async (req, res) => {
  const attribute = req.query.attr.split("|")
  const op = req.query.op.split("|")
  const val = req.query.val.split("|")
  let sqlStrings = [];

  for (let i = 0; i < attribute.length - 1; i++) {
    let temp = attrToAttribute[attribute[i]]
    if (temp != null && temp.length > 0) {
      sqlStrings.push(`${temp}  ${op[i]}  ${val[i]}`);
    }
  }
  async function fetchQuery5() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		let filters = sqlStrings.join(' AND ')
		if (sqlStrings.length > 0) {
			filters = ` AND ${filters}`
		}

		const query = 
		  `SELECT ACTIVE_SCHOOL_ZONE_FLAG, CONSTRUCTION_ZONE_FLAG, CRASH_YEAR,
			COUNT(CASE CITATION WHEN 'Y' THEN 1 ELSE NULL END) 
			/ COUNT(DISTINCT U.UNIT_NUMBER + C.CRASH_ID * C.CRASH_ID) * 100
			AS PercentCited
			FROM "CWOJTAK".Crash C, "DYLANTOSH".Unit U, "JONATHAN.TROST".Person P
			WHERE C.CRASH_ID = U.CRASH_ID AND C.CRASH_ID = P.CRASH_ID 
				AND U.UNIT_NUMBER = P.UNIT_NUMBER
			${filters}
			GROUP BY ACTIVE_SCHOOL_ZONE_FLAG, CONSTRUCTION_ZONE_FLAG, CRASH_YEAR
			ORDER BY ACTIVE_SCHOOL_ZONE_FLAG ASC, CONSTRUCTION_ZONE_FLAG ASC,
				CRASH_YEAR ASC
		  `


		const result = await connection.execute(query)
		console.log("Completed request");
	  
	  try {
			await connection.close();
	    }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
	  
      return result;
    } 
    catch(error) {
      return error;
    }
  }

  fetchQuery5()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//FAQ
app.get('/getTupleCount', async (req, res) => {
  async function fetchTupleCount() {
    try {
		const connection = await oracledb.getConnection();

		oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

		const result = await connection.execute(`SELECT COUNT(*) FROM "CWOJTAK".Crash`);
		const result2 = await connection.execute(`SELECT COUNT(*) FROM "DYLANTOSH".Unit`);
		const result3 = await connection.execute(`SELECT COUNT(*) FROM "JONATHAN.TROST".Person`);
		
		console.log("Completed request");
	  
	  try {
			await connection.close();
	    }
		catch (err) {
			console.log("Encountered an error closing a connection in the connection pool.");
		}
	  
      return {data: result.rows[0][0] + result2.rows[0][0] + result3.rows[0][0]};
    } 
    catch(error) {
      return error;
    }
  }

  fetchTupleCount()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

process.once("SIGTERM", deinit_database).once("SIGINT", deinit_database);

init_database();