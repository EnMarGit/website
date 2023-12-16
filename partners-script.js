console.log("Script is running");



// ----------------------------------------------------------------Hide sticky ellipse when it reaches the footer----------------------------------------------------------------

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

// ----------------------------------------------------------------Hamburger menu----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    var hamburgerMenu = document.getElementById('hamburger-menu');
    var fullscreenMenu = document.getElementById('fullscreen-menu');
    var stickyCircle = document.querySelector('.sticky-circle');
    var navTexts = document.querySelectorAll('.fullscreen-nav h3');
    var body = document.body; // Get the body element

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
                body.classList.remove('body-no-scroll'); // Enable scrolling on body
            }, 500); // Duration of the slide-up animation
        } else {
            // Open the menu
            fullscreenMenu.style.display = 'flex';
            fullscreenMenu.classList.add('active');
            stickyCircle.classList.toggle('sticky-circle-menu-open');
            body.classList.add('body-no-scroll'); // Disable scrolling on body

            // Animate navigation texts
            navTexts.forEach((text, index) => {
                text.style.animationName = 'slideInFromRight';
                text.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
});

// ----------------------------------------------------------------Set top position of menu based on header height----------------------------------------------------------------

function adjustFullscreenMenuPosition() {
    var header = document.querySelector('header'); // Replace with your header's selector
    var fullscreenMenu = document.getElementById('fullscreen-menu');

    if (header && fullscreenMenu) {
        var headerHeight = header.offsetHeight; // Get the current height of the header
        fullscreenMenu.style.top = headerHeight + 'px'; // Set the top position of the menu
        fullscreenMenu.style.height = `calc(100% - ${headerHeight}px)`; // Adjust the height of the menu
    }
}

// Call the function initially and on window resize
adjustFullscreenMenuPosition();
window.addEventListener('resize', adjustFullscreenMenuPosition);

// ----------------------------------------------------------------Loader----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");

    // Show the loader
    loader.style.display = "block";

    // Hide the loader once the page has fully loaded
    window.addEventListener("load", function() {
        loader.style.display = "none";
    });
});

// ----------------------------------------------------------------Language select for wider screens----------------------------------------------------------------

// URLs for each language
const languageUrls = {
    'en': 'partners.html', // Replace with your actual URL for English
    'bg': 'partners.html'  // Replace with your actual URL for Bulgarian
};

// Function to toggle the custom dropdown
function toggleDropdown() {
    var dropdownOptions = document.querySelector('.custom-dropdown-content');
    var currentSelection = document.getElementById('currentSelection');
    var dropdownArrow = document.querySelector('.dropdown-arrow');

    // Toggle the dropdown
    dropdownOptions.style.transform = dropdownOptions.style.transform === 'scaleY(1)' ? 'scaleY(0)' : 'scaleY(1)';

    // Toggle active class for current selection and arrow
    currentSelection.classList.toggle('active');
    dropdownArrow.classList.toggle('active');
}

// Event listener for the dropdown wrapper
document.querySelector('.dropdown-wrapper').addEventListener('click', function() {
    toggleDropdown();
});

// Event listeners for each dropdown item
document.querySelectorAll('.custom-dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        // Update the select value and the displayed text
        var selectedValue = this.getAttribute('data-value');
        document.getElementById('country-select').value = selectedValue;
        document.getElementById('currentSelection').textContent = this.textContent;
        toggleDropdown(); // This will also remove the active class

        // Redirect to the corresponding language URL
        if (languageUrls[selectedValue]) {
            window.location.href = languageUrls[selectedValue];
        }
    });
});
