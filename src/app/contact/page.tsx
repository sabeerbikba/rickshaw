"use server";
import GetInTouchBtn from "@/components/get-in-touch";
import "./styles.css";


const Contact = async () => (
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