import type { Metadata } from "next";
import { BASE_URL } from "@/data/envimports";
import GetInTouchBtn from "@/components/get-in-touch";
import "./styles.css";

const metadataObject = {
   title: "Contact Khaleel | Rickshaw Tours Honnavar",
   description: "Get in touch with Khaleel for Rickshaw Tours in Honnavar. Contact us at 89705 17155 for unique and guided tours. Book your adventure today!",
   url: `${BASE_URL}/contact`,
}

export const metadata: Metadata = {
   title: metadataObject.title,
   description: metadataObject.description,
   keywords: ["Rickshaw Tours", "Honnavar Tours", "Contact Khaleel", "Honnavar Travel", "Guided Tours Honnavar", "Rickshaw Tours India", "Travel Honnavar"],
   alternates: {
      canonical: metadataObject.url,
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

const Contact = () => (
   <>
      <div className="img-div center">
         <img src="https://i.imgur.com/7XipwZo.jpg" className="max-width" />
      </div>
      <div className="text-container">
         <h1>contact: </h1>
         <h2>Name: Khaleel</h2>
         <a href="https://www.google.com/maps/place/Honnavar,+Karnataka" target="_blank">
            <h2>Location: Honnavar</h2>
         </a>
         <div className="center">
            <GetInTouchBtn
               page="contact"
               text="Call : 89705 17155"
               className="cot-btn max-width"
            />
         </div>
      </div>
   </>
);

export default Contact;