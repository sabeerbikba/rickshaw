import "server-only";
import Script from 'next/script';
import "./styles.css"
import Light from "@/components/light";
import Road from "@/components/road";

// TODO: some time show interval somethig error need to fix: when navigating to this page to other page

export default function HomePage() {
   return (
      <main className="main-home">
         <div className="main-image">
            <div className="hero-img-div flex-center">
               <img
                  className="hero-img"
                  src="https://i.imgur.com/GWpSpVl.jpeg"
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
            <Light position="left" />
            <div className="content-content">
               <h1>Explore Honnavar Like a Local</h1>
               <p>
                  Embark on a unique journey through the heart of Honnavar with our
                  authentic rickshaw tours.
               </p>
               <div className="flex-center">
                  <div className="btn-div" id="break">
                     <button id="btn">Book Your Tour Today!</button>
                  </div>
               </div>
            </div>
            <Light position="right" />
         </div>
         <div className="bar">
            <div className="bar-bar"></div>
         </div>
         <Road />
         {["/scripts/hammer.js", "/scripts/home-page.js"].map(src => (
            <Script strategy="afterInteractive" src={src}></Script>
         ))}
      </main>
   );
}
