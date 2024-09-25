const lqipSupportedFormats: string[] = ['png', 'avif', 'webp', 'svg', 'tiff', 'gif', 'jpg', 'jpeg'];
const lqipNotSupportedFormats: string[] = ['bmp', 'ico'];
const imgBBsupportedFormats: string[] = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif', 'pdf'];
const dontWantToAdd: string[] = ['pdf', 'bmp', 'tiff', 'ico', 'heic', 'tif'];
const supportedImages: Set<string> = new Set([...lqipNotSupportedFormats, ...imgBBsupportedFormats]);
const notSupportedImages: Set<string> = new Set([...lqipNotSupportedFormats, ...dontWantToAdd]);

const filteredSupportedFormat: Set<string> = new Set(
   Array.from(supportedImages).filter(image => !notSupportedImages.has(image))
);


export {
   lqipSupportedFormats,
   imgBBsupportedFormats,
   filteredSupportedFormat,
};


// // IMGBB SUPPORTED IMAGES // //
// source: https://www.avaide.com/photo-editing/imgbb-review/#:~:text=For%20uploading%20images%2C%20the%20interface,and%2Ddrop%20or%20paste%20options.&text=The%20free%20accounts%20offer%2032,%2C%20HEIC%2C%20AVIF%20and%20PDF.&text=Direct%20links%20for%20BBCode%20and%20HTML%20thumbnail%20codes%20make%20sharing%20easy.
// JPG, PNG, BMP, GIF, TIFF, WEBP, HEIC, AVIF and PDF.

/**

// // LQIP SUPPORTED IMAGES // //

Id Number: 1
Image: test.png
Base64 String: data:image/webp;base64,UklGRioAAABXRUJQVlA4IB4AAACQAQCdASoQAAkABUB8JaQAAudUwMAA/orkoYAAAAA=
--------------------------------
Id Number: 2
Image: dog.avif
Base64 String: data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAgCdASoMABAABUB8JbACdDiAAUoAhXQLgfAA/or50V9ATD8iQk7J8EiUh8sKu3MKvGg3UoieJlwEH9pokDf+y3sLbSXP/mHt9fgvC/v4Swc25F4DDzWBfc3rpgAA
--------------------------------
Id Number: 3
Image: G4vcSYV.webp
Base64 String: data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAwABUB8JZACdADR6KYjcQAA/Wb4iY8zVUXiNj72gwpJIjxzu3UUf44m562k2nExiV8IxOA2FgAA
--------------------------------
Error generating LQIP for ./download.bmp: Error: Input file contains unsupported image format
    at Sharp.metadata (/home/sabeerbikba02/test/node_modules/.pnpm/sharp@0.33.5/node_modules/sharp/lib/input.js:487:17)
    at computeLqipImage (/home/sabeerbikba02/test/node_modules/.pnpm/lqip-modern@2.1.0/node_modules/lqip-modern/index.js:33:32)
    at lqipModern (/home/sabeerbikba02/test/node_modules/.pnpm/lqip-modern@2.1.0/node_modules/lqip-modern/index.js:25:12)
    at generateLQIP (/home/sabeerbikba02/test/generateLqip.js:49:37)
--------------------------------
Id Number: 5
Image: file_example_SVG_30kB.svg
Base64 String: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAADQAAQUxQSFsAAAARL6CojRQ4t25OeGKDiAjoeQu3tW0r0cYK0JyxHM31VQD9V8P0ENH/QUBZgn0+v9hqhpwJJlrYKP4sKd1hi4z+zK+olcP5u2P6TPsZd9RlOZxxPfu3PuWGlK4CAFZQOCAYAAAAMAEAnQEqEAAOAAVAfCWkAANwAP7w5sAA
--------------------------------
Error generating LQIP for ./file_example_favicon.ico: Error: Input file contains unsupported image format
    at Sharp.metadata (/home/sabeerbikba02/test/node_modules/.pnpm/sharp@0.33.5/node_modules/sharp/lib/input.js:487:17)
    at computeLqipImage (/home/sabeerbikba02/test/node_modules/.pnpm/lqip-modern@2.1.0/node_modules/lqip-modern/index.js:33:32)
    at lqipModern (/home/sabeerbikba02/test/node_modules/.pnpm/lqip-modern@2.1.0/node_modules/lqip-modern/index.js:25:12)
    at generateLQIP (/home/sabeerbikba02/test/generateLqip.js:49:37)
--------------------------------
Id Number: 7
Image: file_example_TIFF_1MB.tiff
Base64 String: data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAsABUB8JbACdADMy8KKFwAA/gl5t4UJIgGbD57OQ/s2Y+V/p6Ph3sf1QuR1czogzO8a2bqhF63AwaqM4F9HTnNDNaO+DZ5rw3wZsMYzONAA
--------------------------------
Id Number: 8
Image: file_example_GIF_500kB.gif
Base64 String: data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADwAQCdASoQAAsABUB8JbACdADMy8H9KwAA/gl5t4UJIgGbD57OQ/s2Y+V/p6Ph3sf1QuR1UR2INDjDvHvzKMN8CWIRSxtYfa/Bs818N0ceQm//OQAAAA==
--------------------------------
Id Number: 9
Image: lj1YChB.jpg
Base64 String: data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACwAQCdASoMABAABUB8JYgC7ACBbO+gAP6C09oes/Ci+gGOEjb21IhlHzONc34q4g9Itt+lnzN0iRcGM+Nc2pHmRt9M3CB/bWgOgAAA
--------------------------------
Id Number: 10
Image: lj1YChB(10).jpeg
Base64 String: data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACwAQCdASoMABAABUB8JYgC7ACBbO+gAP6C09oes/Ci+gGOEjb21IhlHzONc34q4g9Itt+lnzN0iRcGM+Nc2pHmRt9M3CB/bWgOgAAA
--------------------------------
Error generating LQIP for ./sample1.heic: Error: /home/sabeerbikba02/test/sample1.heic: bad seek to 293616
heif: Error while loading plugin: No decoding plugin installed for this compression format (11.6003)
    at Sharp.toBuffer (/home/sabeerbikba02/test/node_modules/.pnpm/sharp@0.33.5/node_modules/sharp/lib/output.js:163:17)
    at computeLqipImage (/home/sabeerbikba02/test/node_modules/.pnpm/lqip-modern@2.1.0/node_modules/lqip-modern/index.js:62:39)
    at async generateLQIP (/home/sabeerbikba02/test/generateLqip.js:57:31)
--------------------------------
*/