document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.gallery-image');
    const totalImages = images.length;
    let loadedImages = 0;
  
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const galleryContainer = document.querySelector('.gallery-container');
    const placedImages = [];
  
  images.forEach(image => {
    // 检测是否为移动端
    const isMobile = window.innerWidth <= 768;
    
    // 移动端使用更小的图片尺寸，桌面端保持原尺寸
    let randomHeightPercentage;
    if (isMobile) {
      // 移动端：图片高度为视口高度的15%-25%（增加密度）
      randomHeightPercentage = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
    } else {
      // 桌面端：保持原来的25%-50%
      randomHeightPercentage = Math.floor(Math.random() * (50 - 25 + 1)) + 25;
    }
    
    const randomHeight = (randomHeightPercentage / 100) * window.innerHeight;
    image.style.height = `${randomHeight}px`;
    image.style.width = 'auto';

    // Attempt to place the image without overlapping
    let attempts = 0;
    let positionFound = false;

    while (attempts < 100 && !positionFound) {
      // 移动端调整空间分布，让图片更密集
      let galleryWidth, galleryHeight;
      if (isMobile) {
        galleryWidth = window.innerWidth * 1.2; // 移动端宽度匹配CSS（120vw）
        galleryHeight = window.innerHeight * 3; // 移动端高度匹配CSS（300vh）
      } else {
        galleryWidth = window.innerWidth * 1.2; // 桌面端匹配CSS（120vw）
        galleryHeight = window.innerHeight * 1.2; // 桌面端匹配CSS（120vh）
      }
      
      const maxWidth = galleryWidth - image.clientWidth;
      const maxHeight = (galleryHeight - 60) - randomHeight; // 减去导航栏高度
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
  
      // Ensure the image load event is attached after setting the src
      image.onload = () => {
        loadedImages++;
        const progress = (loadedImages / totalImages) * 100;
        progressBar.style.width = `${progress}%`;
  
        if (loadedImages === totalImages) {
          loadingScreen.style.display = 'none';
          galleryContainer.style.visibility = 'visible';
        }
      };
  
      image.onerror = () => {
        loadedImages++;
        const progress = (loadedImages / totalImages) * 100;
        progressBar.style.width = `${progress}%`;
  
        if (loadedImages === totalImages) {
          loadingScreen.style.display = 'none';
          galleryContainer.style.visibility = 'visible';
        }
      };
  
      // Set the image src to trigger the loading event
      const src = image.getAttribute('src');
      image.src = src;
  
      // Add click event to toggle the clicked class
      image.addEventListener('click', () => {
        if (image.classList.contains('clicked')) {
          image.classList.remove('clicked');
        } else {
          images.forEach(img => img.classList.remove('clicked')); // Remove 'clicked' class from all images
          image.classList.add('clicked');
        }
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
  