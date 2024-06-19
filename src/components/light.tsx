"use server";

export default async function Light({ position }: { position: string }) {
   return (
      <div className={`light-${position}`}>
         <svg
            className={`light light-${position}-svg`}
            viewBox="0 0 328 333"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <g id="light">
               <g id="lights">
                  <rect
                     id="Rectangle 9"
                     x="128.364"
                     y={80}
                     width="67.24"
                     height="141.094"
                     rx={25}
                     fill="#D9D9D9"
                  />
                  <path
                     id="Rectangle 10"
                     d="M128 105C128 91.1929 139.193 80 153 80H171C184.807 80 196 91.1929 196 105V115H128V105Z"
                     fill="#B81C17"
                  />
                  <path
                     id="Rectangle 11"
                     d="M128 185H196V196C196 209.807 184.807 221 171 221H153C139.193 221 128 209.807 128 196V185Z"
                     fill="#B81C17"
                  />
                  <rect
                     id="Rectangle 12"
                     x={128}
                     y={115}
                     width={5}
                     height={70}
                     fill="#B81C17"
                  />
                  <g id="Vector 2" filter="url(#filter0_f_113_109)">
                     <path d="M133 157L192 157" stroke="black" />
                  </g>
                  <rect
                     id="Rectangle 14"
                     x={133}
                     y={185}
                     width={23}
                     height={59}
                     transform="rotate(-90 133 185)"
                     fill="url(#paint0_linear_113_109)"
                  />
                  <rect
                     id="Rectangle 13"
                     x={191}
                     y={115}
                     width={5}
                     height={70}
                     fill="#B81C17"
                  />
                  <g id="Vector 3" filter="url(#filter1_f_113_109)">
                     <path
                        d="M176.963 81.1025H148.074C136.518 81.1025 131.827 94.0005 130.375 100.45C129.305 130.997 128.724 194.333 131.292 203.294C133.86 212.255 142.877 218.228 148.074 220.095C156.481 221.623 174.946 221.724 181.549 218.059C188.152 214.393 191.758 205.67 193.286 199.73C194.203 173.255 195.487 114.705 193.286 100.45C191.085 86.1938 181.855 81.6117 176.963 81.1025Z"
                        stroke="black"
                     />
                  </g>
                  <g id="break-remove">
                     <g id="Ellipse 11" filter="url(#filter2_f_113_109)">
                        <ellipse
                           cx="161.984"
                           cy="194.088"
                           rx="7.16492"
                           ry="8.26721"
                           fill="#594640"
                        />
                     </g>
                     <g id="Vector 4" filter="url(#filter3_f_113_109)">
                        <path
                           d="M147.103 208.417H179.621"
                           stroke="white"
                           strokeWidth={6}
                        />
                     </g>
                  </g>
                  <g id="Ellipse 12" filter="url(#filter4_f_113_109)">
                     <ellipse
                        cx="140.765"
                        cy="91.3768"
                        rx="15.0079"
                        ry="2.09803"
                        transform="rotate(-40.5659 140.765 91.3768)"
                        fill="black"
                     />
                  </g>
                  <g id="Ellipse 13" filter="url(#filter5_f_113_109)">
                     <ellipse
                        cx="182.027"
                        cy="93.5033"
                        rx="15.0079"
                        ry="2.09803"
                        transform="rotate(-133.039 182.027 93.5033)"
                        fill="black"
                     />
                  </g>
                  <g id="indicator-remove">
                     <g id="Ellipse 9" filter="url(#filter6_f_113_109)">
                        <ellipse
                           cx="161.984"
                           cy="131.256"
                           rx="7.16492"
                           ry="8.26721"
                           fill="#594640"
                        />
                     </g>
                     <g id="Vector 5" filter="url(#filter7_f_113_109)">
                        <path
                           d="M157.762 126.296L146.739 131.808"
                           stroke="#594640"
                           strokeWidth={3}
                        />
                     </g>
                     <g id="Vector 6" filter="url(#filter8_f_113_109)">
                        <path
                           d="M177.395 130.66L165.842 125.559"
                           stroke="#594640"
                           strokeWidth={3}
                        />
                     </g>
                  </g>
               </g>
               <g id="light-lights">
                  <g id="indicator-light">
                     <g id="light-bulb">
                        <g id="Ellipse 9_2" filter="url(#filter9_f_113_109)">
                           <ellipse
                              cx="162.245"
                              cy="131.267"
                              rx="7.16492"
                              ry="8.26721"
                              fill="#FFC671"
                           />
                        </g>
                        <g id="Vector 5_2" filter="url(#filter10_f_113_109)">
                           <path
                              d="M158.023 126.307L147 131.818"
                              stroke="#FFC671"
                              strokeWidth={3}
                           />
                        </g>
                        <g id="Vector 6_2" filter="url(#filter11_f_113_109)">
                           <path
                              d="M177.657 130.671L166.103 125.57"
                              stroke="#FFC671"
                              strokeWidth={3}
                           />
                        </g>
                     </g>
                     <g id="Ellipse 23" filter="url(#filter12_f_113_109)">
                        <path
                           d="M234 127C234 145.225 202.66 160 164 160C125.341 160 94.0005 145.225 94.0005 127C94.0005 108.775 125.341 94 164 94C202.66 94 234 108.775 234 127Z"
                           fill="#FAFF73"
                        />
                     </g>
                     <g id="Vector 40" filter="url(#filter13_f_113_109)">
                        <path
                           d="M193 114H135V151H193V114Z"
                           stroke="#FFCD82"
                           strokeWidth={15}
                        />
                     </g>
                  </g>
                  <g id="break-light">
                     <g id="Vector 4_2" filter="url(#filter14_f_113_109)">
                        <path d="M148 209H180.518" stroke="#390000" strokeWidth={6} />
                     </g>
                     <g id="Ellipse 11_2" filter="url(#filter15_f_113_109)">
                        <ellipse
                           cx="162.165"
                           cy="192.267"
                           rx="7.16492"
                           ry="8.26721"
                           fill="#FF0000"
                        />
                        <path
                           d="M168.83 192.267C168.83 196.626 165.781 200.034 162.165 200.034C158.549 200.034 155.5 196.626 155.5 192.267C155.5 187.908 158.549 184.5 162.165 184.5C165.781 184.5 168.83 187.908 168.83 192.267Z"
                           stroke="black"
                        />
                     </g>
                     <g id="Ellipse 22" filter="url(#filter16_f_113_109)">
                        <ellipse cx={164} cy={202} rx={70} ry={37} fill="#FF4A28" />
                     </g>
                     <g id="Vector 41" filter="url(#filter17_f_113_109)">
                        <path
                           d="M195 184H132L131 199.5L136.5 212L146 220L181 219.5L190 212L194 199.5L195 184Z"
                           stroke="#FF8282"
                           strokeOpacity="0.69"
                           strokeWidth={15}
                        />
                     </g>
                  </g>
               </g>
            </g>
            <defs>
               <filter
                  id="filter0_f_113_109"
                  x={130}
                  y="153.5"
                  width={65}
                  height={7}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="1.5"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter1_f_113_109"
                  x="126.966"
                  y="78.6025"
                  width="70.0356"
                  height="144.992"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={1}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter2_f_113_109"
                  x="150.819"
                  y="181.82"
                  width="22.3296"
                  height="24.5342"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter3_f_113_109"
                  x="139.103"
                  y="197.417"
                  width="48.5176"
                  height={22}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={4}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter4_f_113_109"
                  x="120.282"
                  y="72.4863"
                  width="40.9668"
                  height="37.7812"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="4.5"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter5_f_113_109"
                  x="162.669"
                  y="73.4399"
                  width="38.7168"
                  height="40.127"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="4.5"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter6_f_113_109"
                  x="149.819"
                  y="117.989"
                  width="24.3296"
                  height="26.5342"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="2.5"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter7_f_113_109"
                  x="142.068"
                  y="120.955"
                  width="20.3647"
                  height="16.1948"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter8_f_113_109"
                  x="161.236"
                  y="120.187"
                  width="20.7651"
                  height="15.8457"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter9_f_113_109"
                  x="150.08"
                  y={118}
                  width="24.3301"
                  height="26.5342"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="2.5"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter10_f_113_109"
                  x="142.33"
                  y="120.965"
                  width="20.3647"
                  height="16.1948"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter11_f_113_109"
                  x="161.498"
                  y="120.198"
                  width="20.7651"
                  height="15.8457"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter12_f_113_109"
                  x="0.40049"
                  y="0.400002"
                  width="327.2"
                  height="253.2"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="46.8"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter13_f_113_109"
                  x="112.8"
                  y="91.8"
                  width="102.4"
                  height="81.4"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="7.35"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter14_f_113_109"
                  x={140}
                  y={198}
                  width="48.5176"
                  height={22}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={4}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter15_f_113_109"
                  x={151}
                  y={180}
                  width="22.3301"
                  height="24.5342"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation={2}
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter16_f_113_109"
                  x="0.400002"
                  y="71.4"
                  width="327.2"
                  height="261.2"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="46.8"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <filter
                  id="filter17_f_113_109"
                  x="102.297"
                  y="155.4"
                  width="121.802"
                  height="93.2391"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
               >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                     mode="normal"
                     in="SourceGraphic"
                     in2="BackgroundImageFix"
                     result="shape"
                  />
                  <feGaussianBlur
                     stdDeviation="10.55"
                     result="effect1_foregroundBlur_113_109"
                  />
               </filter>
               <linearGradient
                  id="paint0_linear_113_109"
                  x1={133}
                  y1="214.5"
                  x2={156}
                  y2="214.5"
                  gradientUnits="userSpaceOnUse"
               >
                  <stop stopColor="#A7A7A7" />
                  <stop offset="0.0001" stopColor="#555555" />
                  <stop offset={1} stopColor="#D9D9D9" />
               </linearGradient>
            </defs>
         </svg>
      </div>
   )
}