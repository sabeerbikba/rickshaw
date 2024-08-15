'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DelayedRedirect = ({ seconds }: { seconds: number }) => {
   const router = useRouter();

   useEffect(() => {
      const timer = setTimeout(() => {
         router.push('/login');
      }, seconds * 1000);

      return () => clearTimeout(timer);
   }, [router]);

   return null;
};

export default DelayedRedirect;
