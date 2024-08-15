import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;
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
      console.log("Database already connected, reusing client");
      const db = cachedDb.collection(collection);
      return db;
   }

   try {
      const client = new MongoClient(dbUri);

      await client.connect();
      cachedClient = client;
      cachedDb = client.db(database);

      console.log("Database connected successfully");
      const db = cachedDb.collection(collection);
      return db;
   } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Failed to connect to the database");
   }
};

export default connectDB;