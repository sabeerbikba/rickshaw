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
//          const response = await fetch(`/api/image?page=${page + 1}`);
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


// "use client";
// import { useState, useEffect, FC } from "react";
// import Link from "next/link";
// import type { ImageType } from "@/data/images";
// // import ImageWithFallback from "./imagewithfallback";
// import InterceptingImageWithFallbacks from "./Interceptingimagewithfallbacks";

// // TODO: images rendering double 
// // TODO: if connection problem show somthing error in front-end 

// const InfiniteScroll: FC = () => {
//    // TODO: can be used useReducer
//    const [images, setImages] = useState<ImageType[]>([]);
//    const [page, setPage] = useState<number>(0);
//    const [imagesLoading, setImagesLoading] = useState<boolean>(false);
//    const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

//    const fetchImages = async () => {
//       console.log('inside fetch images try block');
//       try {
//          setImagesLoading(true);
//          const response = await fetch(`/api/image?page=${page + 1}`);
//          const data = await response.json();
//          console.log(data);

//          if (Array.isArray(data)) {
//             const newImages: ImageType[] = data;
//             if (newImages.length > 0) {
//                // setImages((prevImages) => [...prevImages, ...newImages]);

//                setImages((prevImages) => {
//                   const existingIds = new Set(prevImages.map(img => img.id));
//                   const filteredNewImages = newImages.filter(img => !existingIds.has(img.id));
//                   return [...prevImages, ...filteredNewImages];
//                });

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
//          console.log('inside fetch images catch block');
//          console.error("Error fetching images:", error);
//       } finally {
//          setImagesLoading(false);
//       }
//    };

//    const handleScroll = () => {
//       // TODO: 
//       console.log('1');
//       const condtion1 = document.body.scrollHeight + window.scrollY;
//       const condtion2 = window.innerHeight;
//       // const condition = window.innerHeight + window.scrollY >= document.body.scrollHeight
//       const condition = condtion1 > condtion2;
//       console.log('condtion1, condtion2, result', condtion1, condtion2, condition);

//       // console.log('scrollBy', window.innerHeight)

//       if (condition) {
//          console.log('2');
//          if (!imagesLoading && !allImagesLoaded) {
//             console.log('3');
//             fetchImages()
//          };
//       }
//    };



//    useEffect(() => {
//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//       // }, [imagesLoading]);
//    }, []);

//    return (
//       <>
//          {images.map((img: ImageType, key: number): JSX.Element => (
//             <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
//                {/* TODO: give fallbackFixed error like image */}
//                {/* for now set tmp images to preview */}
//                {/* <ImageWithFallback src={img.src} alt={img.alt} fallbackSrc1="/tmp/test.png" infiniteScroll/> */}
//                {/* <ImageWithFallback img={img} /> */}
//                <InterceptingImageWithFallbacks img={img} />

//             </Link>
//          ))}
//          {/* TODO: need to add good animation and all image loaded */}
//          {imagesLoading && <div className="text-red">IMAGES loading</div>}
//          {/* TODO: if  internet is off need to inform the user that internet is of  */}
//          {allImagesLoaded && <div className="text-red">All Images Loaded</div>}
//       </>
//    );
// };

// export default InfiniteScroll;












"use client";
import { useState, useEffect, FC, Fragment } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import type { ImageType } from "@/data/images";
import imagesObject from "@/data/images";
import InterceptingImageWithFallbacks from "./Interceptingimagewithfallbacks";
import InfiniteScroll from 'react-infinite-scroll-component';
import type { GetApiResponse } from "@/types/api";

/**
TODO: when normally website using sent uncecerrly get request in page: 0 

## to repoduces use intercepting link 

## how logs looks in serverr
api/images GET request fired!!
Database already connected, reusing client
null
requested page:  0

## i think reason 

- when code changes made 

## how to test

- make production build using `pnpm build`
- check logs 

 */

const fetchImages = async ({ queryKey }: QueryFunctionContext<[string, number]>): Promise<GetApiResponse> => {
   let result;
   const middleIndexOfImages = Math.ceil(imagesObject.length / 2);
   const [_, page] = queryKey;
   if (page === 1) {
      result = imagesObject.slice(0, middleIndexOfImages);
   } else if (page === 2) {
      result = imagesObject.slice(middleIndexOfImages);
   } else {
      const response = await fetch(`/api/image?page=${page - 2}`); // -2 because of first 2 request 
      if (!response.ok) throw new Error('Failed to fetch images');
      result = await response.json();
   }
   return result;
};

const InfiniteScrollComponent: FC = () => {
   const [images, setImages] = useState<ImageType[]>([]);
   const [page, setPage] = useState<number>(1);
   const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

   const {
      isLoading,
      data,
      // error, // 
   } = useQuery<GetApiResponse, Error, GetApiResponse, [string, number]>({
      queryKey: ['images', page],
      queryFn: fetchImages,
   });

   const fetchMoreData = () => {
      if (!isLoading) {
         setPage((prevPage) => prevPage + 1);
      }
   };

   useEffect(() => {
      if (data) {
         setImages((prevImages) => {
            const newImages: ImageType[] = Array.isArray(data.images)
               ? data.images
               : Array.isArray(data)
                  ? data
                  : [];
            const existingIds = new Set(prevImages.map(img => img.id));
            const filteredNewImages = newImages.filter(img => !existingIds.has(img.id));
            return [...prevImages, ...filteredNewImages];
         });

         if (data.allImagesLoaded) { setAllImagesLoaded(true) }
      }
   }, [data]);

   // useEffect(() => {
   //    console.log(error);
   // }, [error]);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 1850 && page === 1) {
            setPage(2);
         }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [page]);

   return (
      <InfiniteScroll
         dataLength={images.length}
         next={fetchMoreData}
         hasMore={!allImagesLoaded}
         loader={isLoading && !allImagesLoaded && (<LoadingAnimation />)}
         endMessage={(<AllImgesReadyInfo />)}
         className="image-gallery"
      >
         {images.map((img: ImageType): JSX.Element => (
            <Fragment key={img.id}>
               <InterceptingImageWithFallbacks img={img} />
            </Fragment>
         ))}
      </InfiniteScroll>
   );
};

