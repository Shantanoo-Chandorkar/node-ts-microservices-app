// Using environment variables
import * as dotenv from "dotenv";
dotenv.config();
import * as mongoose from "mongoose";

const mongooseConnect = async () => {
  const connect = mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then((res) => {
      console.clear();
      console.log(`Connected to the mongodb!!..`);
    })
    .catch((err) => console.log(err));

  return connect;
};

export default mongooseConnect;
