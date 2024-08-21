export type ImageType = {
   id?: number;
   imageName?: string;
   alt: string;
   src: string;
   fallbackSrc1?: string;
   fallbackSrc2?: string;
   allImagesLoaded?: boolean; // TODO: is this property really needed
};

// TODO: check fallBack image working or not as expected by providing broken link in src
// TODO: need to need to check images object object every image is image matched 
// const images: ImageType[] = [{
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// }, {
//    src: "https://i.imgur.com/AELVLIx.jpeg",
//    fallbackSrc1: "https://i.ibb.co/MPnWtR2/AELVLIx.jpg",
//    fallbackSrc2: "/images/AELVLIx.jpg",
//    alt: "mangrove-boardwalk-front"
// }, {
//    src: "https://i.imgur.com/RcHMB4v.jpg",
//    fallbackSrc1: "https://i.ibb.co/GT8Lrsh/RcHMB4v.jpg",
//    fallbackSrc2: "/images/RcHMB4v.jpg",
//    alt: "eco-beach"
// }, {
//    src: "https://i.imgur.com/wLlFcOz.jpeg",
//    fallbackSrc1: "https://i.ibb.co/mX6FvsJ/wLlFcOz.jpg",
//    fallbackSrc2: "/images/wLlFcOz.jpg",
//    alt: "rickshaw-and-ecobeach-3"
// }, {
//    src: "https://i.imgur.com/G4vcSYV.jpeg",
//    fallbackSrc1: "https://i.ibb.co/L0jspcM/G4vcSYV.jpg",
//    fallbackSrc2: "/images/G4vcSYV.jpg",
//    alt: "rickshaw-and-ecobeach-2"
// }, {
//    src: "https://i.imgur.com/Sk0pt8f.jpg",
//    fallbackSrc1: "https://i.ibb.co/d7PLKf5/Sk0pt8f.jpg",
//    fallbackSrc2: "/images/Sk0pt8f.jpg",
//    alt: "apsarkonda-falls"
// }, {
//    src: "https://i.imgur.com/oYli6S9.jpeg",
//    fallbackSrc1: "https://i.ibb.co/Y7v7zsh/oYli6S9.jpg",
//    fallbackSrc2: "/images/oYli6S9.jpg",
//    alt: "Mangrove -walk-bridge"
// }, {
//    src: "https://i.imgur.com/CM3A2GU.jpg",
//    fallbackSrc1: "https://i.ibb.co/pw0NhLM/CM3A2GU.jpg",
//    fallbackSrc2: "/images/CM3A2GU.jpg",
//    alt: "khaleel-rickshaw-1"
// }, {
//    src: "https://i.imgur.com/PYJj2kc.jpg",
//    fallbackSrc1: "https://i.ibb.co/vYSSCQJ/PYJj2kc.jpg",
//    fallbackSrc2: "/images/PYJj2kc.jpg",
//    alt: "apsarkonda-hill-beach"
// }, {
//    src: "https://i.imgur.com/2dGwyFP.jpg",
//    fallbackSrc1: "https://i.ibb.co/DGQZY5V/2dGwyFP.jpg",
//    fallbackSrc2: "/images/2dGwyFP.jpg",
//    alt: "apsarkonda-in-rainy-season"
// }, {
//    src: "https://i.imgur.com/2BYPVup.jpeg",
//    fallbackSrc1: "https://i.ibb.co/pQQWSmk/2BYPVup.jpg",
//    fallbackSrc2: "/images/2BYPVup.jpg",
//    alt: "Mangrove Honnavar"
// }, {
//    src: "https://i.imgur.com/CRjpr6X.jpg",
//    fallbackSrc1: "https://i.ibb.co/dc5KKLy/CRjpr6X.jpg",
//    fallbackSrc2: "/images/CRjpr6X.jpg",
//    alt: "apsarkonda"
// }, {
//    src: "https://i.imgur.com/wMBpwZ6.jpeg",
//    fallbackSrc1: "https://i.ibb.co/SVcCnm0/wMBpwZ6.jpg",
//    fallbackSrc2: "/images/wMBpwZ6.jpg",
//    alt: "rickshaw-and-ecobeach-1"
// }, {
//    src: "https://i.imgur.com/IQUV13B.jpeg",
//    fallbackSrc1: "https://i.ibb.co/2kGP4Gy/IQUV13B.jpg",
//    fallbackSrc2: "/images/IQUV13B.jpg",
//    alt: "Boating-in-honnavar"
// }, {
//    src: "https://i.imgur.com/BEXx6V3.jpg",
//    fallbackSrc1: "https://i.ibb.co/KytknF9/BEXx6V3.jpg",
//    fallbackSrc2: "/images/BEXx6V3.jpg",
//    alt: "eco-beach-2"
// }, {
//    src: "https://i.imgur.com/PktW3cf.png",
//    fallbackSrc1: "https://i.ibb.co/K7y3n7d/PktW3cf.png",
//    fallbackSrc2: "/images/PktW3cf.png",
//    alt: "apsarkoda-falls-3"
// }, {
//    src: "https://i.imgur.com/NkuPoyi.jpeg",
//    fallbackSrc1: "https://i.ibb.co/kDXw2n3/NkuPoyi.jpg",
//    fallbackSrc2: "/images/NkuPoyi.jpg",
//    alt: "ricksahw-seats"
// }, {
//    src: "https://i.imgur.com/MHQApPe.jpeg",
//    fallbackSrc1: "https://i.ibb.co/P1bvxw0/MHQApPe.jpg",
//    fallbackSrc2: "/images/MHQApPe.jpg",
//    alt: "mangrove-boardwalk-front-2"
// }, {
//    src: "https://i.imgur.com/NtTKFde.jpg",
//    fallbackSrc1: "https://i.ibb.co/pXxrMLx/NtTKFde.jpg",
//    fallbackSrc2: "/images/NtTKFde.jpg",
//    alt: "khaleel-rickshaw"
// }];


