"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { matchesUrl } from "@/utils/functions";

const GalleryScroll = (): JSX.Element => {
   const pathname = usePathname();

   useEffect(() => {
      if (matchesUrl(pathname, '/gallery/*')) {
         console.log('inside true');
         document.body.style.overflow = "hidden";
      } else {
         console.log('inside false');
         document.body.style.overflow = "";
      }

   }, [pathname])

   return <div className="gallery-scroll"></div>;
}

export default GalleryScroll;