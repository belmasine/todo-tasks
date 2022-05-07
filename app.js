const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connect')
/* routes */
const tasks = require('./routes/tasks')
app.use(express.json());
app.use('/api/tasks', tasks);

/* connect MongoDB */
const port = 3000;
        
const start = async (credentials) => {
  try {
    await connectDB(credentials);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
      console.log(error)
  }
}

start(process.env.CREDENTIALS);
