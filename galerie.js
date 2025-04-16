document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');
    const gridImages = document.querySelectorAll('.photo-grid-item img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;

    function showImage(index) {
        currentImageIndex = index;
        modalImg.src = gridImages[index].src;
        document.getElementById('counter').textContent = `${index + 1} / ${gridImages.length}`;
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % gridImages.length;
        showImage(currentImageIndex);
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + gridImages.length) % gridImages.length;
        showImage(currentImageIndex);
    }

    gridImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.add('active');
            currentImageIndex = index;
            showImage(index);
        });
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.classList.remove('active');
    });

    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNext();
    });

    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') modal.classList.remove('active');
        }
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});