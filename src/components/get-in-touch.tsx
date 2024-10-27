"use client";
import { HTMLAttributes } from "react";

const GetInTouchBtn = (
   { page, text, ...props }:
      { page: string; text: string } & HTMLAttributes<HTMLButtonElement>
) => {

   const handleClick = () => {
      const phoneNumber = '918970517155';
      window.open(`tel:+${phoneNumber}`, '_self');
      window.open(`https://wa.me/${phoneNumber}/?text=${encodeURIComponent('I would like to call you')}`, '_blank');

      // Log click on the server
      const body = new FormData();
      body.append("page", page);
      fetch("/api/click", {
         method: 'POST',
         body: body,
      });
   }

   return (
      <button {...props} onClick={() => handleClick()}>{text}</button>
   );
};

export default GetInTouchBtn;
