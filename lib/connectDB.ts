import mongoose, { Mongoose } from 'mongoose';
import User from "@/models/User";
import Workspace from "@/models/Workspace";

const MONGO_URI = process.env.MONGODB_URI!;

let cachedClient: Mongoose | null = null;
let cachedDb: mongoose.Connection | null = null;

async function connectDB(): Promise<mongoose.Connection> {
  if (cachedClient) {
    return cachedDb!;
  }

  if (!MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    const client = await mongoose.connect(MONGO_URI);

    User;
    Workspace;

    cachedClient = client;
    cachedDb = client.connection;

    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB');
  }
}

export default connectDB
