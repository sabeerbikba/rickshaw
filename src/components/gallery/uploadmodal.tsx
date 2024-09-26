// 'use client';
// import "client-only";
// import React, { useState, useEffect, useRef, FC } from 'react';
// import { formatBytes } from "@/utils/functions";

// const imgBBsupportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];
// // TODO: need to avoid reupload image not working properly need to save in localStorageState MSG: you prevoisly uploaded this image.
// // TODO: need to find better area to show error and messages, messages will be show for specifc second then disapesrs if it is good log this messages 

// const UploadModal: FC = (): JSX.Element => {
//    const [isOpen, setIsOpen] = useState(false);
//    const modalRef = useRef<HTMLDivElement>(null);
//    const fileInputRef = useRef<HTMLInputElement>(null);
//    const [selectedImages, setSelectedImages] = useState<{ src: string, file: File }[]>([]);

//    useEffect(() => {
//       const openModalButton = document.getElementById('upload-button');
//       const closeModalButton = document.getElementById('close-modal');

//       const openModal = () => setIsOpen(true);
//       const closeModal = () => setIsOpen(false);

//       openModalButton?.addEventListener('click', openModal);
//       closeModalButton?.addEventListener('click', closeModal);

//       const handleKeyPress = (event: KeyboardEvent) => {
//          if (event.key === 'Escape') {
//             closeModal();
//          }
//       };

//       const handleClickOutside = (event: MouseEvent) => {
//          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//             closeModal();
//          }
//       };

//       document.addEventListener('keydown', handleKeyPress);
//       document.addEventListener('mousedown', handleClickOutside);

//       return () => {
//          openModalButton?.removeEventListener('click', openModal);
//          closeModalButton?.removeEventListener('click', closeModal);
//          document.removeEventListener('keydown', handleKeyPress);
//          document.removeEventListener('mousedown', handleClickOutside);
//       };
//    }, []);

//    const fileInputClicked = () => {
//       if (fileInputRef.current) {
//          fileInputRef.current.click();
//       }
//    };

//    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const files = event.target.files;
//       if (files) {
//          const filteredFiles = Array.from(files).filter(file => {
//             const extension = file.name.split('.').pop()?.toLowerCase();
//             return extension && imgBBsupportedFormats.includes(extension);
//          });

//          const newImagesArray = filteredFiles.map(file => ({
//             src: URL.createObjectURL(file),
//             file
//          }));

//          const allImages = [...selectedImages, ...newImagesArray];
//          const limitedImages = allImages.slice(0, 5);
//          // TODO: if image removed notify the user which image is removed and reason 
//          setSelectedImages(limitedImages);

//          if (filteredFiles.length !== files.length) {
//             alert('Some files were filtered out because they are not supported image formats or duplicates.');
//          }
//       }
//    };

//    const removeImage = (index: number) => {
//       const newImages = [...selectedImages];
//       newImages.splice(index, 1);
//       setSelectedImages(newImages);
//    };

//    const handleUpload = async () => {
//       const formData = new FormData();
//       selectedImages.forEach(image => {
//          formData.append('images', image.file);
//       });

//       try {
//          const response = await fetch('/api/image', {
//             method: 'POST',
//             body: formData,
//          });

//          if (response.ok) {
//             const result = await response.json();
//             // console.log('Upload successful:', result);
//             // TODO: recive from sucess can be used like recive upload image and show in gallery 
//             // Optionally reset selected images after successful upload
//             setSelectedImages([]);
//             alert('Images uploaded successfully!');
//          } else {
//             console.error('Upload failed:', response.statusText);
//             alert('Upload failed. Please try again.');
//          }
//       } catch (error) {
//          console.error('Error uploading images:', error);
//          alert('Error uploading images. Please try again.');
//       }
//    };

