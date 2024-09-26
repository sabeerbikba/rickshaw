
const Logo = (): JSX.Element => (
   <svg
      width="100%"
      height="100%"
      viewBox="0 0 88 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <g id="Group 1" filter="url(#filter0_d_4_18)">
         <path
            id="Union"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60.7036 50.7742C63.7873 47.0032 65.6333 42.2082 65.6333 36.9885C65.6333 24.8446 55.6418 15 43.3166 15C30.9915 15 21 24.8446 21 36.9885C21 42.4976 23.0563 47.5335 26.4538 51.3918L43.7 77L60.7105 50.7723L60.7036 50.7742Z"
            fill="white"
         />
         <ellipse
            id="Ellipse 3"
            cx="43.3166"
            cy="36.0039"
            rx="9.18921"
            ry="8.53283"
            fill="#C37E17"
         />
      </g>
      <defs>
         <filter
            id="filter0_d_4_18"
            x="0.9"
            y="-6.1"
            width="86.8333"
            height="104.2"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
         >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
               in="SourceAlpha"
               type="matrix"
               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
               result="hardAlpha"
            />
            <feOffset dx={1} />
            <feGaussianBlur stdDeviation="10.55" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
               type="matrix"
               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.73 0"
            />
            <feBlend
               mode="normal"
               in2="BackgroundImageFix"
               result="effect1_dropShadow_4_18"
            />
            <feBlend
               mode="normal"
               in="SourceGraphic"
               in2="effect1_dropShadow_4_18"
               result="shape"
            />
         </filter>
      </defs>
   </svg>
);

export default Logo;
