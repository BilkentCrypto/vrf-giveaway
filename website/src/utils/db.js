import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: 'Cluster0',
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.log(err);
    });
};
