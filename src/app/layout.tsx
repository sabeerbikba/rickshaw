import "server-only";
import type { Viewport } from 'next'
import Link from "next/link";
import NavLinks from "@/components/home/navlink";
import Logo from "@/components/home/logo";
import Line from "@/components/home/line";
import Class from "@/components/home/class";
import "./globals.css";


export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1.0,
};

const RootLayout = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>): JSX.Element => {
   return (
      <html lang="en">
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
            <Class />
         </body>
      </html>
   );
};

export default RootLayout;