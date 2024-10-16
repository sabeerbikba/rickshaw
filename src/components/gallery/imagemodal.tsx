"use client";
import { useCallback, useRef, useEffect, MouseEvent, FC, useReducer } from "react";
import { useRouter } from "next/navigation";
import transformText from "@/utils/transformtext";
import { isDevelopmentEnv } from "@/data/envimports";

interface ImageModalProps {
   src: string;
   alt: string;
};

interface State {
   dialogOpen: boolean;
   isLoaded: boolean;
   isError: boolean;
   moonLoadingFrame: number;
   imageLoadingFrame: number;
};

type StateField = keyof State;
type StateValue = State[StateField];
type ActionTypes = | { type: 'UPDATE_VALUE'; field: StateField; value: StateValue };

const initialState: State = {
   dialogOpen: true,
   isLoaded: false,
   isError: false,
   moonLoadingFrame: 0,
   imageLoadingFrame: 0,
};

const reducer = (state: State, action: ActionTypes): State => {
   switch (action.type) {
      case 'UPDATE_VALUE':
         return { ...state, [action.field]: action.value };
      default:
         if (isDevelopmentEnv) {
            console.error('Unknown action: ' + action.type);
            console.warn('you have not added action.type: ' + action.type + ' add and try');
         }
         return state;
   }
};

// Image loading frames
const moonLoadingFrames: string[] = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'];
const imageLoadingFrames: string[] = [
   'Image Loading.', 'Image Loading..', 'Image Loading...', 'Image Loading..', 'Image Loading.',
   'Image Loading...', '.Image Loading..', '..Image Loading.'
];

const ImageModal: FC<ImageModalProps> = ({ src, alt }): JSX.Element => {
   const router = useRouter();
   const overlay = useRef<HTMLDivElement>(null);
   const wrapper = useRef<HTMLDivElement>(null);
   const tempImgRef = useRef<HTMLImageElement>(null);
   const imgPreviewLoadingErrorRef = useRef<HTMLDivElement>(null);
   const [state, dispatch] = useReducer(reducer, initialState);
   const {
      dialogOpen,
      isLoaded,
      isError,
      moonLoadingFrame,
      imageLoadingFrame,
   } = state;

   const isAltNotDefined = alt.startsWith('not-specified-');
   const imagePreviewInfo = isAltNotDefined ? '' : transformText(alt);
   const isImagePreviewInfoEmpty = imagePreviewInfo == '';

   const UPDATE_VALUE = (field: StateField, value: StateValue): void => {
      dispatch({ type: 'UPDATE_VALUE', field, value })
   }

   const onDismiss = useCallback(() => {
      router.back();
      UPDATE_VALUE('dialogOpen', false);
      UPDATE_VALUE('isLoaded', false);
   }, [router]);

   const onClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            onDismiss();
         }
      },
      [onDismiss]
   );

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   const handleImageError = () => {
      console.log("image Error!!");
      UPDATE_VALUE('isError', true);
   };

   useEffect(() => {
      const handleClickOutside: EventListener = (e: Event) => {
         if (
            imgPreviewLoadingErrorRef.current &&
            !imgPreviewLoadingErrorRef.current.contains(e.target as Node)
         ) {
            onDismiss();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [onDismiss]);

   useEffect(() => {
      const interval = setInterval(() => {
         UPDATE_VALUE('moonLoadingFrame', (moonLoadingFrame + 1) % moonLoadingFrames.length);
         UPDATE_VALUE('imageLoadingFrame', (imageLoadingFrame + 1) % imageLoadingFrames.length);
      }, 500);

      return () => clearInterval(interval);
   }, [moonLoadingFrame, imageLoadingFrame]);

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   useEffect(() => {
      const img = tempImgRef.current;
      const handleLoad = () => UPDATE_VALUE('isLoaded', true);


      if (img && img.complete) {
         handleLoad();
      } else {
         img?.addEventListener('load', handleLoad);
      }

      return () => {
         if (img) {
            img.removeEventListener('load', handleLoad);
         }
      };
   }, []);

   return (
      <dialog id="imageModal" open={dialogOpen}>
         {isError || !isLoaded ? (
            <div className="image-preview-error-loading" ref={imgPreviewLoadingErrorRef}>
               {isError &&
                  <div className="error">Unable to load image. Please check your internet
                     {' '}<span>connection 💔.</span>
                  </div>
               }
               {!isLoaded && !isError &&
                  <div>
                     <p>{moonLoadingFrames[moonLoadingFrame]}</p>
                     <p>{imageLoadingFrames[imageLoadingFrame]}</p>
                  </div>
               }
               <button onClick={onDismiss}>&times;</button>
            </div>
         ) : (
            <>
               <span className="imagePreview-close" onClick={onDismiss}>&times;</span>
               <div className="preview" ref={overlay} onClick={onClick}>
                  <div className="imagePreview-wrapper" ref={wrapper}>
                     <img
                        src={src}
                        alt={alt}
                        style={{
                           borderBottomWidth: isImagePreviewInfoEmpty ? '3px' : '0',
                           borderRadius: '5px',
                           maxWidth: '90%',
                        }}
                        className="imagePreview-modal-content"
                     />
                     {!isImagePreviewInfoEmpty && (
                        <div className="imagePreview-info" style={{ maxWidth: '90%' }}>{imagePreviewInfo}</div>
                     )}
                  </div>
               </div>
            </>
         )}
         <img style={{ display: "none" }} ref={tempImgRef} onError={handleImageError} src={src} alt={alt} />
      </dialog>
   );
};

export default ImageModal;
