type ImageType = {
   id?: number;
   imageName?: string;
   src: string;
   alt: string;
   blurhash: string;
   width: number;
   height: number;
   fallbackSrc1?: string;
   fallbackSrc2?: string;
   allImagesLoaded?: boolean; // TODO: is this property really needed
};

// TODO: need to need to check images object object every image is image matched 
// TODO: TODO: change to: src == imgbb data.url, fallback1 = imgur that used in src

// const images: ImageType[] = [
//    {
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    blurhash: 'U35;~;8wv~*0%3sAkWni9sxuXSVYo}R*o0kD',
//    width: 1872,
//    height: 561,
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// },
//    {
//    src: "https://i.imgur.com/lj1YChB.jp",
//    blurhash: 'U35;~;8wv~*0%3sAkWni9sxuXSVYo}R*o0kD',
//    width: 1872,
//    height: 561,
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// },
// {
//    src: "https://i.imgur.com/RcHMB4v.jp",
//    blurhash: 'U35;~;8wv~*0%3sAkWni9sxuXSVYo}R*o0kD',
//    width: 1872,
//    height: 561,
//    fallbackSrc1: "https://i.ibb.co/GT8Lrsh/RcHMB4v.jp",
//    fallbackSrc2: "/images/RcHMB4v.jpg",
//    alt: "eco-beach"
// },
// {
//    src: "https://i.imgur.com/RcHMB4v.jp",
//    blurhash: 'U35;~;8wv~*0%3sAkWni9sxuXSVYo}R*o0kD',
//    width: 1872,
//    height: 561,
//    fallbackSrc1: "https://i.ibb.co/GT8Lrsh/RcHMB4v.jp",
//    fallbackSrc2: "/images/RcHMB4v.jp",
//    alt: "eco-beach"
// },
//    {
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// },
//    {
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jp",
//    fallbackSrc2: "/images/lj1YChB.jp",
//    alt: "apsarkonda-falls-2"
// },
//    {
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// },
//    {
//    src: "https://i.imgur.com/lj1YChB.jpg",
//    fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
//    fallbackSrc2: "/images/lj1YChB.jpg",
//    alt: "apsarkonda-falls-2"
// },
// ];

// /**

