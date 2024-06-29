import "server-only";
import type { Viewport } from 'next'
import Link from "next/link";
import NavLinks from "@/components/navlink";
import Logo from "@/components/logo";
import Line from "@/components/line";
import Class from "@/components/class";
import "./globals.css";

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1.0,
};

const navItems = [
   { urls: ['/', '/gallery', '/gallery/*'], href: './about-me/', className: 'text-dec-none nav-a indicator', id: 'aboutme-a', label: 'About me' },
   { urls: ['/', '/about-me', '/gallery/*'], href: './gallery/', className: 'text-dec-none nav-a indicator gallery', id: 'gallery-a', label: 'Gallery' },
   { urls: ['/gallery', '/gallery/*'], component: <button className="nav-a upload-btn" id="upload-button">Upload</button> },
];

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>): JSX.Element {


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
}
