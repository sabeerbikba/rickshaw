const uploadedImages = [];
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('upload-modal');
const progressBar = document.getElementById('uploadProgress');
const uploadForm = document.getElementById('uploadForm');
const imagesInput = document.getElementById('images');
const uploadButton = document.querySelector('#uploadForm button[type="submit"]');

openModalBtn.addEventListener('click', () => {
    modal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

async function loadImages(imageNames) {
    console.log('loadImages');
    try {
        const response = await fetch(`/images?img=${imageNames.join('&img=')}`);
        if (!response.ok) {
            console.error('Network response was not ok', response.statusText);
            return;
        }

        const { imagesOut } = await response.json();
        console.log(imagesOut);
        progressBar.value = 100;

        const imageGallery = document.getElementById('image-gallery');
        imagesOut.forEach(image => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            const img = document.createElement('img');
            img.width = "100";
            img.src = image.srcUrl;
            img.alt = image.alt;
            img.classList.add('gallery-img');
            img.setAttribute('loading', 'lazy');
            const imagePreviewInfo = document.createElement('div');
            imagePreviewInfo.classList.add('imagePreview-info-mobile');
            imagePreviewInfo.textContent = image.alt;
            imageItem.appendChild(img);
            imageItem.appendChild(imagePreviewInfo);
            imageGallery.appendChild(imageItem);
        });

        setTimeout(() => {
            modal.close();
            setTimeout(() => {
                progressBar.value = 0;
            }, 1000);
        }, 1500);

        imageNames.forEach(name => uploadedImages.push(name));

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

uploadForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.action, true);

    xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 76;
            progressBar.value = progress;
        }
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Image uploaded successfully');
            const imageFiles = imagesInput.files;
            const imageNames = Array.from(imageFiles).map(file => file.name);
            loadImages(imageNames);

            uploadButton.disabled = true;
        } else {
            console.error('Upload failed:', xhr.statusText);
        }
    };

    xhr.send(formData);
});

imagesInput.addEventListener('change', function () {
    const imageFiles = Array.from(this.files);
    const imageNames = imageFiles.map(file => file.name);
    const allImagesMatch = imageNames.every(name => uploadedImages.includes(name));

    if (!allImagesMatch) {
        uploadButton.disabled = false;
    } else {
        uploadButton.disabled = true;
        alert('Please select only images that have not been uploaded before.');
    }
})