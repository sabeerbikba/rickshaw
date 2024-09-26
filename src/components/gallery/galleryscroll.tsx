"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import matchesUrl from "@/utils/matchesurl";

const GalleryScroll = (): JSX.Element => {
   const pathname = usePathname();

   useEffect(() => {
      if (matchesUrl(pathname, '/gallery/*')) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }

   }, [pathname])

   return <div className="gallery-scroll"></div>;
}

export default GalleryScroll;