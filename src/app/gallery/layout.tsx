import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
   title: "Honnavar Gallery - Khaleel's Rickshaw Service",
   description: "Explore Honnavar through captivating images of its azure beaches, majestic hills, and meandering rivers. Discover the beauty of Honnavar with Khaleel's Rickshaw Service. Book your tour today!",
   keywords: ["Honnavar", "rickshaw tours", "gallery", "Honnavar images", "beach images", "hill images", "river images"],
   icons: {
      icon: [
         {
            url: "data:image/svg+xml,%3Csvg width='88' height='106' viewBox='0 0 88 106' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_127_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.7036 57.7742C63.7873 54.0032 65.6333 49.2082 65.6333 43.9885C65.6333 31.8446 55.6418 22 43.3166 22C30.9915 22 21 31.8446 21 43.9885C21 49.4976 23.0563 54.5335 26.4538 58.3918L43.7 84L60.7105 57.7723L60.7036 57.7742Z' fill='white'/%3E%3Cellipse cx='43.3166' cy='43.0039' rx='9.18921' ry='8.53283' fill='%23C37E17'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_127_2' x='0.9' y='0.9' width='86.8333' height='104.2' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='1'/%3E%3CfeGaussianBlur stdDeviation='10.55'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.73 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_127_2'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_127_2' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E",
            type: "image/svg+xml"
         }
      ]
   },
   alternates: {
      canonical: "https://khaleel-rickshaw.vercel.app/gallery"
   },
   openGraph: {
      type: 'website',
      url: "https://khaleel-rickshaw.vercel.app/gallery",
      title: "Honnavar Gallery - Khaleel's Rickshaw Service",
      description: "Explore Honnavar through captivating images of its azure beaches, majestic hills, and meandering rivers. Discover the beauty of Honnavar with Khaleel's Rickshaw Service. Book your tour today!",
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg",
            alt: "Rickshaw Card"
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      // url: "https://khaleel-rickshaw.vercel.app/gallery", // doesn't supported for now
      title: "Honnavar Gallery - Khaleel's Rickshaw Service",
      description: "Explore Honnavar through captivating images of its azure beaches, majestic hills, and meandering rivers. Discover the beauty of Honnavar with Khaleel's Rickshaw Service. Book your tour today!",
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg"
         }
      ]
   }
};

export default function Layout({
   children,
   modal,
}: Readonly<{
   children: React.ReactNode;
   modal: React.ReactNode;

}>): JSX.Element {
   return (
      <>
         {children}
         {modal}
      </>
   );
}