uploadModal_modalContent.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadModal_modalContent.classList.remove('active');
    uploadModal_modalContent.classList.remove('fade-out');
    uploadModal_plusSign.style.opacity = '0';
    uploadModal_modalContent.style.border = "none";
    uploadModal_CloseBtn.style.display = 'block';
    uploadModal_modalContent.style.animation = 'none';
    uploadModal_browseBtns.forEach(element => {
        element.style.color = '';
    });
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(element => {
        element.style.color = '';
    });

    // Ensure files are present in the dropped data
    const files = e.dataTransfer.files;

    if (files.length > 0) {
        const filesToAdd = Array.from(files).slice(0, 5); // Only take the first 5 files
        const dataTransfer = new DataTransfer();
        filesToAdd.forEach(file => {
            dataTransfer.items.add(file);
        });
        uploadModal_fileInput.files = dataTransfer.files;
        handleFiles(filesToAdd);
    }
});