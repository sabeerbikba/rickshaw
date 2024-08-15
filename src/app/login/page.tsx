"use client";
import "client-only";
import { useState } from "react";

export default function FakeLoginPage() {
   const [loading, setLoading] = useState<boolean>(false);
   const [dummyUserName, setDummyUserName] = useState<string>("");
   const [dummyPassword, setDummyPassword] = useState<string>("");

   const handleClick = async () => {
      setLoading(true);
      // Request only sended when those input is empty: and click Login button
      if (!dummyUserName && !dummyPassword) {
         const fetchResponse = await fetch("/login/api", {
            method: "POST"
         });

         console.log(fetchResponse);
         setLoading(false);
      }
   }


   // styles not given yet that's why use p elements 
   return (
      <div>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <br />


         <label>
            UserName:
            <input name="userName" value={dummyUserName} onChange={e => setDummyUserName(e.target.value)} />
         </label>
         <br />
         <label>
            Password:
            <input name="password" value={dummyPassword} onChange={e => setDummyPassword(e.target.value)} type="password" />
         </label>

         <br />
         <button onClick={handleClick} disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
         </button>
      </div>
   );
}
