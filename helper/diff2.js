        uploadModal_modalContent.addEventListener('dragleave', () => {
            uploadModal_modalContent.classList.remove('active');
            uploadModal_modalContent.classList.remove('fade-out');
            uploadModal_plusSign.style.opacity = '0';
            uploadModal_modalContent.style.border = "none";
            uploadModal_CloseBtn.style.display = 'block';
            uploadModal_modalContent.style.animation = 'none';
            uploadModal_browseBtns.forEach(element => {
                element.style.color = '';
            });
            // const removeBtns = document.querySelectorAll('.remove-btn');
            uploadModal_removeBtns.forEach(element => {
                element.style.color = '';
            });
        });