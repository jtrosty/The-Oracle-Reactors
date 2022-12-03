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

/*
//TODO - Replace placeholder queries with actual ones

//Query 1
app.get('/getQuery1', async (req, res) => {
  async function fetchPerson() {
    try {
      const connection = await oracledb.getConnection({ 
        user: process.env.USER_NAME, 
        password: process.env.DB_PASSWORD, 
        connectionString: process.env.DB_URL 
      });

      oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
      const result = await connection.execute(`select * from "JONATHAN.TROST".PERSON where (CRASH_ID = 12529587)`)
      return result;

    } 
    catch(error) {
      return error;
    }
  }

  fetchPerson()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})

//Query 2
app.get('/getQuery2', async (req, res) => {
  async function fetchPerson() {
    try {
      const connection = await oracledb.getConnection({ 
        user: process.env.USER_NAME, 
        password: process.env.DB_PASSWORD, 
        connectionString: process.env.DB_URL 
      });

      oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
      const result = await connection.execute(`select * from "JONATHAN.TROST".PERSON where (CRASH_ID = 12529587)`)
      return result;

    } 
    catch(error) {
      return error;
    }
  }

  fetchPerson()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})
*/

//Query 3
app.get('/getQuery3', async (req, res) => {
    async function fetchQuery3() {
      try {
        const connection = await oracledb.getConnection({ 
          user: process.env.USER_NAME, 
          password: process.env.DB_PASSWORD, 
          connectionString: process.env.DB_URL 
        });

        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
        const result = await connection.execute(`select * from "JONATHAN.TROST".PERSON where (CRASH_ID = 12529587)`)
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
  console.log(req.query);
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
      filters = ` AND ${filters}`
      

    const string = `Select ${sqlStrings[0]} from ${sqlStrings[1]} Where ${sqlStrings[2]} AND ${sqlStrings[3]}]`

  console.log(filters)
    const query = 
      `SELECT 
      TO_CHAR(TRUNC(CRASH_TIME) + FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96, 'HH24::MI::SS')
      AS CRASH_TIME,
      AVG(TOTAL_INJURY_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT)) * 100 
      AS PercentInjury, 
      AVG(DEATH_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT)) * 100
      AS PercentDeath
      FROM "DYLANTOSH".Unit U
      JOIN "CWOJTAK".Crash C ON C.CRASH_ID = U.CRASH_ID
      WHERE TOTAL_INJURY_COUNT + NOT_INJURED_COUNT <> 0 
      ${filters}
      GROUP BY
        TRUNC(CRASH_TIME) + FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96
      ORDER BY CRASH_TIME ASC
      `

      console.log(query)

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
	finally {
		if (connection) {
			try {
				await connection.close();
			}
			catch (err) {
				console.log("Encountered an error closing a connection in the connection pool.");
			}
		}
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

/*
//Query 5
app.get('/getQuery5', async (req, res) => {
  async function fetchPerson() {
    try {
      const connection = await oracledb.getConnection({ 
        user: process.env.USER_NAME, 
        password: process.env.DB_PASSWORD, 
        connectionString: process.env.DB_URL 
      });

      oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
      const result = await connection.execute(`select * from "JONATHAN.TROST".PERSON where (CRASH_ID = 12529587)`)
      return result;

    } 
    catch(error) {
      return error;
    }
  }

  fetchPerson()
  .then(dbRes =>{
    res.send(dbRes);
  })
  .catch(err =>{
    res.send(err);
  })
})
*/

process.once("SIGTERM", deinit_database).once("SIGINT", deinit_database);

init_database();


/*
//Example testPerson Query

app.get('/getPerson', async (req, res) => {
    async function fetchPerson() {
      try {
        const connection = await oracledb.getConnection({ 
          user: process.env.USER_NAME, 
          password: process.env.DB_PASSWORD, 
          connectionString: process.env.DB_URL 
        });

        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
        const result = await connection.execute(`select * from "JONATHAN.TROST".PERSON where (CRASH_ID = 12529587)`)
        return result;

      } 
      catch(error) {
        return error;
      }
    }

    fetchPerson()
    .then(dbRes =>{
      res.send(dbRes);
    })
    .catch(err =>{
      res.send(err);
    })
})
*/