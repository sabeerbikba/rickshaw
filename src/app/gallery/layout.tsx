import { BASE_URL } from "@/data/envimports";
import type { Metadata } from "next";
import "./styles.css";

const metadataObject = {
   title: "Honnavar Gallery - Khaleel's Rickshaw Service",
   description: "Explore Honnavar through captivating images of its azure beaches, majestic hills, and meandering rivers. Discover the beauty of Honnavar with Khaleel's Rickshaw Service. Book your tour today!",
   url: `${BASE_URL}/gallery`,
};

export const metadata: Metadata = {
   title: metadataObject.title,
   description: metadataObject.description,
   keywords: ["Honnavar", "rickshaw tours", "gallery", "Honnavar images", "beach images", "hill images", "river images"],
   alternates: {
      canonical: metadataObject.url
   },
   openGraph: {
      type: 'website',
      url: metadataObject.url,
      title: metadataObject.title,
      description: metadataObject.description,
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg",
            alt: "Rickshaw Card"
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      // url: metadataObject.url, // doesn't supported for now
      title: metadataObject.title,
      description: metadataObject.description,
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