// Define your media query
const mediaQuery = window.matchMedia('(max-width: 992px)');

// Define the event listener function
function handleWidthChange(e) {
    if (e.matches) {
        // If the screen width is less than or equal to 992px
        console.log('Screen width is less than or equal to 992px');
        // Your code to handle the smaller screen width
    } else {
        // If the screen width is greater than 992px
        console.log('Screen width is greater than 992px');
        // Your code to handle the larger screen width
    }
}

// Add the event listener
mediaQuery.addEventListener('change', handleWidthChange);

// Initial check
handleWidthChange(mediaQuery);


function handleResize() {
    const jellyfishDiv = document.getElementById('p5-Jellyfish');
    const butterflyDiv = document.getElementById('p5-ButterflyMobile');
    if (window.innerWidth < 992) {
        jellyfishDiv.style.display = 'none';
        butterflyDiv.style.display = 'block';
        // Initialize butterfly sketch if not already initialized
        if (!butterflyDiv.dataset.initialized) {
            new p5(butterflySketch, 'p5-ButterflyMobile');
            butterflyDiv.dataset.initialized = true;
        }
    } else {
        jellyfishDiv.style.display = 'block';
        butterflyDiv.style.display = 'none';
        // Initialize jellyfish sketch if not already initialized
        if (!jellyfishDiv.dataset.initialized) {
            new p5(jellyfishSketch, 'p5-Jellyfish');
            jellyfishDiv.dataset.initialized = true;
        }
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

handleResize(); // Initial call