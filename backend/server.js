const express = require('express');
const oracledb = require('oracledb');
const dotenv = require('dotenv');
const { appendFile } = require('fs');

const app = express();

dotenv.config();

const PORT = 5000;

var cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>{console.log(`listen to port ${PORT}`);})

app.get('/getPerson', async (req, res) => {
    async function fetchPerson() {
      try {
        const connection = await oracledb.getConnection({ 
          user: process.env.USER_NAME, 
          password: process.env.DB_PASSWORD, 
          connectionString: process.env.DB_URL 
        });

        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
        const result = await connection.execute(`select * from PERSON where (CRASH_ID = 12529587)`)
        return result;

      } catch(error) {
        return error;
      }
    }

    fetchPerson()
    .then(dbRes =>{
      res.send(dbRes);
    })
})

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: process.env.USER_NAME, password: process.env.DB_PASSWORD, connectionString: process.env.DB_URL });

    console.log("Successfully connected to Oracle Database");

    // Create a table

    /*
    await connection.execute(`begin
                                execute immediate 'drop table todoitem';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

    await connection.execute(`create table todoitem (
                                id number generated always as identity,
                                description varchar2(4000),
                                creation_ts timestamp with time zone default current_timestamp,
                                done number(1,0),
                                primary key (id))`);

    // Insert some data

    const sql = `insert into todoitem (description, done) values(:1, :2)`;

    const rows =
          [ ["Task 1", 0 ],
            ["Task 2", 0 ],
            ["Task 3", 1 ],
            ["Task 4", 0 ],
            ["Task 5", 1 ] ];

    let result = await connection.executeMany(sql, rows);

    console.log(result.rowsAffected, "Rows Inserted");

    connection.commit();
    */

    // Now query the rows back

    
    result = await connection.execute(
      `select * from PERSON where (AGE = 18) AND ETHNICITY = 1`,
      [],
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    const rs = result.resultSet;
    let row;

    while ((row = await rs.getRow())) {
      if (row.DONE)
        console.log(row.DIED, "is dead");
      else
        console.log(row.AGE, "is Old");
    }

    await rs.close();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

//run();

/*
        const result = await connection.execute(
          `select * from PERSON where (AGE = 18) AND (ETHNICITY = 1)`,
          [],
          { resultSet: true, outFormat: oracledb.OUT_FORMAT_ARRAY });
          return result;
const express = require('express');
const oracledb = require('oracledb');
const app = express();
const PORT = 5000;

app.get('/',(req,res)=>{
    res.send(`Hello World`);
})

app.get('/customers',(req,res)=> {
    async function fetchDataCustomers() {
        try {
            const connection = await oracledb.getConnection({
                user: 'HR',
                password: '123',
                connectString: ''
            })
            const result = await connection.execute('SELECT * FROM hr.custoemrs');
        } catch(error) {
            return error;
        }
    }
    fetchDataCustomers();
    then(dbRes => {
        res.send(dbRes);
    }).catch()

})


app.listen(PORT, ()=>{console.log(`listen to port ${PORT}`);})
*/