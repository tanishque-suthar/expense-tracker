const dotenv = require("dotenv").config();
const express = require("express");
const {db} = require('./database/db');
const cors = require("cors");
const {readdirSync} = require('fs');

const port = 3000;
const app = express();

app.use(express.json());

readdirSync('./routes').map((route)=>app.use('/kekw',require('./routes/'+route)))

const server = ()=>{
    db();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

server();