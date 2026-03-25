const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./backend/routes/tasks');
const connectDB = require('./backend/db/connect');
require('dotenv').config();
const notFound = require('./backend/middleware/not-found');
const errorHandlerMiddleware = require('./backend/middleware/error-handler');

// middleware

app.use(cors());
app.use(express.static('./starter/public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
