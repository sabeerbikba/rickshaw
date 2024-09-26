import connectDB from "./connectdb";

const logError = async (error: Error, route?: string): Promise<void> => {
   try {
      const collection = await connectDB("backend_errorlogs");

      await collection.insertOne({
         errorMsg: error.message,
         stack: error.stack,
         route,
         error,
         timestamp: new Date().toISOString(),
      });
   } catch (error) {

      logError(error as Error, 'itself as recusive function (utils)');
      console.error('Failed to log error:', error);
   }
};

export default logError;