"use client";
import { useEffect, FC } from "react";
import { usePathname } from "next/navigation";

const HTML_CLASS = 'html';
const BODY_CLASS = 'body';
const BODY_COLOR = "#575757";
const HEADER_CLASS = "header";

const Class: FC = (): JSX.Element => {
   const pathname: string = usePathname();

   useEffect(() => {
      const header: Element | null = document.querySelector('header');

      if (pathname === '/') {
         document.documentElement.classList.add(HTML_CLASS);
         document.body.classList.add(BODY_CLASS);
         document.body.style.color = BODY_COLOR;
         header.classList.add(HEADER_CLASS);
      } else {
         document.documentElement.classList.remove(HTML_CLASS);
         document.body.classList.remove(BODY_CLASS);
         document.body.style.color = "";
         header.classList.remove(HEADER_CLASS);
      }

      return () => {
         document.documentElement.classList.remove(HTML_CLASS);
         document.body.classList.remove(BODY_CLASS);
         document.body.style.color = "";
         header.classList.remove(HEADER_CLASS);
      };
   }, [pathname]);

   return <div className="display-none"></div>;
}

export default Class;
