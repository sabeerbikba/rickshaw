import { headers } from 'next/headers';

const getBaseUrl: () => string = () => {
   const headersList = headers();
   const host = headersList.get('host');
   const protocol = headersList.get('x-forwarded-proto') || 'http';
   return `${protocol}://${host}`;
};

export default getBaseUrl;