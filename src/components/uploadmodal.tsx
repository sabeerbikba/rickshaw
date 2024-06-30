'use client';
import "client-only";
import React, { useState, useEffect, useRef, FC } from 'react';
import { formatBytes } from "@/utils/functions";



const supportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];
// // TODO: need to avoid reupload image not working properly need to save in localStorageState
// // TODO: when press ESC button need to close upload-modal

const UploadModal: FC = (): JSX.Element => {
   const [isOpen, setIsOpen] = useState(false);
   const modalRef = useRef<HTMLDivElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [selectedImages, setSelectedImages] = useState<{ src: string, file: File }[]>([]);

   useEffect(() => {
      const openModalButton = document.getElementById('upload-button');
      const closeModalButton = document.getElementById('close-modal');

      const openModal = () => setIsOpen(true);
      const closeModal = () => setIsOpen(false);

      openModalButton?.addEventListener('click', openModal);
      closeModalButton?.addEventListener('click', closeModal);

      const handleKeyPress = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            closeModal();
         }
      };

      const handleClickOutside = (event: MouseEvent) => {
         if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
         }
      };

      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         openModalButton?.removeEventListener('click', openModal);
         closeModalButton?.removeEventListener('click', closeModal);
         document.removeEventListener('keydown', handleKeyPress);
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   const fileInputClicked = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
         const filteredFiles = Array.from(files).filter(file => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            return extension && supportedFormats.includes(extension);
         });

         const newImagesArray = filteredFiles.map(file => ({
            src: URL.createObjectURL(file),
            file
         }));

         const allImages = [...selectedImages, ...newImagesArray];
         const limitedImages = allImages.slice(0, 5);
         setSelectedImages(limitedImages);

         if (filteredFiles.length !== files.length) {
            alert('Some files were filtered out because they are not supported image formats or duplicates.');
         }
      }
   };

   const removeImage = (index: number) => {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      setSelectedImages(newImages);
   };

   // const formatBytes = (bytes: number) => {
   //    if (bytes === 0) return '0 Bytes';
   //    const k = 1024;
   //    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   //    const i = Math.floor(Math.log(bytes) / Math.log(k));
   //    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   // };

   const handleUpload = async () => {
      const formData = new FormData();
      selectedImages.forEach(image => {
         formData.append('images', image.file);
      });

      try {
         const response = await fetch('/gallery/api', {
            method: 'POST',
            body: formData,
         });

         if (response.ok) {
            const result = await response.json();
            // console.log('Upload successful:', result);
            // TODO: recive from sucess can be used like recive upload image and show in gallery 
            // Optionally reset selected images after successful upload
            setSelectedImages([]);
            alert('Images uploaded successfully!');
         } else {
            console.error('Upload failed:', response.statusText);
            alert('Upload failed. Please try again.');
         }
      } catch (error) {
         console.error('Error uploading images:', error);
         alert('Error uploading images. Please try again.');
      }
   };

   return (
      <dialog id="upload-modal" open={isOpen}>
         <div className="modal-overlay">
            <div className="modal-content" id="uploadArea" ref={modalRef}>
               <button className="close-btn" id="close-modal">X</button>
               <div className="upload-container">
                  <div className="plus-sign">+</div>
                  {selectedImages.length === 0 ? (
                     <div className="chose-images browse-btn-div">
                        <span className="drag-text">Choose Images{' '}</span>
                        <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
                     </div>
                  ) : (
                     <div className="image-preview" id="imagePreview">
                        {selectedImages.map((image, index) => (
                           <div className="image-container" key={index}>
                              <img src={image.src} alt={`Preview ${index}`} className="preview-image" />
                              <div className="file-info">
                                 <p><b>{image.file.name}</b></p>
                                 <p>{formatBytes(image.file.size)}</p>
                              </div>
                              <button className="remove-btn" onClick={() => removeImage(index)}>Remove</button>
                           </div>
                        ))}
                     </div>
                  )}
                  <progress id="uploadProgress" value="10" max="100"></progress>
               </div>
               <div className="btns-container">
                  {selectedImages.length !== 0 && (
                     <div className="add-more browse-btn-div">
                        <span className="drag-text">Add More Images{" "}</span>
                        <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
                     </div>
                  )}
                  <div>
                     <input type="file" id="fileInput" name="images" accept="image/*" multiple hidden ref={fileInputRef} onChange={handleFileInputChange} />
                     {/* TODO: if images length is 0 need to disable button */}
                     <button id="upload-submit" className="browse-btn browse-server-upload" type="button" onClick={handleUpload}>Upload</button>
                  </div>
               </div>
            </div>
         </div>
      </dialog>
   );
}

export default UploadModal;