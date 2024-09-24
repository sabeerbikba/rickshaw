import connectDB from "./connectdb";

const logError = async (error: Error): Promise<void> => {
   try {
      console.log('inside logError: typeof error', typeof error);
      const collection = await connectDB("backend_errorlogs");

      await collection.insertOne({
         errorMsg: error.message,
         stack: error.stack,
         error,
         timestamp: new Date().toISOString(),
      });
   } catch (error) {

      logError(error as Error);
      console.error('Failed to log error:', error);
   }
};

export default logError;