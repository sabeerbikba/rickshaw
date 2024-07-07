export type ImageType = {
   id?: number;
   imageName?: string;
   alt: string;
   srcUrl: string;
   allImagesLoaded?: boolean; // Ensure this property exists in the type definition
}


const images: ImageType[] = [
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   { srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },






   {  srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
   {  srcUrl: "https://i.imgur.com/AELVLIx.jpeg", alt: "mangrove-boardwalk-front" },
   {  srcUrl: "https://i.imgur.com/RcHMB4v.jpg", alt: "eco-beach" },
   {  srcUrl: "https://i.imgur.com/wLlFcOz.jpeg", alt: "rickshaw-and-ecobeach-3" },
   {  srcUrl: "https://i.imgur.com/G4vcSYV.jpeg", alt: "rickshaw-and-ecobeach-2" },
   {  srcUrl: "https://i.imgur.com/Sk0pt8f.jpg", alt: "apsarkonda-falls" },
   {  srcUrl: "https://i.imgur.com/oYli6S9.jpeg", alt: "Mangrove -walk-bridge" },
   {  srcUrl: "https://i.imgur.com/CM3A2GU.jpg", alt: "khaleel-rickshaw-1" },
   {  srcUrl: "https://i.imgur.com/PYJj2kc.jpg", alt: "apsarkonda-hill-beach" },
   {  srcUrl: "https://i.imgur.com/2dGwyFP.jpg", alt: "apsarkonda-in-rainy-season" },
   {  srcUrl: "https://i.imgur.com/2BYPVup.jpeg", alt: "Mangrove Honnavar" },
   {  srcUrl: "https://i.imgur.com/CRjpr6X.jpg", alt: "apsarkonda" },
   {  srcUrl: "https://i.imgur.com/wMBpwZ6.jpeg", alt: "rickshaw-and-ecobeach-1" },
   {  srcUrl: "https://i.imgur.com/IQUV13B.jpeg", alt: "Boating-in-honnavar" },
   {  srcUrl: "https://i.imgur.com/BEXx6V3.jpg", alt: "eco-beach-2" },
   {  srcUrl: "https://i.imgur.com/PktW3cf.png", alt: "apsarkoda-falls-3" },
   {  srcUrl: "https://i.imgur.com/NkuPoyi.jpeg", alt: "ricksahw-seats" },
   {  srcUrl: "https://i.imgur.com/MHQApPe.jpeg", alt: "mangrove-boardwalk-front-2" },
   {  srcUrl: "https://i.imgur.com/NtTKFde.jpg", alt: "khaleel-rickshaw" }
];

// const images: ImageType[] = [
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },

//    { imageName: "lj1YChB.jpg", srcUrl: "https://i.imgur.com/lj1YChB.jpg", alt: "apsarkonda-falls-2" },
//    { imageName: "AELVLIx.jpeg", srcUrl: "https://i.imgur.com/AELVLIx.jpeg", alt: "mangrove-boardwalk-front" },
//    { imageName: "RcHMB4v.jpg", srcUrl: "https://i.imgur.com/RcHMB4v.jpg", alt: "eco-beach" },
//    { imageName: "wLlFcOz.jpeg", srcUrl: "https://i.imgur.com/wLlFcOz.jpeg", alt: "rickshaw-and-ecobeach-3" },
//    { imageName: "G4vcSYV.jpeg", srcUrl: "https://i.imgur.com/G4vcSYV.jpeg", alt: "rickshaw-and-ecobeach-2" },
//    { imageName: "Sk0pt8f.jpg", srcUrl: "https://i.imgur.com/Sk0pt8f.jpg", alt: "apsarkonda-falls" },
//    { imageName: "oYli6S9.jpeg", srcUrl: "https://i.imgur.com/oYli6S9.jpeg", alt: "Mangrove -walk-bridge" },
//    { imageName: "CM3A2GU.jpg", srcUrl: "https://i.imgur.com/CM3A2GU.jpg", alt: "khaleel-rickshaw-1" },
//    { imageName: "PYJj2kc.jpg", srcUrl: "https://i.imgur.com/PYJj2kc.jpg", alt: "apsarkonda-hill-beach" },
//    { imageName: "2dGwyFP.jpg", srcUrl: "https://i.imgur.com/2dGwyFP.jpg", alt: "apsarkonda-in-rainy-season" },
//    { imageName: "2BYPVup.jpeg", srcUrl: "https://i.imgur.com/2BYPVup.jpeg", alt: "Mangrove Honnavar" },
//    { imageName: "CRjpr6X.jpg", srcUrl: "https://i.imgur.com/CRjpr6X.jpg", alt: "apsarkonda" },
//    { imageName: "wMBpwZ6.jpeg", srcUrl: "https://i.imgur.com/wMBpwZ6.jpeg", alt: "rickshaw-and-ecobeach-1" },
//    { imageName: "IQUV13B.jpeg", srcUrl: "https://i.imgur.com/IQUV13B.jpeg", alt: "Boating-in-honnavar" },
//    { imageName: "BEXx6V3.jpg", srcUrl: "https://i.imgur.com/BEXx6V3.jpg", alt: "eco-beach-2" },
//    { imageName: "PktW3cf.png", srcUrl: "https://i.imgur.com/PktW3cf.png", alt: "apsarkoda-falls-3" },
//    { imageName: "NkuPoyi.jpeg", srcUrl: "https://i.imgur.com/NkuPoyi.jpeg", alt: "ricksahw-seats" },
//    { imageName: "MHQApPe.jpeg", srcUrl: "https://i.imgur.com/MHQApPe.jpeg", alt: "mangrove-boardwalk-front-2" },
//    { imageName: "NtTKFde.jpg", srcUrl: "https://i.imgur.com/NtTKFde.jpg", alt: "khaleel-rickshaw" }
// ];
export default images;