import { MongoClient, Db, Collection } from 'mongodb';
import { ENV_MONGODB_URI } from '@/data/envimports';
import logError from './logerror';

const MONGODB_URI = ENV_MONGODB_URI;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
// cahced only work when requested same route repetitive

const connectDB = async (
   collection: string,
   database: string = 'rickshaw',
   dbUri: string = MONGODB_URI,
): Promise<Collection<any>> => {
   if (!dbUri) {
      throw new Error('Please provide a valid MongoDB URI.');
   }

   if (cachedClient && cachedDb) {
      const db = cachedDb.collection(collection);
      return db;
   }

   try {
      const client = new MongoClient(dbUri);

      await client.connect();
      cachedClient = client;
      cachedDb = client.db(database);

      const db = cachedDb.collection(collection);
      return db;
   } catch (error) {

      logError(error as Error, 'Inside connectDb() function');
      console.error("Database connection error:", error);
      throw new Error("Failed to connect to the database");
   }
};

export default connectDB;