"use client";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import matchesUrl from "@/utils/matchesurl";
import Link from "next/link";
import '@/app/gallery/styles.css';

interface NavItem {
   urls: string[];
   href?: string;
   className?: string;
   id?: string;
   label?: string;
   component?: ReactNode;
}

const generateRelativePath = (pathname: string, targetPath: string) => {
   const depth = pathname.split('/').length - 1;
   const relativePrefix = './' + '../'.repeat(Math.max(0, depth - 1));
   return relativePrefix + targetPath.slice(2);
}

const NavLinks: FC = (): JSX.Element => {
   const pathname = usePathname();

   // When visited `urls` need to show ``href` and `component` in navigation bar
   const navItems: NavItem[] = [
      { urls: ['/', '/gallery', '/gallery/*'], href: './about-me/', className: 'text-dec-none nav-a indicator', id: 'aboutme-a', label: 'About me' },
      { urls: ['/', '/about-me', '/gallery/*'], href: './gallery/', className: 'text-dec-none nav-a indicator gallery', id: 'gallery-a', label: 'Gallery' },
      { urls: ['/gallery', '/gallery/*'], component: <button className="nav-a upload-btn" id="upload-button">Upload</button> },
   ];

   const isPageFound = navItems.some(item => item.urls.some(urlPattern => matchesUrl(pathname, urlPattern)));

   return (
      <ul className="nav-ul">
         {navItems.map((item, index): JSX.Element | ReactNode => {
            if (isPageFound) {
               return (
                  item.urls.some(urlPattern => matchesUrl(pathname, urlPattern)) && (
                     <li className="nav-li" key={index}>
                        {item.href ? (
                           <Link href={generateRelativePath(pathname, item.href)} className={item.className} id={item.id}>
                              {item.label}
                           </Link>
                        ) : (
                           item.component
                        )}
                     </li>
                  )
               );
            } else {

               // 404 page links
               return (
                  item.href && (
                     <li className="nav-li" key={index}>
                        <Link href={generateRelativePath(pathname, item.href)} className={item.className} id={item.id}>
                           {item.label}
                        </Link>
                     </li>
                  )
               );
            }
         })}
      </ul>
   );
};

export default NavLinks;

