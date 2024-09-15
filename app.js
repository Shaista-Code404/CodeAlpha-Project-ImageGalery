document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('close-lightbox');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const zoomBtn = document.getElementById('zoom');
  const downloadBtn = document.getElementById('download');
  
  let currentIndex = 0;
  let isZoomed = false;
  
  // Open lightbox
  galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
          currentIndex = index;
          showLightbox(item.dataset.src, item.dataset.caption);
      });
  });
  
  function showLightbox(src, caption) {
console.log(`showing lightbox with src: ${src} and caption:${caption}`);
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightbox.style.display = 'flex';
      downloadBtn.href = src; // Update download button link
      isZoomed = false; // Reset zoom state
      lightboxImg.style.transform = 'scale(1)'; // Reset zoom on open
  }
  
  // Close lightbox
  closeLightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
  });
  
  // Previous image
  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      const prevItem = galleryItems[currentIndex];
      showLightbox(prevItem.dataset.src, prevItem.dataset.caption);
  });
  
  // Next image
  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      const nextItem = galleryItems[currentIndex];
      showLightbox(nextItem.dataset.src, nextItem.dataset.caption);
  });
  
  // Zoom image
  zoomBtn.addEventListener('click', () => {
      isZoomed = !isZoomed;
      lightboxImg.style.transform = isZoomed ? 'scale(2)' : 'scale(1)';
  });
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
          lightbox.style.display = 'none';
      }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
          if (e.key === 'ArrowLeft') {
              prevBtn.click();
          } else if (e.key === 'ArrowRight') {
              nextBtn.click();
          } else if (e.key === 'Escape') {
              closeLightbox.click();
          } else if (e.key === 'z') {
              zoomBtn.click();
          }
      }
  });
});