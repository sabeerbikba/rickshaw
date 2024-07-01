// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import images, { ImageType } from "@/app/gallery/images";

// type InfiniteScrollProps = {
//    initialImages: ImageType[];
//    allImagesLoaded?: boolean;
// };

// const InfiniteScroll = ({ initialImages }: InfiniteScrollProps) => {
//    const [images, setImages] = useState<ImageType[]>(initialImages);
//    const [page, setPage] = useState<number>(0);
//    const [imagesLoading, setImagesLoading] = useState<boolean>(false);
//    const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

//    const fetchImages = async () => {
//       try {
//          setImagesLoading(true);
//          const response = await fetch(`/gallery/api?page=${page + 1}`);
//          const data = await response.json();

//          if (Array.isArray(data)) {
//             const newImages: ImageType[] = data;
//             if (newImages.length > 0) {
//                setImages((prevImages) => [...prevImages, ...newImages]);
//                console.log("before push: ");
//                console.log(images);               
//                images.push(...newImages)
//                console.log("after push: ");
//                console.log(images);               
//                setPage(page + 1);
//             }
//          } else if ('allImagesLoaded' in data) {
//             setAllImagesLoaded(data.allImagesLoaded);
//          }
//       } catch (error) {
//          console.error("Error fetching images:", error);
//       } finally {
//          setImagesLoading(false);
//       }
//    };

//    const handleScroll = () => {
//       if (
//          window.innerHeight + window.scrollY >= document.body.scrollHeight
//       ) {
//          if (!imagesLoading && !allImagesLoaded) fetchImages();
//       }
//    };

//    useEffect(() => {
//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//    }, [imagesLoading]);

//    return (
//       <>
//          {images.map((img: ImageType, key: number): JSX.Element => (
//             <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
//                <img
//                   src={img.srcUrl}
//                   alt={img.alt}
//                   id="gallery-img"
//                   loading="lazy"
//                   style={{ boxShadow: "1px solid red" }}
//                />
//             </Link>
//          ))}
//          {imagesLoading && <div className="text-red">IMAGES loading</div>}
//          {allImagesLoaded && <div className="text-red">All Images Loaded</div>}
//       </>
//    );
// };

// export default InfiniteScroll;


"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import images, { ImageType } from "@/app/gallery/images";

type InfiniteScrollProps = {
   initialImages: ImageType[];
   allImagesLoaded?: boolean;
};

const InfiniteScroll = ({ initialImages }: InfiniteScrollProps) => {
   const [images, setImages] = useState<ImageType[]>(initialImages);
   const [page, setPage] = useState<number>(0);
   const [imagesLoading, setImagesLoading] = useState<boolean>(false);
   const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

   const fetchImages = async () => {
      try {
         setImagesLoading(true);
         const response = await fetch(`/gallery/api?page=${page + 1}`);
         const data = await response.json();

         if (Array.isArray(data)) {
            const newImages: ImageType[] = data;
            if (newImages.length > 0) {
               setImages((prevImages) => [...prevImages, ...newImages]);
               console.log("before push: ");
               console.log(images);
               images.push(...newImages)
               console.log("after push: ");
               console.log(images);
               setPage(page + 1);
            }
         } else if ('allImagesLoaded' in data) {
            setAllImagesLoaded(data.allImagesLoaded);
         }
      } catch (error) {
         console.error("Error fetching images:", error);
      } finally {
         setImagesLoading(false);
      }
   };

   const handleScroll = () => {
      if (
         window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
         if (!imagesLoading && !allImagesLoaded) fetchImages();
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [imagesLoading]);

   return (
      <>
         {images.map((img: ImageType, key: number): JSX.Element => (
            <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
               <img
                  src={img.srcUrl}
                  alt={img.alt}
                  id="gallery-img"
                  loading="lazy"
                  style={{ boxShadow: "1px solid red" }}
               />
            </Link>
         ))}
         {imagesLoading && <div className="text-red">IMAGES loading</div>}
         {allImagesLoaded && <div className="text-red">All Images Loaded</div>}
      </>
   );
};

export default InfiniteScroll;