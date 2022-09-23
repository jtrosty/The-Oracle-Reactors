# CIS 4301 Group Project
## Texas Automobile Collision Trends Analyzer (TACTA)
### Contributors: Dylan Tosh, Jonathan Trost, Connor Wojtak, and Parth Yagnik

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
    npm i --save-dev nodemon dotenv oracledb
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

#### To Setup Frontend:
1. From the command line, go into directory that also has the backend directory (e.g. ~/Desktop/Oracle_Reactors/)

2. Type ```npx create-react-app oracle_reactors``` in the command line.
    This will create a new directory called oracle_reactors. 

3. Use the command ```cd frontend``` to move into the frontend directory and test 
    that it works by using the command ```npm start```. Assuming it works, run the following commands:

4. ```sh
    npm install bootstrap
    ```
    
5. ```sh
    npm install react-bootstrap
    ```
    
6. ```sh
    npm install react-router-dom
    `

#### To Setup Project On Your Local Machine:

1. Go to or create a directory you want to setup the project in.

2. Git clone the repo.

3. Find the node_modules directory in your react app and move it to the frontend directory.

4. Find the node_modules directory in your backend server and move it into the backend directory.

5. Test npm start in frontend.

6. Test nodemon server.js in the backend. (Make sure you are connected to the UF CISE VPN!!!)

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge

[Oracle]: https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black
