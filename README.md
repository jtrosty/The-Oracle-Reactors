# The-Oracle-Reactors

Pre requisites
1. node.js
2. oralc einstant client


To setup backend:
1. create a folder to hold all this, then inside that folder create backend folder.  
2. cd backend 
3. npm init-y
4. npm i --save express
5. npm i --save-dev nodemon dotenv oracledb
6. In backend folder make file 'server.js'
7. Copy and paste the code from oracle node.js setup site into server.js.
8. create a .env file in backend directory
9. In .end file add: 

    USER_NAME=jonathan.trost Your gatorID
    DB_PASSWORD= This is the passowrd you get from: https://register.cise.ufl.edu/oracle/ 
    DB_URL=//oracle.cise.ufl.edu/orcl

10. Ok, ensure the following is at the top of server.js
    const dotenv = require('dotenv');
    dotenv.config();
11. in the getConnnection line, 
    in user: put process.env.USER_NAME, for password: process.env.DB_PASSWORD, for conneciton string process.env.DB_URL
12. now in terminal type node server.js, you will know if it worked if you see the following:
   Successfully connected to Oracle Database. MAKE SURE YOU ARE CONNECT TO THE CISER VPN!
        5 Rows Inserted
        Task 1 is NOT done
        Task 2 is NOT done
        Task 3 is done
        Task 4 is NOT done
        Task 5 is done 

To Setup Frontend:
1. go into directory that has backend
2. type npx create-react-app Oracle_Reactors
3. This will make new directory, calle doracle reactors, go into it and test that it works npm start.
4. npm install bootstrap
5. npm install react-bootstrap
6. npm install react-router-dom


To setup project in new directory.
1. Go to a directory you want to setup the project.
2. Git clone the repo
3. Find the node_modules folder in your react app and move it to the frontend folder.
4. Find the node_modules folder in your backend server and move it into the backend folder. 
5. Test npm start in frontend.
6. Test nodemon server.js in the backend. (make sure you're connected to cise vpn)