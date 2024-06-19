import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { // need to check commented is working or not 
   // charset: 'UTF-8',
   viewport: 'width=device-width, initial-scale=1.0',
   title: "About Khaleel's Rickshaw Service - Your Local Guide in Honnavar",
   description: "Welcome to Honnavar! Explore the azure beaches, majestic hills, and meandering rivers with Khaleel, your trusted local guide and rickshaw driver. Join us for an extraordinary journey through the heart of this coastal paradise. Book your tour today!",
   keywords: ["Honnavar", "rickshaw tours", "local guide", "Khaleel", "Honnavar adventure", "beach tours", "hill tours", "river tours"],
   icons: {
      icon: [
         {
            url: "data:image/svg+xml,%3Csvg width='88' height='106' viewBox='0 0 88 106' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_127_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.7036 57.7742C63.7873 54.0032 65.6333 49.2082 65.6333 43.9885C65.6333 31.8446 55.6418 22 43.3166 22C30.9915 22 21 31.8446 21 43.9885C21 49.4976 23.0563 54.5335 26.4538 58.3918L43.7 84L60.7105 57.7723L60.7036 57.7742Z' fill='white'/%3E%3Cellipse cx='43.3166' cy='43.0039' rx='9.18921' ry='8.53283' fill='%23C37E17'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_127_2' x='0.9' y='0.9' width='86.8333' height='104.2' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='1'/%3E%3CfeGaussianBlur stdDeviation='10.55'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.73 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_127_2'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_127_2' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E",
            type: "image/svg+xml"
         }
      ]
   },
   alternates: {
      canonical: "https://khaleel-rickshaw.vercel.app/about/"
   },
   openGraph: {
      type: 'website',
      url: "https://khaleel-rickshaw.vercel.app/about/",
      title: "About Khaleel's Rickshaw Service - Your Local Guide in Honnavar",
      description: "Explore Honnavar's beauty with Khaleel, your local guide and rickshaw driver. Join us for an extraordinary journey through azure beaches, majestic hills, and meandering rivers. Book your tour today!",
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg",
            alt: "Rickshaw Card"
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      // url: "https://khaleel-rickshaw.vercel.app/about/",
      title: "About Khaleel's Rickshaw Service - Your Local Guide in Honnavar",
      description: "Explore Honnavar's beauty with Khaleel, your local guide and rickshaw driver. Join us for an extraordinary journey through azure beaches, majestic hills, and meandering rivers. Book your tour today!",
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg"
         }
      ]
   }
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   // const pathname = usePathname();
   // const router = useRouter();
   // const path = router.asPath;
   // const parsedUrl = url.parse(req.url, true);
   // const path = window.location.pathname;
   // function getPathname(urlString) {
   //    const url = new URL(urlString);
   //    return url.pathname;
   // }

   return (
      <html lang="en">
         <body>
            <header className="header">
               <div className="nav-nav-nav">
                  <div className="nav flex">
                     <div className="nav-logo-div">
                        {/* <a className="text-dec-none" href="/"> */}
                        <Link className="text-dec-none" href="/">
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
                           {/* </a> */}
                        </Link>
                     </div>
                     <div className="nav-nav-div">
                        <nav className="nav-links">
                           <ul className="nav-ul">
                              <li className="nav-li">
                                 <button className="nav-a upload-btn" id="upload-button">
                                    upload
                                 </button>
                                 {/* <Link className="text-dec-none nav-a indicator gallery" href="/gallery/upload">
                        Upload
                      </Link> */}
                                 {/* <a className="text-dec-none nav-a indicator" href="./about-me/"> */}
                                 <Link className="text-dec-none nav-a indicator" href="./about-me/">
                                    About me
                                 </Link>
                                 {/* </a> */}
                              </li>
                              <li className="inline">
                                 {/* <a
                        className="text-dec-none nav-a indicator gallery"
                        href="./gallery/"
                        > */}
                                 <Link className="text-dec-none nav-a indicator gallery" href="/gallery/">
                                    Gallery
                                 </Link>
                                 {/* </a> */}
                              </li>
                           </ul>
                        </nav>
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
                     </div>
                  </div>
               </div>
            </header>
            {children}
         </body>
      </html>
   );
}
