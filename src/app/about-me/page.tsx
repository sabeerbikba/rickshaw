import "server-only";
import type { Metadata } from "next";
import "./styles.css";
import PlaceholderImage from "@/components/placeholderImage";
import image from '@/tmpImages/HlVHlz8.jpeg';

export const metadata: Metadata = {
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
      canonical: "https://khaleel-rickshaw.vercel.app/about-me"
   },
   openGraph: {
      type: 'website',
      url: "https://khaleel-rickshaw.vercel.app/about-me",
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
      // url: "https://khaleel-rickshaw.vercel.app/about-me", // doesn't supported for now
      title: "About Khaleel's Rickshaw Service - Your Local Guide in Honnavar",
      description: "Explore Honnavar's beauty with Khaleel, your local guide and rickshaw driver. Join us for an extraordinary journey through azure beaches, majestic hills, and meandering rivers. Book your tour today!",
      images: [
         {
            url: "https://i.imgur.com/7XipwZo.jpg"
         }
      ]
   }
}

const paragraphs = [
   "Welcome to Honnavar, a hidden gem nestled between the azure beaches, majestic hills, and meandering rivers. As you step into this enchanting city, let me, Khaleel, your local guide and rickshaw driver, be your trusted companion in exploring its wonders.",
   "Picture this: the sun gently kisses the waves at Honnavar Beach, casting a golden glow over the pristine sands. With a warm smile, I invite you to hop into my rickshaw, where every journey unfolds a new chapter of adventure and discovery.",
   "With a heart fluent in the rhythms of Honnavar, I navigate through its winding roads, leading you to the tranquil embrace of its hills, where whispers of ancient mysteries dance through the air. Feel the cool breeze caress your skin as we ascend to panoramic vistas, offering a breathtaking panorama of this coastal paradise.",
   "But our adventure doesn't end there. Honnavar's rivers, like veins of life, carve through the landscape, offering moments of serenity and reflection. Glide alongside their banks, where nature's symphony orchestrates a melody of tranquility.",
   "As your guide, I speak the language of the land, fluently conversing in Hindi, Kannada, Konkani, Marathi, and the vibrant dialects of Honnavar. Let my words paint vivid pictures of our surroundings, weaving tales of folklore, history, and the rich cultural tapestry that defines our city.",
   "My rickshaw isn't just a mode of transport; it's a portal to the soul of Honnavar. Whether you seek the thrill of adventure or the serenity of nature's embrace, each ride promises an unforgettable experience.",
   "So, why settle for the ordinary when you can embark on an extraordinary journey with Khaleel's Rickshaw Service? Let's traverse the landscapes of Honnavar together, creating memories that will linger in your heart long after the journey ends.",
];

export default function AboutMePage(): JSX.Element {
   return (
      <>
         <main className="main-about-me">
            <div className="img-div flex-center">
               <PlaceholderImage
                  image={image}
                  alt="rickshaw-and-ecobeach"
                  mainSrc="https://i.imgur.com/HlVHlz8.jpeg"
                  classNames="img"
                  noBackgroudImg
               />
            </div>
            <div className="p-div flex-center">
               <div>
                  {paragraphs.map((para, key): JSX.Element => (
                     <p className="p-about-me" key={key}>{para}</p>
                  ))}
                  <p>
                     <a href="/?tourClicked=true">Book your tour today</a> and let&apos;s write
                     the next chapter of your Honnavar adventure, one rickshaw ride at a
                     time.
                  </p>
               </div>
            </div>
         </main>
      </>
   )
}