const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { connectDB } = require('./db')
const { logger } = require('./logger')
const routes = require("./index.routes");


dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.on("finish", () => {
    const logMessage = `${req.method} ${req.url} ${res.statusCode}`;

    if (Object.keys(req.query).length) {
      logger.info(`${logMessage} - Query Params: ${JSON.stringify(req.query)}`);
    }

    if (req.body && Object.keys(req.body).length > 0) {
      logger.info(`${logMessage} - Request Body: ${JSON.stringify(req.body)}`);
    } else {
      logger.info(logMessage);
    }
  });
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Gamification API V1",
  });
});
app.get("/api/r", (req, res) =>{
 
  res.send({message: "success"})
})

app.get("/t", (req, res) =>{
    
  res.send({message: "new commit subscriptionsssss"})
})


app.use("/api/v1", routes);

module.exports = app