//    return (
//       <dialog id="upload-modal" open={isOpen}>
//          <div className="modal-overlay">
//             <div className="modal-content" id="uploadArea" ref={modalRef}>
//                <button className="close-btn" id="close-modal">X</button>
//                <div className="upload-container">
//                   <div className="plus-sign">+</div>
//                   {selectedImages.length === 0 ? (
//                      <div className="chose-images browse-btn-div">
//                         <span className="drag-text">Choose Images{' '}</span>
//                         <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
//                      </div>
//                   ) : (
//                      <div className="image-preview" id="imagePreview">
//                         {selectedImages.map((image, index): JSX.Element => (
//                            <div className="image-container" key={index}>
//                               <img src={image.src} alt={`Preview ${index}`} className="preview-image" />
//                               <div className="file-info">
//                                  <p><b>{image.file.name}</b></p>
//                                  <p>{formatBytes(image.file.size)}</p>
//                               </div>
//                               <button className="remove-btn" onClick={() => removeImage(index)}>Remove</button>
//                            </div>
//                         ))}
//                      </div>
//                   )}
//                   <progress id="uploadProgress" value="10" max="100"></progress>
//                </div>
//                <div className="btns-container">
//                   {selectedImages.length !== 0 && (
//                      <div className="add-more browse-btn-div">
//                         <span className="drag-text">Add More Images{" "}</span>
//                         <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
//                      </div>
//                   )}
//                   <div>
//                      <input type="file" id="fileInput" name="images" accept="image/*" multiple hidden ref={fileInputRef} onChange={handleFileInputChange} />
//                      {/* TODO: if images length is 0 need to disable button */}
//                      <button id="upload-submit" className="browse-btn browse-server-upload" type="button" onClick={handleUpload}>Upload</button>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </dialog>
//    );
// }

// export default UploadModal;


// 'use client';
// import "client-only";
// import React, { useState, useEffect, useRef, FC } from 'react';
// import { formatBytes } from "@/utils/functions";

// const imgBBsupportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];
// // TODO: need to avoid reupload image not working properly need to save in localStorageState MSG: you prevoisly uploaded this image.
// // TODO: need to find better area to show error and messages, messages will be show for specifc second then disapesrs if it is good log this messages 

// const UploadModal: FC = (): JSX.Element => {
//    const [isOpen, setIsOpen] = useState(false);
//    const modalRef = useRef<HTMLDivElement>(null);
//    const fileInputRef = useRef<HTMLInputElement>(null);
//    const [selectedImages, setSelectedImages] = useState<{ src: string, file: File }[]>([]);
//    const [editedImageNames, setEditedImageNames] = useState<{ originalName: string, editedName: string }[]>([]);

//    useEffect(() => {
//       const openModalButton = document.getElementById('upload-button');
//       const closeModalButton = document.getElementById('close-modal');

//       const openModal = () => setIsOpen(true);
//       const closeModal = () => setIsOpen(false);

//       openModalButton?.addEventListener('click', openModal);
//       closeModalButton?.addEventListener('click', closeModal);

//       const handleKeyPress = (event: KeyboardEvent) => {
//          if (event.key === 'Escape') {
//             closeModal();
//          }
//       };

//       const handleClickOutside = (event: MouseEvent) => {
//          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//             closeModal();
//          }
//       };

//       document.addEventListener('keydown', handleKeyPress);
//       document.addEventListener('mousedown', handleClickOutside);

//       return () => {
//          openModalButton?.removeEventListener('click', openModal);
//          closeModalButton?.removeEventListener('click', closeModal);
//          document.removeEventListener('keydown', handleKeyPress);
//          document.removeEventListener('mousedown', handleClickOutside);
//       };
//    }, []);

//    const fileInputClicked = () => {
//       if (fileInputRef.current) {
//          fileInputRef.current.click();
//       }
//    };

//    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const files = event.target.files;
//       if (files) {
//          const filteredFiles = Array.from(files).filter(file => {
//             const extension = file.name.split('.').pop()?.toLowerCase();
//             return extension && imgBBsupportedFormats.includes(extension);
//          });

//          const newImagesArray = filteredFiles.map(file => ({
//             src: URL.createObjectURL(file),
//             file
//          }));

//          const allImages = [...selectedImages, ...newImagesArray];
//          const limitedImages = allImages.slice(0, 5);
//          // TODO: if image removed notify the user which image is removed and reason 
//          setSelectedImages(limitedImages);

//          if (filteredFiles.length !== files.length) {
//             alert('Some files were filtered out because they are not supported image formats or duplicates.');
//          }
//       }
//    };

//    const removeImage = (index: number) => {
//       const newImages = [...selectedImages];
//       newImages.splice(index, 1);
//       setSelectedImages(newImages);
//    };

//    const handleUpload = async () => {
//       const formData = new FormData();
//       // selectedImages.forEach(image => {
//       //    formData.append('images', image.file);
//       // });

//       selectedImages.forEach((image, index) => {
//          formData.append('images', image.file);
//          const editedName = editedImageNames[index]?.editedName || image.file.name;
//          formData.append('editedImgNames', editedName);
//       });
//       // console.log(formData);

//       try {
//          const response = await fetch('/api/image', {
//             method: 'POST',
//             body: formData,
//          });

