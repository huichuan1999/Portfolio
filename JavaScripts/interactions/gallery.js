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
      // 移动端：图片高度为视口高度的8%-16%
      randomHeightPercentage = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    } else {
      // 桌面端：保持原来的16%-32%
      randomHeightPercentage = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
    }
    
    const randomHeight = (randomHeightPercentage / 100) * window.innerHeight;
    image.style.height = `${randomHeight}px`;
    image.style.width = 'auto';

    // Attempt to place the image without overlapping
    let attempts = 0;
    let positionFound = false;

    while (attempts < 100 && !positionFound) {
      // 移动端增加更多的高度空间
      let galleryWidth, galleryHeight;
      if (isMobile) {
        galleryWidth = window.innerWidth * 1.5; // 移动端宽度稍微增加
        galleryHeight = window.innerHeight * 6; // 移动端高度大幅增加（6倍）
      } else {
        galleryWidth = window.innerWidth * 2; // 桌面端保持2倍宽度
        galleryHeight = window.innerHeight * 3; // 桌面端保持3倍高度
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
