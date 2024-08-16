'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TODO: this component used in `/login` and `/dashboard` change folder name or move outside the `login` folder inside `components` folder

interface DelayedRedirectProps {
   seconds: number;
   showTimer?: boolean;
}

const DelayedRedirect = ({ seconds, showTimer = false }: DelayedRedirectProps) => {
   const router = useRouter();
   const [intervalTimer, setIntervalTimer] = useState(0);

   useEffect(() => {
      const timer = setTimeout(() => {
         router.push('/login');
      }, seconds * 1000);

      let interval: NodeJS.Timeout | null = null;
      if (showTimer) {
         interval = setInterval(() => {
            setIntervalTimer((prevTimer) => prevTimer + 1);
         }, 1000);
      }

      return () => {
         clearTimeout(timer);
         if (interval) clearInterval(interval);
      };
   }, [router, seconds, showTimer]);

   return showTimer ? <div>Redirecting after {seconds - intervalTimer} seconds</div> : null;
};

export default DelayedRedirect;