const images: ImageType[] = [{
   src: "https://i.imgur.com/lj1YChB.jp",
   fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
   fallbackSrc2: "/images/lj1YChB.jpg",
   alt: "apsarkonda-falls-2"
}, 
// {
//    src: "https://i.imgur.com/AELVLIx.jpeg",
//    fallbackSrc1: "https://i.ibb.co/MPnWtR2/AELVLIx.jpg",
//    fallbackSrc2: "/images/AELVLIx.jpg",
//    alt: "mangrove-boardwalk-front"
// }, {
//    src: "https://i.imgur.com/RcHMB4v.jpg",
//    fallbackSrc1: "https://i.ibb.co/GT8Lrsh/RcHMB4v.jpg",
//    fallbackSrc2: "/images/RcHMB4v.jpg",
//    alt: "eco-beach"
// }, {
//    src: "https://i.imgur.com/wLlFcOz.jpeg",
//    fallbackSrc1: "https://i.ibb.co/mX6FvsJ/wLlFcOz.jpg",
//    fallbackSrc2: "/images/wLlFcOz.jpg",
//    alt: "rickshaw-and-ecobeach-3"
// }, {
//    src: "https://i.imgur.com/G4vcSYV.jpeg",
//    fallbackSrc1: "https://i.ibb.co/L0jspcM/G4vcSYV.jpg",
//    fallbackSrc2: "/images/G4vcSYV.jpg",
//    alt: "rickshaw-and-ecobeach-2"
// }, {
//    src: "https://i.imgur.com/Sk0pt8f.jpg",
//    fallbackSrc1: "https://i.ibb.co/d7PLKf5/Sk0pt8f.jpg",
//    fallbackSrc2: "/images/Sk0pt8f.jpg",
//    alt: "apsarkonda-falls"
// }, {
//    src: "https://i.imgur.com/oYli6S9.jpeg",
//    fallbackSrc1: "https://i.ibb.co/Y7v7zsh/oYli6S9.jpg",
//    fallbackSrc2: "/images/oYli6S9.jpg",
//    alt: "Mangrove -walk-bridge"
// }, {
//    src: "https://i.imgur.com/CM3A2GU.jpg",
//    fallbackSrc1: "https://i.ibb.co/pw0NhLM/CM3A2GU.jpg",
//    fallbackSrc2: "/images/CM3A2GU.jpg",
//    alt: "khaleel-rickshaw-1"
// }, {
//    src: "https://i.imgur.com/PYJj2kc.jpg",
//    fallbackSrc1: "https://i.ibb.co/vYSSCQJ/PYJj2kc.jpg",
//    fallbackSrc2: "/images/PYJj2kc.jpg",
//    alt: "apsarkonda-hill-beach"
// }, {
//    src: "https://i.imgur.com/2dGwyFP.jpg",
//    fallbackSrc1: "https://i.ibb.co/DGQZY5V/2dGwyFP.jpg",
//    fallbackSrc2: "/images/2dGwyFP.jpg",
//    alt: "apsarkonda-in-rainy-season"
// }, {
//    src: "https://i.imgur.com/2BYPVup.jpeg",
//    fallbackSrc1: "https://i.ibb.co/pQQWSmk/2BYPVup.jpg",
//    fallbackSrc2: "/images/2BYPVup.jpg",
//    alt: "Mangrove Honnavar"
// }, {
//    src: "https://i.imgur.com/CRjpr6X.jpg",
//    fallbackSrc1: "https://i.ibb.co/dc5KKLy/CRjpr6X.jpg",
//    fallbackSrc2: "/images/CRjpr6X.jpg",
//    alt: "apsarkonda"
// }, {
//    src: "https://i.imgur.com/wMBpwZ6.jpeg",
//    fallbackSrc1: "https://i.ibb.co/SVcCnm0/wMBpwZ6.jpg",
//    fallbackSrc2: "/images/wMBpwZ6.jpg",
//    alt: "rickshaw-and-ecobeach-1"
// }, {
//    src: "https://i.imgur.com/IQUV13B.jpeg",
//    fallbackSrc1: "https://i.ibb.co/2kGP4Gy/IQUV13B.jpg",
//    fallbackSrc2: "/images/IQUV13B.jpg",
//    alt: "Boating-in-honnavar"
// }, {
//    src: "https://i.imgur.com/BEXx6V3.jpg",
//    fallbackSrc1: "https://i.ibb.co/KytknF9/BEXx6V3.jpg",
//    fallbackSrc2: "/images/BEXx6V3.jpg",
//    alt: "eco-beach-2"
// }, {
//    src: "https://i.imgur.com/PktW3cf.png",
//    fallbackSrc1: "https://i.ibb.co/K7y3n7d/PktW3cf.png",
//    fallbackSrc2: "/images/PktW3cf.png",
//    alt: "apsarkoda-falls-3"
// }, {
//    src: "https://i.imgur.com/NkuPoyi.jpeg",
//    fallbackSrc1: "https://i.ibb.co/kDXw2n3/NkuPoyi.jpg",
//    fallbackSrc2: "/images/NkuPoyi.jpg",
//    alt: "ricksahw-seats"
// }, {
//    src: "https://i.imgur.com/MHQApPe.jpeg",
//    fallbackSrc1: "https://i.ibb.co/P1bvxw0/MHQApPe.jpg",
//    fallbackSrc2: "/images/MHQApPe.jpg",
//    alt: "mangrove-boardwalk-front-2"
// }, {
//    src: "https://i.imgur.com/NtTKFde.jpg",
//    fallbackSrc1: "https://i.ibb.co/pXxrMLx/NtTKFde.jpg",
//    fallbackSrc2: "/images/NtTKFde.jpg",
//    alt: "khaleel-rickshaw"
// }
];

export default images;