// Import the sketch functions
import { butterflySketch } from '../butterflySketchMobile.js';
import { jellyfishSketch } from '../jellyfishSketch.js';

// Global variables to store p5 instances
let butterflyInstance = null;
let jellyfishInstance = null;

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
    
    // Ensure both divs exist
    if (!jellyfishDiv || !butterflyDiv) {
        console.error('Required divs not found');
        return;
    }
    
    if (window.innerWidth < 992) {
        // Mobile view - show butterfly, hide jellyfish
        jellyfishDiv.style.display = 'none';
        butterflyDiv.style.display = 'block';
        
        // Remove jellyfish instance if it exists
        if (jellyfishInstance) {
            jellyfishInstance.remove();
            jellyfishInstance = null;
        }
        
        // Initialize butterfly sketch if not already initialized
        if (!butterflyInstance) {
            try {
                butterflyInstance = new p5(butterflySketch, 'p5-ButterflyMobile');
            } catch (error) {
                console.error('Error initializing butterfly sketch:', error);
            }
        }
    } else {
        // Desktop view - show jellyfish, hide butterfly
        jellyfishDiv.style.display = 'block';
        butterflyDiv.style.display = 'none';
        
        // Remove butterfly instance if it exists
        if (butterflyInstance) {
            butterflyInstance.remove();
            butterflyInstance = null;
        }
        
        // Initialize jellyfish sketch if not already initialized
        if (!jellyfishInstance) {
            try {
                jellyfishInstance = new p5(jellyfishSketch, 'p5-Jellyfish');
            } catch (error) {
                console.error('Error initializing jellyfish sketch:', error);
            }
        }
    }
}

// Wait for DOM to be fully loaded before setting up event listeners
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', handleResize);
    
    // Initial call after a short delay to ensure everything is loaded
    setTimeout(handleResize, 100);
});

// Also call handleResize on window load
window.addEventListener('load', handleResize);

// Call handleResize immediately for immediate execution
setTimeout(handleResize, 0);