//          if (response.ok) {
//             const result = await response.json();
//             // console.log('Upload successful:', result);
//             // TODO: recive from sucess can be used like recive upload image and show in gallery 
//             // Optionally reset selected images after successful upload
//             setSelectedImages([]);
//             alert('Images uploaded successfully!');
//          } else {
//             console.error('Upload failed:', response.statusText);
//             alert('Upload failed. Please try again.');
//          }
//       } catch (error) {
//          console.error('Error uploading images:', error);
//          alert('Error uploading images. Please try again.');
//       }
//    };

//    return (
//       <dialog id="upload-modal" open={isOpen}>
//          <div className="modal-overlay">
//             <div className="modal-content" id="uploadArea" ref={modalRef}>
//                <button className="close-btn" id="close-modal">X</button>
//                <div className="upload-container">
//                   <div className="plus-sign">+</div>
//                   {selectedImages.length === 0 ? (
//                      <div className="chose-images browse-btn-div">
//                         <span className="drag-text">Choose Images{' '}</span>
//                         <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
//                      </div>
//                   ) : (
//                      <div className="image-preview" id="imagePreview">
//                         {selectedImages.map((image, index): JSX.Element => (
//                            <div className="image-container" key={index}>
//                               <img src={image.src} alt={`Preview ${index}`} className="preview-image" />
//                               {/* <div className="file-info">
//                                  <p><b>{image.file.name}</b></p>
//                                  <p>{formatBytes(image.file.size)}</p>
//                               </div> */}
//                               <div className="file-info">
//                                  <p><b>{image.file.name}</b></p>
//                                  <input
//                                     type="text"
//                                     placeholder="Enter edited name"
//                                     value={editedImageNames[index]?.editedName || ''}
//                                     onChange={(e) => {
//                                        const newEditedNames = [...editedImageNames];
//                                        newEditedNames[index] = {
//                                           originalName: image.file.name,
//                                           editedName: e.target.value,
//                                        };
//                                        setEditedImageNames(newEditedNames);
//                                     }}
//                                  />
//                                  <p>{formatBytes(image.file.size)}</p>
//                               </div>
//                               <button className="remove-btn" onClick={() => removeImage(index)}>Remove</button>
//                            </div>
//                         ))}
//                      </div>
//                   )}
//                   <progress id="uploadProgress" value="10" max="100"></progress>
//                </div>
//                <div className="btns-container">
//                   {selectedImages.length !== 0 && (
//                      <div className="add-more browse-btn-div">
//                         <span className="drag-text">Add More Images{" "}</span>
//                         <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
//                      </div>
//                   )}
//                   <div>
//                      <input type="file" id="fileInput" name="images" accept="image/*" multiple hidden ref={fileInputRef} onChange={handleFileInputChange} />
//                      {/* TODO: if images length is 0 need to disable button */}
//                      <button id="upload-submit" className="browse-btn browse-server-upload" type="button" onClick={handleUpload}>Upload</button>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </dialog>
//    );
// }

// export default UploadModal;

"use client";
import { useState, useEffect, useRef, FC } from 'react';
import { filteredSupportedFormat } from '@/data/supportformat';
import formatBytes from '@/utils/formatbytes';
import { isDevelopmentEnv } from '@/data/envimports';

// TODO: If images upload successful not showing for now

