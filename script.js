console.log("Script is running");
document.addEventListener('DOMContentLoaded', function() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');

    let startX = 0;  // Starting X position when touch starts
    let distanceX = 0;  // Distance moved in X direction
    const swipeThreshold = 50;  // Minimum distance in X direction to detect a swipe

    // Adding event listeners for swipe detection on content slides
    document.querySelector('#how-it-works .content-wrapper').addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    document.querySelector('#how-it-works .content-wrapper').addEventListener('touchmove', function(e) {
        distanceX = e.touches[0].clientX - startX;
    });

    document.querySelector('#how-it-works .content-wrapper').addEventListener('touchend', function() {
        if (distanceX > swipeThreshold) {
            // Detected a swipe to the right
            leftArrow.click();
        } else if (distanceX < -swipeThreshold) {
            // Detected a swipe to the left
            rightArrow.click();
        }
    });
});


// How it Works Section Logic

// Define the content for the "How it works" section

const contentSlide = document.querySelector("#how-it-works .content-slide");

const howItWorksContent = [
    {
        text: {
            heading: "1. Find and book",
            body: [
                "Open the map in the app, find a nearby bike, then book it.",
                "No rush! You have some time available to get to your new favorite ride."
            ]
        },
        image: "image4.svg"
    },
    {
        text: {
            heading: "2. Unlock",
            body: [
                "Scan the QR code.",
                "Press the unlock button in the app."
            ]
        },
        image: "image5.svg"
    },
    {
        text: {
            heading: "3. Enjoy the ride",
            body: [
                "Ride your bike anywhere in Sofia",
                "Don’t forget that you can pause your rental session for example, to enter a store. Meanwhile, no one else would be allowed to rent your bike."
            ]
        },
        image: "image6.svg"
    },
    {
        text: {
            heading: "4. Park and lock",
            body: [
                "Park in the zone outlined on the map. You can find it on the app.",
                "Lock manually using the smart lock above the rear tire.",
                "Now end your rental session by pressing the button in the app."
            ]
        },
        image: "image7.svg"
    }
];

// Add bullet points
howItWorksContent.forEach(section => {
    section.text.body = section.text.body.map(bodyText => `• ${bodyText}`);
});

console.log(howItWorksContent);

let currentIndex = 0;


// Function to update the navigation dots' active state based on the current index
function updateNavigationDots() {
    const navigationDots = document.querySelectorAll(".navigation-indicators .dot");
    navigationDots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Modified updateContent function to also update the navigation dots
function updateContent() {
    const contentSlide = document.querySelector("#how-it-works .content-slide");
    const textContent = contentSlide.querySelector(".text-content");
    const imageContent = contentSlide.querySelector(".image-content img");

    textContent.innerHTML = `
        <h3>${howItWorksContent[currentIndex].text.heading}</h3>
        ${howItWorksContent[currentIndex].text.body.map(text => `<p>${text}</p>`).join('')}
    `;
    imageContent.src = howItWorksContent[currentIndex].image;

    contentSlide.style.display = 'flex';
    contentSlide.style.opacity = 0;
    setTimeout(() => contentSlide.style.opacity = 1, 50);
    
    // Update the navigation dots' active state
    updateNavigationDots();
}

// Attach event listeners to the arrows
document.querySelector("#how-it-works .left-arrow").addEventListener("click", function() {
    if (currentIndex > 0) {
        currentIndex--;
        updateContent();
    }
});

document.querySelector("#how-it-works .right-arrow").addEventListener("click", function() {
    if (currentIndex < howItWorksContent.length - 1) {
        currentIndex++;
        updateContent();
    }
});

// Show the first content by default
updateContent();

// Create navigation dots based on the number of steps
const navigationContainer = document.createElement('div');
navigationContainer.className = 'navigation-indicators';
howItWorksContent.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = index === currentIndex ? 'dot active' : 'dot';
    navigationContainer.appendChild(dot);
});
contentSlide.appendChild(navigationContainer);

// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select the sticky ellipse and footer elements
    const stickyEllipse = document.querySelector('.sticky-ellipse');
    const footer = document.querySelector('footer');

    // Add a scroll event listener to the window object
    window.addEventListener('scroll', function() {
        // Get the position and size of the footer and the sticky ellipse
        const footerRect = footer.getBoundingClientRect();
        const ellipseRect = stickyEllipse.getBoundingClientRect();

        // Check if the bottom of the ellipse is lower than the top of the footer
        if (ellipseRect.bottom > footerRect.top) {
            // If the ellipse overlaps with the footer, add a class to hide it
            // This class should be defined in CSS with appropriate styles for hiding
            stickyEllipse.classList.add('sticky-ellipse-hidden');
        } else {
            // If the ellipse is not overlapping with the footer, remove the hiding class
            // This makes the ellipse visible again when the user scrolls away from the footer
            stickyEllipse.classList.remove('sticky-ellipse-hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var hamburgerMenu = document.getElementById('hamburger-menu');
    var fullscreenMenu = document.getElementById('fullscreen-menu');
    var stickyCircle = document.querySelector('.sticky-circle');
    var navTexts = document.querySelectorAll('.fullscreen-nav h3');

    hamburgerMenu.addEventListener('click', function() {
        if (fullscreenMenu.classList.contains('active')) {
            // Start closing animations
            fullscreenMenu.classList.add('closing');
            navTexts.forEach(text => {
                text.style.animationName = 'slideOutToRight';
            });

            // Wait for animations to complete before hiding menu
            setTimeout(() => {
                fullscreenMenu.style.display = 'none';
                fullscreenMenu.classList.remove('active', 'closing');
            }, 500); // Duration of the slide-up animation
        } else {
            // Open the menu
            fullscreenMenu.style.display = 'flex';
            fullscreenMenu.classList.add('active');
            stickyCircle.classList.toggle('sticky-circle-menu-open');

            // Animate navigation texts
            navTexts.forEach((text, index) => {
                text.style.animationName = 'slideInFromRight';
                text.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
});


