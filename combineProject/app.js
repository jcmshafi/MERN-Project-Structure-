const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Body Parser Implement
app.use(bodyParser.json())

//Security Middleware Declarations
const helmet = require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xssClean= require('xss-clean');
const rateLimit =require('express-rate-limit');
const hpp =require('hpp');
const cors =require('cors');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp())

// Request Rate Limit for user click per second
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Database Declaration
const mongoose =require('mongoose');

//frontend to backend connection
app.use(express.static('./client/dist'));
app.get('*', function(req,res){
    req.sendFile(path.resolve(__dirname, './client/dist/index.html'))
})


// API Routing end point Implement
app.use("/api/v1",router)



module.exports=app;