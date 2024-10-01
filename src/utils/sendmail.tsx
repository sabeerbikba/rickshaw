"use server";
import nodemailer from 'nodemailer';
import {
   ENV_EMAIL1,
   ENV_EMAIL2,
   ENV_EMAIL_PASSWORD
} from '@/data/envimports';
// import logError from './logerror';
import { CodeBlock, dracula, render } from '@react-email/components';


const Email = ({ json }: { json: object }) => {
   const code: string = JSON.stringify(json, null, 3);

   return (
      <div style={{ width: '95%' }}>
         <CodeBlock
            code={code}
            lineNumbers
            theme={dracula}
            language="json"
         />
      </div>
   );
};

// // THIS METHOD ALSO WORKS // //
// // THIS METHOD ALSO WORKS // //

// import { Prism as JsonSyntaxHighlighter } from 'react-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const Component = ({ json }: { json: object }) => {

//    const code: string = JSON.stringify(json, null, 3);

//    return (
//       <JsonSyntaxHighlighter
//          style={a11yDark}
//          language='json'
//       >
//          {/* <pre>{code}</pre> */}
//          {code}
//       </JsonSyntaxHighlighter>
//    )
// };

// // THIS METHOD ALSO WORKS // //
// // THIS METHOD ALSO WORKS // //


const recipient: string[] = [ENV_EMAIL1, ENV_EMAIL2];

const sendEmail = async (json: object) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail', // Adjust service as needed
      auth: {
         user: ENV_EMAIL1,
         pass: ENV_EMAIL_PASSWORD,
      },
   });


   const htmlContent = await render(<Email json={json} />)
   // const htmlContent = await render(<Component json={json} />)
   // // THIS METHOD ALSO WORKS // //


   try {
      await transporter.sendMail({
         from: process.env.EMAIL_USER,
         to: recipient,
         subject: 'Error Detected - Immediate Action Required',
         html: htmlContent,
      });
   } catch {
      // logError()
      // Not logging error because it can cause loop 
      // it can cause infinte loop need to use diffrent approch 

      console.log('Failed to send mail!!');
   }
};

export default sendEmail;
