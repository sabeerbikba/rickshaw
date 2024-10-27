import type { Metadata } from "next";
import Script from 'next/script';
import Road from "@/components/home/road";
import Main from "@/components/home/main";
import image from '@/tmpImages/GWpSpVl.jpeg';
import PlaceholderImage from "@/components/placeholderImage";
import { BASE_URL } from "@/data/envimports";
import "./styles.css";

const metadataObject = {
   title: "Explore Honnavar Like a Local - Rickshaw Tours",
   description: "Embark on a unique journey through the heart of Honnavar with our authentic rickshaw tours.",
   url: BASE_URL,
};

export const metadata: Metadata = {
   title: metadataObject.title,
   description: "Explore Honnavar like a local with our authentic rickshaw tours. Book your tour today and experience the heart of Honnavar in a unique way.",
   keywords: ["Honnavar", "rickshaw tours", "local experience", "tourism, explore Honnavar", "Honnavar city tours"],
   alternates: {
      canonical: metadataObject.url,
   },
   openGraph: {
      type: 'website',
      url: metadataObject.url,
      title: metadataObject.title,
      description: metadataObject.description,
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg",
            alt: "Rickshaw Card"
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      // url: metadataObject.url, // doesn't supported for now
      title: metadataObject.title,
      description: metadataObject.description,
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg"
         }
      ]
   }
};

export default function HomePage() {
   return (
      <main className="main-home">
         <div className="main-image">
            <div className="hero-img-div flex-center">
               <PlaceholderImage
                  image={image}
                  alt='sunshine-ocean'
                  mainSrc="https://i.imgur.com/GWpSpVl.jpeg"
                  classNames="hero-img"
               />
            </div>
            <div className="text-center bottom-div">
               <div className="inline">
                  <svg
                     viewBox="0 0 15 15"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <circle
                        cx="7.5"
                        cy="7.5"
                        r="7.5"
                        transform="matrix(1 0 0 -1 0 15)"
                        fill="#242424"
                     />
                  </svg>
               </div>
            </div>
         </div>
         <div className="content">
            <Main />
         </div>
         <div className="bar">
            <div className="bar-bar"></div>
         </div>
         <Road />
         <Script strategy="afterInteractive" src="/scripts/home-page.js"></Script>
      </main>
   );
}
