import { CSSProperties } from 'react';

const Error404 = () => {
   const styles: Record<string, CSSProperties> = {
      container: {
         color: 'black',
         fontFamily:
            'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
         height: '100vh',
         textAlign: 'center',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 800 450' opacity='1'%3E%3Cdefs%3E%3Cfilter id='bbblurry-filter' x='-100%' y='-100%' width='400%' height='400%' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='130' x='0%' y='0%' width='100%' height='100%' in='SourceGraphic' edgeMode='none' result='blur'%3E%3C/feGaussianBlur%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23bbblurry-filter)'%3E%3Cellipse rx='277.5' ry='277.5' cx='171.77140253240412' cy='-187.73203346946025' fill='hsla(37, 67%, 56%, 1.00)'%3E%3C/ellipse%3E%3Cellipse rx='277.5' ry='277.5' cx='200.03208923339844' cy='599.3707164417614' fill='hsl(170, 33.3%, 29.4%)'%3E%3C/ellipse%3E%3Cellipse rx='277.5' ry='277.5' cx='650.6560391512783' cy='592.2153542258523' fill='hsl(170, 33.3%, 29.4%)'%3E%3C/ellipse%3E%3Cellipse rx='277.5' ry='277.5' cx='624.0772982510653' cy='-150.3115692138672' fill='hsla(37, 67%, 56%, 1.00)'%3E%3C/ellipse%3E%3Cellipse rx='277.5' ry='277.5' cx='396.12514426491475' cy='565.9098621715199' fill='hsl(170, 33.3%, 29.4%)'%3E%3C/ellipse%3E%3Cellipse rx='277.5' ry='277.5' cx='405.84666859019876' cy='-117.8841552734375' fill='hsla(37, 67%, 56%, 1.00)'%3E%3C/ellipse%3E%3C/g%3E%3C/svg%3E")`,
         backgroundSize: 'cover',
         backgroundAttachment: 'fixed',
         paddingTop: '50px',
      },
      h1: {
         display: 'inline-block',
         margin: '0 20px 0 0',
         padding: '0 23px 0 0',
         fontWeight: 500,
         verticalAlign: 'top',
         lineHeight: '49px',
         borderRight: '1px solid rgba(0, 0, 0, 0.3)',
      },
      h2: {
         fontWeight: 400,
         lineHeight: '49px',
         margin: 0,
      },
   };

   return (
      <div style={styles.container}>
         <div>
            <h1 style={styles.h1}>404</h1>
            <div style={{ display: 'inline-block' }}>
               <h2 style={styles.h2}>Page not found.</h2>
            </div>
         </div>
      </div>
   );
};

export default Error404;

