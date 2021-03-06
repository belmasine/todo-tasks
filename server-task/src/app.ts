import express from 'express';
require('dotenv').config();

const cors = require('cors');
const app = express();
import connectDB  from './db/connect'
 
/* routes */

import tasks from './routes/tasks'
import {errorHandler} from './middleware/error-handler'

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());
app.use('/api/tasks', tasks);

const notFound = (_: any, res: {status: Function, send: Function}) => {
  res.status(404).send('Route not found')
}

app.use(notFound)
app.use(errorHandler)

/* connect MongoDB */
const port = process.env.PORT || 3000;
        
const start = async (credentials: string) => {
  try {
    await connectDB(credentials);
    app.listen(port);
    console.log(`server is listening on port ${port}...`)
  } catch (error) {
      console.log(error)
  }
}
 
start((process.env as {CREDENTIALS: string}).CREDENTIALS);
