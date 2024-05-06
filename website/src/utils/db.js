import mongoose from 'mongoose';

export const connectDB = async () => {
if(mongoose.connection.readyState == 0) {
  console.log("Connecting db")
  await mongoose
    .connect(process.env.DB_URL, {
      dbName: 'Cluster0',
    })
  }
};
