import mongoose from 'mongoose'

const connectDB = (credentials: string) => {
  // params for fix some warnings
  const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
    
  return mongoose.connect(credentials, params)
    .then(() => console.log('connect to DB ...'))
    .catch((err: Error) => console.log(err));
}

export default connectDB;
