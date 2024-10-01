import connectDB from "./connectdb";
import sendEmail from "./sendmail";

const getISTTimestamp = (): string => {
   const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',  // Set timezone to IST
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
   };

   const now = new Date();
   return now.toLocaleString('en-IN', options).replace(/\//g, '-'); // Format the date and replace slashes with dashes
};


const logError = async (error: Error, route?: string): Promise<void> => {

   try {
      const document = {
         error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: error.cause,
         },
         route,
         timestamp: getISTTimestamp(),
      }

      const collection = await connectDB("backend_errorlogs");
      await collection.insertOne(document);
      await sendEmail(document);
   } catch (error) {

      // logError(error as Error, 'itself as recusive function (utils)');
      // it can cause infinte loop need to use diffrent approch 

      console.error('Failed to log error:', error);
   }
};

export default logError;