const images: ImageType[] = [{
   src: "https://i.imgur.com/lj1YChB.jpg",
   fallbackSrc1: "https://i.ibb.co/HXXy2qv/lj1YChB.jpg",
   fallbackSrc2: "/images/lj1YChB.jpg",
   alt: "apsarkonda-falls-2",
   blurhash: "ULDl}^My4o-:?]RQMxt7~WM{M{t7NMWAt3jc",
   width: 959,
   height: 1280,
}, {
   src: "https://i.imgur.com/AELVLIx.jpeg",
   fallbackSrc1: "https://i.ibb.co/MPnWtR2/AELVLIx.jpg",
   fallbackSrc2: "/images/AELVLIx.jpg",
   alt: "mangrove-boardwalk-front",
   blurhash: "UhJRKx8_x]xt_N9Zj^s;o|tRV[t7NFxubboy",
   width: 1024,
   height: 767,
}, {
   src: "https://i.imgur.com/RcHMB4v.jpg",
   fallbackSrc1: "https://i.ibb.co/GT8Lrsh/RcHMB4v.jpg",
   fallbackSrc2: "/images/RcHMB4v.jpg",
   alt: "eco-beach",
   blurhash: "UiF~8J%fNGxa_N-pRjog?bxuRjof%Mt6WAs:",
   width: 700,
   height: 443,
}, {
   src: "https://i.imgur.com/wLlFcOz.jpeg",
   fallbackSrc1: "https://i.ibb.co/mX6FvsJ/wLlFcOz.jpg",
   fallbackSrc2: "/images/wLlFcOz.jpg",
   alt: "rickshaw-and-ecobeach-3",
   blurhash: "UEJZ-zt.^Nv|0Z%OR*M_yZp058NF?cNz-o$#",
   width: 4608,
   height: 3456,
}, {
   src: "https://i.imgur.com/G4vcSYV.jpeg",
   fallbackSrc1: "https://i.ibb.co/L0jspcM/G4vcSYV.jpg",
   fallbackSrc2: "/images/G4vcSYV.jpg",
   alt: "rickshaw-and-ecobeach-2",
   blurhash: "U8G+2M00_1-:G^4n%MRkTfM_4:I[00.8Mx%2",
   width: 4608,
   height: 3456,
}, {
   src: "https://i.imgur.com/Sk0pt8f.jpg",
   fallbackSrc1: "https://i.ibb.co/d7PLKf5/Sk0pt8f.jpg",
   fallbackSrc2: "/images/Sk0pt8f.jpg",
   alt: "apsarkonda-falls",
   blurhash: "UBB3~L~E004mt+f,RQNEDhk6%N%N~p%MIUNF",
   width: 200,
   height: 200,
}, {
   src: "https://i.imgur.com/oYli6S9.jpeg",
   fallbackSrc1: "https://i.ibb.co/Y7v7zsh/oYli6S9.jpg",
   fallbackSrc2: "/images/oYli6S9.jpg",
   alt: "Mangrove -walk-bridge",
   blurhash: "UIFreI+cM|KhPTK6RRwJx^RRaOwh~VnPV[o#",
   width: 600,
   height: 750,
}, {
   src: "https://i.imgur.com/CM3A2GU.jpg",
   fallbackSrc1: "https://i.ibb.co/pw0NhLM/CM3A2GU.jpg",
   fallbackSrc2: "/images/CM3A2GU.jpg",
   alt: "khaleel-rickshaw-1",
   blurhash: "ULJ7HuE2^jw^04$%$$NH~UxaE2W:4:58aday",
   width: 718,
   height: 1600,
}, {
   src: "https://i.imgur.com/PYJj2kc.jpg",
   fallbackSrc1: "https://i.ibb.co/vYSSCQJ/PYJj2kc.jpg",
   fallbackSrc2: "/images/PYJj2kc.jpg",
   alt: "apsarkonda-hill-beach",
   blurhash: "UdA-hxVrM_t6X=xVs*R*xwt7oeae%MWXR+t7",
   width: 1000,
   height: 563,
}, {
   src: "https://i.imgur.com/2dGwyFP.jpg",
   fallbackSrc1: "https://i.ibb.co/DGQZY5V/2dGwyFP.jpg",
   fallbackSrc2: "/images/2dGwyFP.jpg",
   alt: "apsarkonda-in-rainy-season",
   blurhash: "UIEW209FMiR*_NDjx?ou?bR%WBRO_JtMICD*",
   width: 1024,
   height: 678,
}, {
   src: "https://i.imgur.com/2BYPVup.jpeg",
   fallbackSrc1: "https://i.ibb.co/pQQWSmk/2BYPVup.jpg",
   fallbackSrc2: "/images/2BYPVup.jpg",
   alt: "Mangrove Honnavar",
   blurhash: "UOKSOz0gM_xtw4g2t5Ip}]WB5QOq}GSeJ6V[",
   width: 1280,
   height: 720,
}, {
   src: "https://i.imgur.com/CRjpr6X.jpg",
   fallbackSrc1: "https://i.ibb.co/dc5KKLy/CRjpr6X.jpg",
   fallbackSrc2: "/images/CRjpr6X.jpg",
   alt: "apsarkonda",
   blurhash: "UIGlbCm*TIR*?ZRht1kV~Rf#RPR*S$Z|RkNH",
   width: 1280,
   height: 720,
}, {
   src: "https://i.imgur.com/wMBpwZ6.jpeg",
   fallbackSrc1: "https://i.ibb.co/SVcCnm0/wMBpwZ6.jpg",
   fallbackSrc2: "/images/wMBpwZ6.jpg",
   alt: "rickshaw-and-ecobeach-1",
   blurhash: "USIz#O-;%1NdLN%Mt6s:%ht7NHxZo~slR*Rk",
   width: 4608,
   height: 3456,
}, {
   src: "https://i.imgur.com/IQUV13B.jpeg",
   fallbackSrc1: "https://i.ibb.co/2kGP4Gy/IQUV13B.jpg",
   fallbackSrc2: "/images/IQUV13B.jpg",
   alt: "Boating-in-honnavar",
   blurhash: "UTC7Zn$~nmtRysj=niogKlNFaej]yYoeWEkD",
   width: 350,
   height: 200,
}, {
   src: "https://i.imgur.com/BEXx6V3.jpg",
   fallbackSrc1: "https://i.ibb.co/KytknF9/BEXx6V3.jpg",
   fallbackSrc2: "/images/BEXx6V3.jpg",
   alt: "eco-beach-2",
   blurhash: "UsHx=]IAM{f7?wInM{kB%ga#RioLjEt7WCf6",
   width: 708,
   height: 452,
}, {
   src: "https://i.imgur.com/PktW3cf.png",
   fallbackSrc1: "https://i.ibb.co/K7y3n7d/PktW3cf.png",
   fallbackSrc2: "/images/PktW3cf.png",
   alt: "apsarkoda-falls-3",
   blurhash: "U4C6-|:o00O=PkBzaA$%~ox.IIsD_KMex:R:",
   width: 800,
   height: 535,
}, {
   src: "https://i.imgur.com/NkuPoyi.jpeg",
   fallbackSrc1: "https://i.ibb.co/kDXw2n3/NkuPoyi.jpg",
   fallbackSrc2: "/images/NkuPoyi.jpg",
   alt: "ricksahw-seats",
   blurhash: "UHF5y@01E1-;~VD*M|a{56kDxaM{x]IUWVxu",
   width: 4608,
   height: 3456,
}, {
   src: "https://i.imgur.com/MHQApPe.jpeg",
   fallbackSrc1: "https://i.ibb.co/P1bvxw0/MHQApPe.jpg",
   fallbackSrc2: "/images/MHQApPe.jpg",
   alt: "mangrove-boardwalk-front-2",
   blurhash: "UAH-oRn3W8={C7Z~I.t7GtNFM~s=qCOlrxS%",
   width: 686,
   height: 386,
}, {
   src: "https://i.imgur.com/NtTKFde.jpg",
   fallbackSrc1: "https://i.ibb.co/pXxrMLx/NtTKFde.jpg",
   fallbackSrc2: "/images/NtTKFde.jpg",
   alt: "khaleel-rickshaw",
   blurhash: "UCE2tVDi~U$zpJn3%0RjERrrX9j?J:9Z%gWB",
   width: 718,
   height: 517,
}];

// */

export type { ImageType };
export default images;