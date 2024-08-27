import { NextRequest, NextResponse } from 'next/server';

const environment = process.env.NODE_ENV || 'production';
const allowedOrigin = process.env.NEXT_PUBLIC_URL;
console.log(environment);
// TODO: custom headers and CSRF tokens. if it's good idea 
// TODO: logging and send mail, if those conditions are true 
// const allowedCustomHeader = 'custom-value';

console.log('middleware detected outside function');
// To restrict access to API routes from API testing clients, [Still Not Secure]
export async function middleware(req: NextRequest) {
   console.log('middleware detected inside function');
   const origin = req.headers.get('origin');
   const referer = req.headers.get('referer');
   // const customHeader = req.headers.get('x-custom-header');

   console.log('origin: ', origin);
   console.log('allowedOrigin: ', allowedOrigin);
   console.log('referer: ', referer);

   if (environment === 'production') {
      if (origin !== allowedOrigin) {
         console.log('origin !== allowedOrigin');
         return new NextResponse('Forbidden', { status: 403 });
      }

      // Check if the referer header starts with your domain
      if (!referer || !referer.startsWith(allowedOrigin)) {
         console.log('!referer || !referer.startsWith(allowedOrigin)');
         return new NextResponse('Forbidden', { status: 403 });
      }
   }

   // Check for a custom header
   // if (customHeader !== allowedCustomHeader) {
   //    return new NextResponse('Forbidden', { status: 403 });
   // }

   console.log('not hacker!!');
   return NextResponse.next();
}

export const config = {
   matcher: ['/api/:path*'],
};