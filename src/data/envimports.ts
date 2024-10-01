const ENV_BASE_URL = process.env.BASE_URL as string;
const ENV_MONGODB_URI = process.env.MONGODB_URI as string;
const ENV_IMGBB_API = process.env.IMGBB_API as string;
const ENV_NODE_ENV = process.env.NODE_ENV as string;
const ENV_EMAIL1 = process.env.EMAIL1 as string;
const ENV_EMAIL2 = process.env.EMAIL2 as string;
const ENV_EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

const FALLBACK_BASE_URL = 'https://honnavarrickshawservice.vercel.app';
const BASE_URL = ENV_BASE_URL || FALLBACK_BASE_URL;
const isDevelopmentEnv = ENV_NODE_ENV == 'development';

export {
   ENV_BASE_URL,
   FALLBACK_BASE_URL,
   BASE_URL,
   ENV_MONGODB_URI,
   ENV_IMGBB_API,
   ENV_NODE_ENV,
   isDevelopmentEnv,
   ENV_EMAIL1,
   ENV_EMAIL2,
   ENV_EMAIL_PASSWORD,
};