const LoadingAnimation = () => {
   return (
      <div style={{ width: '100%', minWidth: '100px', height: '75px' }}>
         <div className="image-loading-animation"></div>
      </div>
   );
};

const AllImgesReadyInfo = () => {
   return (
      <div className="images-ready">
         🏖️ Tour complete! All images are ready, enjoy the scenery.
      </div>
   );
};

export default InfiniteScrollComponent;



// TODO: images rendering double 
// TODO: if connection problem show somthing error in front-end 

// const fetchImages = async (page: number): Promise<ImageType> => {
//    const response = await fetch(`/api/image?page=${page + 1}`);
//    return await response.json();
// };

// const InfiniteScrollComponent: FC = () => {
//    // TODO: can be used useReducer
//    const [images, setImages] = useState<ImageType[]>(imagesObject);
//    const [page, setPage] = useState<number>(0);
//    const [imagesLoading, setImagesLoading] = useState<boolean>(false);
//    const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

//    console.log(imagesObject.length);

//    // const fetchMoreData = async () => {
//    //    console.log('inside fetch images try block');
//    //    try {
//    //       setImagesLoading(true);
//    //       const response = await fetch(`/api/image?page=${page + 1}`);
//    //       const data = await response.json();
//    //       console.log(data);

//    //       if (Array.isArray(data)) {
//    //          const newImages: ImageType[] = data;
//    //          if (newImages.length > 0) {
//    //             // setImages((prevImages) => [...prevImages, ...newImages]);

//    //             setImages((prevImages) => { // TODO:
//    //                const existingIds = new Set(prevImages.map(img => img.id));
//    //                const filteredNewImages = newImages.filter(img => !existingIds.has(img.id));
//    //                return [...prevImages, ...filteredNewImages];
//    //             });

//    //             console.log("before push: ");
//    //             console.log(images);
//    //             images.push(...newImages)
//    //             console.log("after push: ");
//    //             console.log(images);
//    //             setPage(page + 1);
//    //          }
//    //       } else if ('allImagesLoaded' in data) {
//    //          setAllImagesLoaded(data.allImagesLoaded);
//    //       }
//    //    } catch (error) {
//    //       console.log('inside fetch images catch block');
//    //       console.error("Error fetching images:", error);
//    //    } finally {
//    //       setImagesLoading(false);
//    //    }
//    // };

//    // const handleScroll = () => {
//    //    // TODO: 
//    //    console.log('1');
//    //    const condtion1 = document.body.scrollHeight + window.scrollY;
//    //    const condtion2 = window.innerHeight;
//    //    // const condition = window.innerHeight + window.scrollY >= document.body.scrollHeight
//    //    const condition = condtion1 > condtion2;
//    //    console.log('condtion1, condtion2, result', condtion1, condtion2, condition);

//    //    // console.log('scrollBy', window.innerHeight)

//    //    if (condition) {
//    //       console.log('2');
//    //       if (!imagesLoading && !allImagesLoaded) {
//    //          console.log('3');
//    //          fetchImages()
//    //       };
//    //    }
//    // };

//    const { isLoading, refetch } = useQuery({
//       queryKey: ['items', page],
//       queryFn: () => fetchImages(page),
//       enabled: false, // disabled by default, we will trigger it manually
//       onSuccess: (newItems) => {
//          setItems((prevItems) => [...prevItems, ...newItems]);
//       },
//    });




//    return (
//       <InfiniteScroll
//          dataLength={images.length}
//          next={fetchMoreData}
//          hasMore={!allImagesLoaded}
//          loader={<h4>Loading...</h4>}
//          endMessage={<div className="text-red">All Images Loaded</div>}
//          className="image-gallery"
//       >
//          {images.map((img: ImageType, key: number): JSX.Element => (
//             <Fragment key={key} >
//                {/* TODO: give fallbackFixed error like image */}
//                {/* for now set tmp images to preview */}
//                {/* <ImageWithFallback src={img.src} alt={img.alt} fallbackSrc1="/tmp/test.png" infiniteScroll/> */}
//                {/* <ImageWithFallback img={img} /> */}
//                <InterceptingImageWithFallbacks img={img} />
//             </Fragment>
//          ))}
//          {/* TODO: need to add good animation and all image loaded */}
//          {/* {imagesLoading && <div className="text-red">IMAGES loading</div>} */}
//          {/* TODO: if  internet is off need to inform the user that internet is of  */}
//          {/* {allImagesLoaded && <div className="text-red">All Images Loaded</div>} */}
//          {/* </> */}
//       </InfiniteScroll>
//    );
// };

// export default InfiniteScrollComponent;