import "server-only";
import Script from 'next/script';
import Road from "@/components/road";
import "./styles.css"
import Main from "@/components/main"

export default function HomePage() {
   return (
      <main className="main-home">
         <div className="main-image">
            <div className="hero-img-div flex-center">
               <img
                  className="hero-img"
                  // src="https://i.imgur.com/GWpSpVl.jpeg"
                  src="./tmp/GWpSpVl.jpg" // TODO: need to remove this image
                  alt="sunshine-ocean"
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
         {/* {["/scripts/hammer.js", "/scripts/home-page.js"].map((src, key) => (
            <Script strategy="afterInteractive" src={src} key={key}></Script>
         ))} */}
         <Script strategy="afterInteractive" src="/scripts/home-page.js"></Script>
      </main>
   );
}
