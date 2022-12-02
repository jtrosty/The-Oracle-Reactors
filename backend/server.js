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
	
  async function fetchQuery4() {
    try {
      const connection = await oracledb.getConnection();

      oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
      const result = await connection.execute(`
	  SELECT 
		TO_CHAR(TRUNC(CRASH_TIME) + FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96, 'HH24::MI::SS')
		AS CRASH_TIME,
		AVG(TOTAL_INJURY_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT)) * 100 
		AS PercentInjury, 
		AVG(DEATH_COUNT / (TOTAL_INJURY_COUNT + NOT_INJURED_COUNT)) * 100
		AS PercentDeath
		FROM "DYLANTOSH".Unit U
		JOIN "CWOJTAK".Crash C ON C.CRASH_ID = U.CRASH_ID
		WHERE TOTAL_INJURY_COUNT + NOT_INJURED_COUNT <> 0
		GROUP BY
			TRUNC(CRASH_TIME) + FLOOR(TO_NUMBER(TO_CHAR(CRASH_TIME, 'SSSSS'))/900)/96
		ORDER BY CRASH_TIME ASC
	  `)
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