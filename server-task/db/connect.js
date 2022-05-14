const mongoose = require('mongoose');

const connectDB = (credentials) => {
  // params for fix some warnings
  const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
    
  return mongoose.connect(credentials, params)
    .then(() => console.log('connect to DB ...'))
    .catch((err) => console.log(err));

}

module.exports = connectDB;
