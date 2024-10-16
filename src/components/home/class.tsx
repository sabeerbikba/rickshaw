"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HTML_CLASS = 'html';
const BODY_CLASS = 'body';
const BODY_COLOR = "#575757";

const Class: React.FC = (): JSX.Element => {
   const pathname = usePathname();

   useEffect(() => {
      const header = document.querySelector('header');

      if (pathname === '/') {
         document.documentElement.classList.add(HTML_CLASS);
         document.body.classList.add(BODY_CLASS);
         document.body.style.color = BODY_COLOR;
         if (header) {
            header.classList.add("header-relative");
            header.classList.remove('header-fixed');
         }
      } else {
         document.documentElement.classList.remove(HTML_CLASS);
         document.body.classList.remove(BODY_CLASS);
         document.body.style.color = "";
         if (header) {
            header.classList.add('header-fixed');
            header.classList.remove("header-relative");
         }
      }

      return () => {
         document.documentElement.classList.remove(HTML_CLASS);
         document.body.classList.remove(BODY_CLASS);
         document.body.style.color = "";
      };
   }, [pathname]);

   return <div className="display-none"></div>;
}

export default Class;
