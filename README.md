# CIS 4301 Group Project
## Texas Automobile Collision Trends Analyzer (TACTA)
### Contributors: Jonathan Trost, Dylan Tosh, Conor Wojtak and Parth Yagnik

Texas Automobile Collision Trends Analyzer (TACTA) is a database based web application that analyzes variety of factors that cause car collisions in state of Texas.



#### Pre requisites
1. node.js
2. Oracle instant client

#### Built With

* ![React][React.js]
* ![Node.js][Node.js]
* ![Express.js][Express.js]
* ![Oracle][Oracle]
#### To steup Backend:
1. Create a folder to hold all this, then inside that folder create backend folder.

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
    
6. In backend folder make file ``` server.js```

7. Copy and paste the code from oracle node.js setup site into server.js.

8. create a ```.env ``` file in backend directory

9. In ```.env```  file add:
    USER_NAME=jonathan.trost Your gatorID 
    DB_PASSWORD= This is the passowrd you get from: https://register.cise.ufl.edu/oracle/
    DB_URL=//oracle.cise.ufl.edu/orcl

10. Ensure the following is at the top of ```server.js```
    ```const dotenv = require('dotenv');```
    ```dotenv.config();```

11. in the ```getConnnection``` line in user: put ```process.env.USER_NAME```, for password: ```process.env.DB_PASSWORD```, for conneciton ```string process.env.DB_URL```

12. Now in ```terminal``` type ```node server.js```, you will know if it worked if you see the following: ```Successfully connected to Oracle Database```. Make sure you are connected to the CISE VPN! 5 Rows Inserted Task 1 is NOT done Task 2 is NOT done Task 3 is done Task 4 is NOT done Task 5 is done

#### To Steup Frontend:
1. Go into directory that has backend

2. Type ```npx create-react-app Oracle_Reactors```

3. This will make new directory, calle doracle reactors, go into it and test that it works npm start.

4. ```sh
    npm install bootstrap
    ```
    
5. ```sh
    npm install react-bootstrap
    ```
    
6. ```sh
    npm install react-router-dom
    ```


#### To setup project in new directory:

1.  Go to a directory you want to setup the project.

2. Git clone the repo

3. Find the node_modules folder in your react app and move it to the frontend folder.

4. Find the node_modules folder in your backend server and move it into the backend folder.

5. Test npm start in frontend.

6. Test nodemon server.js in the backend. (make sure you're connected to cise vpn)


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white

[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge

[Oracle]: https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black