# CIS 4301 Group Project
## Texas Automobile Collision Trends Analyzer (TACTA)
### Contributors: Dylan Tosh, Jonathan Trost, Connor Wojtak and Parth Yagnik

Texas Automobile Collision Trends Analyzer (TACTA) is a database based web application that analyzes variety of factors that cause car collisions in state of Texas.

#### Pre Requisites
1. Node.js
2. Oracle Instant Client

#### Built With

* ![React][React.js]
* ![Node.js][Node.js]
* ![Express.js][Express.js]
* ![Oracle][Oracle]

#### To Setup Backend:
1. Create a directory to hold a full stack application (e.g. Oracle_Reactors), then inside that directory create a directory named backend.

(Note: All commands below are run using the command line assuming a user is within the full stack application directory. e.g. ~/Desktop/Oracle_Reactors/)

2. ```sh
    cd backend
    ```

3.  ```sh
    npm init-y
    ```

4. ```sh
    npm i --save express
    ```

5. ```sh
    npm i --save-dev nodemon dotenv oracledb cors
    ```
    
6. In backend directory, make file ``` server.js```

7. Copy and paste the code from oracle node.js setup site into server.js.

8. Create a ```.env ``` file in backend directory

9. In ```.env```  file add:
    USER_NAME=jonathan.trost (Your gatorID) 
    DB_PASSWORD=InsertOraclePasswordHere (This is the password you get from: https://register.cise.ufl.edu/oracle/)
    DB_URL=//oracle.cise.ufl.edu/orcl

10. Ensure the following is at the top of ```server.js```
    ```const dotenv = require('dotenv');```
    ```dotenv.config();```

11. In the ```getConnnection``` line put: 
    for user: ```process.env.USER_NAME```
    for password: ```process.env.DB_PASSWORD```
    for connection ```string process.env.DB_URL```

12. Now in ```terminal``` type ```node server.js```. (Make sure you are connected to the UF CISE VPN!!!)You will 
    know if it worked if you see the following: 
    ```Successfully connected to Oracle Database```. 
    5 Rows Inserted 
    Task 1 is NOT done 
    Task 2 is NOT done 
    Task 3 is done 
    Task 4 is NOT done 
    Task 5 is done