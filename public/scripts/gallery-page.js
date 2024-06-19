const ImagePreviewInfoMobile = document.querySelectorAll("#imagePreview-info-mobile");
const ImageGallery = document.querySelectorAll("#gallery-img");
const imagePreview_modal = document.querySelector("#imageModal"); console.log(imagePreview_modal);
const imagePreview_modalImg = document.querySelector(".imagePreview-modal-content");
const imagePreview_info = document.querySelector(".imagePreview-info");

function isMobileDevice() {
   const userAgent = navigator.userAgent;
   return (typeof window.orientation !== "undefined") ||
      (userAgent.indexOf('Mobile') !== -1) ||
      (userAgent.indexOf('touch') !== -1);
}

console.log("isMobile: ", isMobileDevice());

if (isMobileDevice()) {
   ImagePreviewInfoMobile.forEach(element => {
      element.style.display = 'block';
   });

   ImageGallery.forEach(element => {
      element.addEventListener('click', function () {
         imagePreview_modal.showModal();
         imagePreview_modalImg.src = this.src;
         imagePreview_modalImg.alt = this.alt;
         imagePreview_info.style.maxWidth = `${imagePreview_modalImg.clientWidth + 6}px`;
         imagePreview_info.textContent = this.alt.replace(/-/g, ' ').replace(/\d+/g, '');
         imagePreview_modalImg.style.marginTop = ((window.innerHeight - imagePreview_modalImg.height) / 2) + 'px';
      });
   });
} else {
   ImagePreviewInfoMobile.forEach(element => {
      element.style.display = 'none';
   });
}