import { FC } from 'react';
import type { Viewport } from 'next'
import Link from "next/link";
import NavLinks from "@/components/home/navlink";
import Logo from "@/components/home/logo";
import Line from "@/components/home/line";
import UploadModal from "@/components/gallery/uploadmodal";
import GalleryScroll from "@/components/gallery/galleryscroll";
import Class from "@/components/home/class";
import Script from 'next/script';
import "./globals.css";
import { ENV_BASE_URL } from '@/data/envimports';

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1.0,
};

console.log('isServer');

const RootLayout: FC<Readonly<{ children: React.ReactNode; }>> = ({ children }):
   JSX.Element => {

   const GTM_ID = 'GTM-P52WR3CZ';

   return (
      <html lang="en">
         <head>
            <meta name="twitter:url" content={ENV_BASE_URL} />
            <Script
               id="gtm-script"
               strategy="afterInteractive"
               dangerouslySetInnerHTML={{
                  __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`
               }}
            />
         </head>
         <body>
            <header className="header">
               <div className="nav-nav-nav">
                  <div className="nav flex">
                     <div className="nav-logo-div">
                        <Link className="text-dec-none" href="/">
                           <Logo />
                        </Link>
                     </div>
                     <div className="nav-nav-div">
                        <nav className="nav-links">
                           <ul className="nav-ul">
                              <NavLinks />
                           </ul>
                        </nav>
                        <Line />
                     </div>
                  </div>
               </div>
            </header>
            {children}
            <UploadModal />
            <GalleryScroll />
            <Class />
            <noscript>
               <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
               />
            </noscript>
         </body>
      </html>
   );
};

export default RootLayout;