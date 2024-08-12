"use client";
import "client-only";
import { useState } from "react";

// this page is edited in android, ignore code structure it will be fix later 

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [secret1, setSecret1] = useState<string>("");       
    const [secret2, setSecret2] = useState<string>("");       

    const handleClick = async () => {
        setLoading(true);
        // Request only sended when those input is empty: and click Login button
	//
	// need to check is any better way to send it 
	
	const formData = new FormData();
	formData.append("secret1", sexret1);
	formData.append("secret2", sexret2);

	
        if (!dummyUserName && !dummyPassword) {                                                 await fetch("/login/api/authenticate", {

            method: "POST",
		body: formData

	    });

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
        <p> sabeer bikba</p>
        <p>after verification complete loginpage</p>
	

        <br />


            <label>
        secret1:
        <input name="secret1" value={secret1} onChange={e => setSecret1(e.target.value)} type="password"/>
      </label>                                                                          
        <br />
                  <label>
        secret2:
        <input name="secret2" value={secret2} onChange={e => setSecret2(e.target.value)} type="password"/>
      </label>                                                                          
 
        <br />
            <button onClick={handleClick} disabled={loading}>
	    submit
            </button>                                                                           </div>                                                                              );
}
