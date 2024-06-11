document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.gallery-image');
    const placedImages = [];
  
    images.forEach(image => {
      // Set random width between 100 and 400 pixels
      const randomWidth = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
      image.style.width = `${randomWidth}px`;
      image.style.height = 'auto';
  
      // Attempt to place the image without overlapping
      let attempts = 0;
      let positionFound = false;
  
      while (attempts < 100 && !positionFound) {
        const maxWidth = window.innerWidth * 2 - randomWidth; // Gallery is twice the viewport width
        const maxHeight = (window.innerHeight * 2 - 60) - image.naturalHeight * (randomWidth / image.naturalWidth); // Gallery is twice the viewport height, minus nav bar
        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight) + 60; // 60 is the height of the nav bar
  
        image.style.left = `${randomX}px`;
        image.style.top = `${randomY}px`;
  
        // Check for overlap
        positionFound = !placedImages.some(placedImage => {
          return !(randomX + image.clientWidth < placedImage.x ||
                   randomX > placedImage.x + placedImage.width ||
                   randomY + image.clientHeight < placedImage.y ||
                   randomY > placedImage.y + placedImage.height);
        });
  
        attempts++;
      }
  
      placedImages.push({
        x: parseInt(image.style.left, 10),
        y: parseInt(image.style.top, 10),
        width: image.clientWidth,
        height: image.clientHeight
      });
    });
  });
  
  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;
  
  const galleryContainer = document.querySelector('.gallery-container');
  
  galleryContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - galleryContainer.offsetLeft;
    startY = e.pageY - galleryContainer.offsetTop;
    scrollLeft = galleryContainer.scrollLeft;
    scrollTop = galleryContainer.scrollTop;
  });
  
  galleryContainer.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  galleryContainer.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  galleryContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryContainer.offsetLeft;
    const y = e.pageY - galleryContainer.offsetTop;
    const walkX = (x - startX); // Adjust drag speed
    const walkY = (y - startY); // Adjust drag speed
    galleryContainer.scrollLeft = scrollLeft - walkX;
    galleryContainer.scrollTop = scrollTop - walkY;
  });
  