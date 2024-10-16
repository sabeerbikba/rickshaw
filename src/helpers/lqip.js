const lqip = require('lqip-modern');
const fs = require('fs');
const path = require('path');

const images = [{
   id: 1,
   fallbackSrc2: "/images/lj1YChB.jpg",
},
   // {..},{...}
];


// * 

/**
 * 
 * Usage command : `node generateLqip.js`
 * 
 * This file can be used for:
 * - Generate string
 * - Check supported file 
 * - ...
 */


(async function generateLQIP(imageArray) {
   for (const image of imageArray) {
      try {
         const filePath = path.resolve('../../public' + image.fallbackSrc2);
         const { metadata } = await lqip(filePath);

         console.log(`Id Number: ${image.id}`);
         console.log(`Image: ${path.basename(filePath)}`);
         console.log(`Base64 String: ${metadata.dataURIBase64}`);
         console.log('--------------------------------');
      } catch (error) {
         console.error(`Error generating LQIP for ${image.fallbackSrc2}:`, error);
         console.log('--------------------------------');
      }
   }
})(images);
