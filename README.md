# The-Oracle-Reactors


To setup backend:
1. create a foler to hold all this, then inside that folder create backend folder.  
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


To Setup Frontend:
1. 