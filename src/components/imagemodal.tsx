"use client";
import { useCallback, useRef, useEffect, MouseEventHandler, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ImageModalProps {
   children: ReactNode
}

const ImageModal: FC<ImageModalProps> = ({ children }) => {
   const overlay = useRef(null);
   const wrapper = useRef(null);
   const router = useRouter();

   const onDismiss = useCallback(() => {
      router.back();
   }, [router]);

   const onClick: MouseEventHandler = useCallback(
      (e) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss();
         }
      },
      [onDismiss, overlay, wrapper]
   );

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   return (
      <div ref={overlay} className="image-modal" onClick={onClick}>
         <div ref={wrapper} className="image-modal-centered-box">
            {children}
         </div>
      </div>
   );
}

export default ImageModal;