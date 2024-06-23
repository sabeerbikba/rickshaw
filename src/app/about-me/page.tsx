import "server-only";
import "./styles.css";

const paragraphs = [
   "Welcome to Honnavar, a hidden gem nestled between the azure beaches, majestic hills, and meandering rivers. As you step into this enchanting city, let me, Khaleel, your local guide and rickshaw driver, be your trusted companion in exploring its wonders.",
   "Picture this: the sun gently kisses the waves at Honnavar Beach, casting a golden glow over the pristine sands. With a warm smile, I invite you to hop into my rickshaw, where every journey unfolds a new chapter of adventure and discovery.",
   "With a heart fluent in the rhythms of Honnavar, I navigate through its winding roads, leading you to the tranquil embrace of its hills, where whispers of ancient mysteries dance through the air. Feel the cool breeze caress your skin as we ascend to panoramic vistas, offering a breathtaking panorama of this coastal paradise.",
   "But our adventure doesn't end there. Honnavar's rivers, like veins of life, carve through the landscape, offering moments of serenity and reflection. Glide alongside their banks, where nature's symphony orchestrates a melody of tranquility.",
   "As your guide, I speak the language of the land, fluently conversing in Hindi, Kannada, Konkani, Marathi, and the vibrant dialects of Honnavar. Let my words paint vivid pictures of our surroundings, weaving tales of folklore, history, and the rich cultural tapestry that defines our city.",
   "My rickshaw isn't just a mode of transport; it's a portal to the soul of Honnavar. Whether you seek the thrill of adventure or the serenity of nature's embrace, each ride promises an unforgettable experience.",
   "So, why settle for the ordinary when you can embark on an extraordinary journey with Khaleel's Rickshaw Service? Let's traverse the landscapes of Honnavar together, creating memories that will linger in your heart long after the journey ends.",
];

export default function AboutMePage() {
   return (
      <main className="main-about-me">
         <div className="img-div flex-center">
            <img
               className="img"
               // src="https://i.imgur.com/HlVHlz8.jpeg"
               src="./tmp/HlVHlz8.jpeg" // TODO: need to remove this image
               alt="rickshaw-and-ecobeach"
            />
         </div>
         <div className="p-div flex-center">
            <div>
               {paragraphs.map((para, key) => (
                  <p className="p-about-me" key={key}>{para}</p>
               ))}
               <p>
                  <a href="/?tourClicked=true">Book your tour today</a> and let's write
                  the next chapter of your Honnavar adventure, one rickshaw ride at a
                  time.
               </p>
            </div>
         </div>
      </main>
   )
}