function appendImages(images, boxShadow = '') {
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        const img = document.createElement('img');
        img.src = image.srcUrl;
        img.alt = image.alt;
        img.classList.add('gallery-img');
        img.style.boxShadow = boxShadow;
        img.setAttribute('loading', 'lazy');
        const imagePreviewInfo = document.createElement('div');
        imagePreviewInfo.classList.add('imagePreview-info-mobile');
        imagePreviewInfo.textContent = image.alt;
        if (isMobileDevice() && image.alt) {
            imagePreviewInfo.style.display = 'block';
        } else {
            imagePreviewInfo.style.display = 'none';
        }
        imageItem.appendChild(img);
        imageItem.appendChild(imagePreviewInfo);
        imagePreview_imageGallery.appendChild(imageItem);

        if (!isMobileDevice()) {
            img.addEventListener('click', function () {
                imagePreview_modal.showModal();
                imagePreview_modalImg.src = this.src;
                imagePreview_modalImg.alt = this.alt;
                imagePreview_info.style.maxWidth = `${imagePreview_modalImg.clientWidth + 6}px`;
                imagePreview_info.textContent = this.alt.replace(/-/g, ' ').replace(/\d+/g, '');
                imagePreview_modalImg.style.marginTop = ((window.innerHeight - imagePreview_modalImg.height) / 2) + 'px';
            });
        }
    });
}