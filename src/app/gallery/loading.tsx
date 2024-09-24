'use client';
import { CSSProperties } from "react";

const Loading = () => {
   const styles: Record<string, CSSProperties> = {
      spinnerStyle: {
         border: '4px solid rgba(0, 0, 0, 0.1)',
         width: '40px',
         height: '40px',
         borderRadius: '50%',
         borderLeftColor: 'grey',
         animation: 'spin 1s ease infinite',
         marginBottom: '20px',
      },
      messageStyle: { fontSize: '18px', color: '#ffffff', },
      containerStyle: {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'transparent',
         fontFamily: "'Arial', sans-serif",
      }
   };

   return (
      <>
         <style>
            {`
               @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
               }
            `}
         </style>
         <div style={styles.containerStyle}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div style={styles.spinnerStyle}></div>
         </div>
      </>
   );
};

export default Loading;
