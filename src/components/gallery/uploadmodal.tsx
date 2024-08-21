// 'use client';
// import "client-only";
// import React, { useState, useEffect, useRef, FC } from 'react';
// import { formatBytes } from "@/utils/functions";

// const supportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];
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
//             return extension && supportedFormats.includes(extension);
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

// const supportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];
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
//             return extension && supportedFormats.includes(extension);
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

// TODO: border need to disapear when image is selected


"use client";
import React, { useState, useEffect, useRef, FC } from 'react';
import { formatBytes } from "@/utils/functions";

const supportedFormats = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'webp', 'heic', 'avif'];

const UploadModal: FC = (): JSX.Element => {
   const [isOpen, setIsOpen] = useState(false);
   const modalRef = useRef<HTMLDivElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [selectedImages, setSelectedImages] = useState<{ src: string, file: File, editedName: string }[]>([]);
   const [editIndex, setEditIndex] = useState<number | null>(null);

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
            file,
            editedName: file.name,
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
         const response = await fetch('/api/image', {
            method: 'POST',
            body: formData,
         });

         if (response.ok) {
            const result = await response.json();
            // console.log('Upload successful:', result);
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
                  {/* TODO: .plus-sign not used yet */}
                  {/* <div className="plus-sign">+</div> */}
                  {selectedImages.length === 0 ? (
                     <div className="chose-images browse-btn-div">
                        <span className="drag-text">Choose Images{' '}</span>
                        <button onClick={fileInputClicked} className="browse-btn browse-btn-upload">Browse files</button>
                     </div>
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
                                             // onInput={adjustWidth(this)}
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
                     <button id="upload-submit" className="browse-btn browse-server-upload" type="button" onClick={handleUpload}>Upload</button>
                  </div>
               </div>
            </div>
         </div>
      </dialog>
   );
}

export default UploadModal;
