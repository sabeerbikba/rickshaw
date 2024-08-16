"use client";
import "client-only";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
   const router = useRouter();
   const [token, setToken] = useState('');
   const [loading, setLoading] = useState<boolean>(false);
   const [secret1, setSecret1] = useState<string>("");
   const [secret2, setSecret2] = useState<string>("");
   const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);

   useEffect(() => {
      const path = window.location.pathname;
      const pathParts = path.split('/');
      const tokenFromUrl = pathParts[2]; // Assuming the token is always the 3rd part of the path
      setToken(tokenFromUrl);
      console.log(tokenFromUrl);
   }, []);

   // const handleClick = async () => {
   //    {/* if both inputs is empty button need to disable same logic apply for handleClick */ }
   //    setLoading(true);
   //    setisPasswordVisible(false);

   //    const formData = new FormData();
   //    formData.append("secret1", secret1);
   //    formData.append("secret2", secret2);
   //    formData.append('date', new Date().toISOString());

   //    if (secret1 && secret2) {
   //       const fetchResponse = await fetch(`/login/${token}/api`, {
   //          method: "POST",
   //          body: formData
   //       });

   //       const fetchResponseJson = await fetchResponse.json();
   //       console.log(fetchResponseJson.message)
   //       if (fetchResponseJson.message === 'Login successfull') {
   //          // router.push('/dashboard');
   //       } else {
   //          // show error message on screen with good looking ui 
   //          alert(fetchResponseJson.message);
   //       }
   //    }
   //    setLoading(false);
   // }


   const handleClick = async () => {

      // check this function can hanlde empty response and error so on 
      setLoading(true);
      setisPasswordVisible(false);

      const formData = new FormData();
      formData.append("secret1", secret1);
      formData.append("secret2", secret2);
      formData.append('date', new Date().toISOString());

      if (secret1 && secret2) {
         try {
            const fetchResponse = await fetch(`/login/${token}/api`, {
               method: "POST",
               body: formData
            });

            // Check if response is ok
            if (!fetchResponse.ok) {
               throw new Error('Network response was not ok');
            }

            // Try to parse JSON response
            let fetchResponseJson;
            try {
               fetchResponseJson = await fetchResponse.json();
            } catch (jsonError) {
               console.error('Failed to parse JSON:', jsonError);
               alert('Invalid response format');
               return;
            }

            console.log(fetchResponseJson.message);
            if (fetchResponseJson.message === 'Login successfull') {
               router.push('/dashboard');
            } else {
               // show error message on screen with good looking ui
               alert(fetchResponseJson.message);
            }
         } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred');
         }
      }
      setLoading(false);
   }


   return (
      <div>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p> sabeer bikba</p>
         <p>after verification complete loginpage</p>


         <label>
            UserName:
            <input name="secret1" value={secret1} onChange={e => setSecret1(e.target.value)} type={isPasswordVisible ? "text" : "password"} />
         </label>
         <br />
         <label>
            Password:
            <input name="secret2" value={secret2} onChange={e => setSecret2(e.target.value)} type={isPasswordVisible ? "text" : "password"} />
         </label>

         <br />
         <button onClick={() => setisPasswordVisible(!isPasswordVisible)}>
            eye
         </button>
         <br />
         {/* if both inputs is empty button need to disable same logic apply for handleClick */}
         <button onClick={handleClick} disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
         </button>
         <br />
         <button onClick={() => setLoading(false)}>tmp enalbe button</button>
      </div>
   );
}
