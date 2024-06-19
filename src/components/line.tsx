"use server";

export default async function Line() {
   return (
      <div>
         <svg
            width="100%"
            viewBox="0 0 862 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <g id="line">
               <path
                  id="Vector 1"
                  d="M1 4.5H862"
                  stroke="black"
                  strokeWidth={3}
               />
               <ellipse
                  id="Ellipse 4"
                  cx={4}
                  cy="4.5"
                  rx={4}
                  ry="4.5"
                  fill="#FF0E0E"
               />
            </g>
         </svg>
      </div>
   )
}