const UploadModal: FC = (): JSX.Element => {
   const modalRef = useRef<HTMLDivElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selectedImages, setSelectedImages] = useState
      <{ src: string, file: File, editedName: string }[]>([]);
   const [editIndex, setEditIndex] = useState<number | null>(null);
   const [isImagesUploading, setIsImagesUploading] = useState<boolean>(false);

   const isImagesNotSelected: boolean = selectedImages.length === 0;

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

   const fileInputClicked = (): void => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files) {
         const newImagesArray = Array.from(files).map(file => {
            if (file.size > 1024 * 1024) { // 1MB
               alert(`${file.name} exceeds the maximum size of 1MB.`);
               return null;
            }

            return {
               src: URL.createObjectURL(file),
               file,
               editedName: file.name,
            };
         }).filter(file => file !== null);

         const allImages = [...selectedImages, ...newImagesArray];
         if (allImages.length > 5) {
            alert('Max 5 images allowed');
         }
         const limitedImages = allImages.slice(0, 5);
         setSelectedImages(limitedImages);
      }
   };

   const removeImage = (index: number) => {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      setSelectedImages(newImages);
   };

   const handleEditName = (index: number) => {
      setEditIndex(index === editIndex ? null : index);
   };

   const handleNameChange = (index: number, newName: string) => {
      const newImages = [...selectedImages];
      newImages[index] = {
         ...newImages[index],
         editedName: newName,
      };
      setSelectedImages(newImages);
   };

   const handleUpload = async () => {
      const formData = new FormData();
      selectedImages.forEach(image => {
         formData.append('images', image.file);
         formData.append('editedImgNames', image.editedName);
      });

      try {
         setIsImagesUploading(true);
         const response = await fetch('/api/image', {
            method: 'POST',
            body: formData,
         });
         const result = await response.json();

         /**
          --------------------------------------------------
          // // RESPONSE WHEN FAILED // // 
         
          {"success":false,"message":"Empty request!!"}
         
          --------------------------------------------------
          // // RESPONSE WHEN SUCCESS // //

         {"success": true,}

         --------------------------------------------------
          */

         if (response.ok) {

            setSelectedImages([]);
            alert('Images uploaded successfully!');
            setIsImagesUploading(false);
         } else {
            const message: string = result.message;
            if (message === '') {
               alert('Image Upload Failed!!');
            } else {
               alert(message)
            }

            setIsImagesUploading(false);
         }
      } catch (error) {
         if (isDevelopmentEnv) {
            console.error('Error uploading images:', error);
         }

         alert('Error uploading images. Please try again.');
         setIsImagesUploading(false);
      }
   };

   return (
      <dialog id="upload-modal" open={isOpen}>
         <div className="modal-overlay">
            <div className="modal-content" id="uploadArea" ref={modalRef}>
               <button className="close-btn" id="close-modal">X</button>
               <div className="upload-container">
                  {isImagesNotSelected ? (
                     <AddImagesButton
                        divClassNames='chose-images browse-btn-div'
                        onClick={fileInputClicked}
                        text='Choose Images'
                        conditionToRender={isImagesNotSelected}
                     />
                  ) : (
                     <div className="image-preview" id="imagePreview">
                        {selectedImages.map((image, index): JSX.Element => (
                           <div className="image-container" key={index}>
                              <img src={image.src} alt={`Preview ${index}`} className="preview-image" />

                              <div className="file-info">
                                 <div className='flex-center'>
                                    {editIndex === index ? (
                                       <div className="file-info">
                                          <input
                                             type="text"
                                             value={image.editedName}
                                             onChange={(e) => handleNameChange(index, e.target.value)}
                                             style={{ width: "" }}
                                             autoFocus
                                          />
                                          <button onClick={() => setEditIndex(null)}>Save</button>
                                       </div>
                                    ) : (
                                       <>
                                          <p><b>{image.editedName}</b></p>
                                          <button onClick={() => handleEditName(index)}>Edit</button>
                                       </>
                                    )}
                                 </div>
                                 <p>{formatBytes(image.file.size)}</p>
                              </div>
                              <button className="remove-btn" onClick={() => removeImage(index)}>Remove</button>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
               <div className="btns-container">
                  <AddImagesButton
                     divClassNames='add-more browse-btn-div'
                     onClick={fileInputClicked}
                     text='Add More Images'
                     conditionToRender={!isImagesNotSelected}
                  />
                  <div>
                     <input
                        type="file"
                        id="fileInput"
                        name="images"
                        accept={
                           Array.from(filteredSupportedFormat)
                              .map((format: string) => `.${format}`)
                              .join(', ')
                        }
                        multiple
                        hidden // HIDDEN //
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                     />
                     <button
                        id="upload-submit"
                        className="browse-btn browse-server-upload"
                        type="button"
                        onClick={handleUpload}
                        disabled={isImagesNotSelected || isImagesUploading}
                        style={{ display: 'flex', placeContent: 'center space-around', flexWrap: 'wrap' }}
                     >
                        <UploadingAnimation conditionToRender={isImagesUploading} />
                        {isImagesUploading ? 'Uploading' : 'Upload'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </dialog >
   );
};

const AddImagesButton: FC<
   { divClassNames: string, onClick: () => void, text: string, conditionToRender: boolean }
> = (
   { divClassNames, onClick, text, conditionToRender }
) => conditionToRender && (
   <div
      role='button'
      className={divClassNames}
      onClick={onClick}
   >
      <span className="drag-text">{text + " "}</span>
      <button className="browse-btn browse-btn-upload">
         Browse files
      </button>
   </div>
);

const UploadingAnimation: FC<{ conditionToRender: boolean }> = ({ conditionToRender }) => conditionToRender && (
   <>
      <style>
         {`
            @keyframes spin {
               0% { transform: rotate(0deg); }
               100% { transform: rotate(360deg); }
               }
            `}
      </style>
      <div
         style={{
            width: '16px',
            height: '16px',
            border: '3px solid grey',
            borderRadius: '50%',
            padding: 'auto 0',
            borderLeftColor: '#000000b3',
            animation: 'spin 1s ease infinite',
         }}
      />
   </>
);

export default UploadModal;
