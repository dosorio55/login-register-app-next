import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    mongoose.connect(mongoUri);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
        console.error('MongoDB connection error: ', err);
        process.exit(1);
    })
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
