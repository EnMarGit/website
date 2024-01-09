console.log("Script is running");

// ----------------------------------------------------------------How it works section with navigation, carrousel swipe, arrows----------------------------------------------------------------

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
        image: "Images/image4.svg"
    },
    {
        text: {
            heading: "2. Unlock",
            body: [
                "Scan the QR code.",
                "Press the unlock button in the app."
            ]
        },
        image: "Images/image5.svg"
    },
    {
        text: {
            heading: "3. Enjoy the ride",
            body: [
                "Ride your bike anywhere in Sofia",
                "Don’t forget that you can pause your rental session for example, to enter a store. Meanwhile, no one else would be allowed to rent your bike."
            ]
        },
        image: "Images/image6.svg"
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
        image: "Images/image7.svg"
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
    'en': 'how-it-works.html', // Replace with your actual URL for English
    'bg': 'how-it-works.html'  // Replace with your actual URL for Bulgarian
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

// ----------------------------------------------------------------Chatbox----------------------------------------------------------------
// Flag to track if the chatbox is open or minimized
let isChatBoxMinimized = true;
// Flag to track if the initial messages have been loaded
let isInitialMessagesLoaded = false;

// Toggling and minimizing the chat box on sticky circle click
document.querySelector(".sticky-circle").addEventListener("click", function() {
    var chatBox = document.querySelector(".chat-box");
    var chatLogs = document.querySelector(".chat-logs");
    var chatCloseConfirmation = document.querySelector(".chat-close-confirmation");

    isChatBoxMinimized = !isChatBoxMinimized;
    
    if (isChatBoxMinimized) {
        // When minimizing the chatbox, remove the 'active' class
        chatBox.classList.remove('active');
    } else {
        // When opening the chatbox, add the 'active' class and load messages
        chatBox.classList.add('active');

        var savedChatLogs = localStorage.getItem('chatLogs');
        if (!savedChatLogs && !isInitialMessagesLoaded) {
            loadInitialMessages();
            isInitialMessagesLoaded = true;
        } else {
            loadChatLogs(); // Load saved chat logs if available
        }

        chatLogs.scrollTop = chatLogs.scrollHeight;
        chatCloseConfirmation.style.display = 'none';
    }
});

// Minimizing the chat box (now just triggers the sticky-circle click event)
document.querySelector(".chat-box-minimize").addEventListener("click", function() {
    document.querySelector(".sticky-circle").click();
});

// Modify the existing event listener for the close button
document.querySelector(".chat-box-toggle").addEventListener("click", function() {
    document.querySelector(".chat-close-confirmation").style.display = 'block';
});

// Close Chat Confirmation
document.querySelector(".chat-close-confirm").addEventListener("click", function() {
    var chatBox = document.querySelector(".chat-box");
    var chatCloseConfirmation = document.querySelector(".chat-close-confirmation");

    // Start the closing transition
    chatBox.classList.remove('active');
    localStorage.removeItem('threadData'); // Clear thread data

    // Wait for the transition to finish before completely hiding the chatbox
    setTimeout(() => {
        chatCloseConfirmation.style.display = 'none';
        document.querySelector(".chat-logs").innerHTML = '';  // Clear chat logs
        isInitialMessagesLoaded = false;
        isChatBoxMinimized = true;
        localStorage.removeItem('chatLogs');
    }, 500); // The timeout should match the transition duration in your CSS
});

// Return to Chat
document.querySelector(".chat-return-chat").addEventListener("click", function() {
    document.querySelector(".chat-close-confirmation").style.display = 'none';
});

// Sending the message and receiving the response
document.getElementById("send-btn").addEventListener("click", function() {
    var userInput = document.getElementById("chat-input").value;
    if (userInput.trim() === '') {
        alert("Please enter a message.");
        return;
    }

    // Clear input box and handle message
    document.getElementById("chat-input").value = "";
    addMessageToChatLogs("You", userInput);
    sendMessageToServer(userInput);
});

// Function to load initial messages
function loadInitialMessages() {
    fetch('http://127.0.0.1:5000/get_initial_messages')
        .then(response => response.json())
        .then(messages => {
            const chatLogs = document.querySelector(".chat-logs");
            chatLogs.innerHTML = '';  // Clear existing messages

            messages.forEach(msg => {
                var messageDiv = document.createElement("div");

                if (typeof msg === 'object' && msg.clickable) {
                    // Make the entire div clickable
                    messageDiv.classList.add("clickable-message");  // Entire div is a clickable message
                    messageDiv.textContent = msg.text;
                    messageDiv.onclick = function() { sendClickableMessage(msg.text); };
                } else {
                    // Display regular message
                    messageDiv.classList.add("bot-message");  // Regular bot message
                    messageDiv.textContent = msg;
                }

                chatLogs.appendChild(messageDiv);
            });

            // Delay the scroll to allow the browser to render the new content
            setTimeout(() => {
                chatLogs.scrollTop = chatLogs.scrollHeight;
            }, 100); // Delay of 100 milliseconds
        });
}

// Function to handle sending clickable messages
function sendClickableMessage(message) {
    addMessageToChatLogs("You", message);
    sendMessageToServer(message);
}

// Function to save the thread ID with the current timestamp
function saveThreadId(threadId) {
    const data = {
        threadId: threadId,
        timestamp: new Date().getTime()
    };
    localStorage.setItem('threadData', JSON.stringify(data));
}

// Function to get a valid thread ID or null if it's expired or not found
function getValidThreadId() {
    const data = JSON.parse(localStorage.getItem('threadData'));
    if (data && data.threadId) {
        const timeElapsed = (new Date().getTime() - data.timestamp) / (1000 * 60 * 60); // Time elapsed in hours
        if (timeElapsed < 24) { // Check if less than 24 hours have passed
            return data.threadId;
        }
    }
    return null;
}

// Function to send message to the server
function sendMessageToServer(message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/message", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            addMessageToChatLogs("Cyrcl Assitant", response.response);
            // Save the thread ID to localStorage
            saveThreadId(response.thread_id);
        }
    };

    var threadId = getValidThreadId();  // Get the thread ID from localStorage
    xhr.send(JSON.stringify({ message: message, thread_id: threadId }));
}

function scrollToBottom() {
    var chatBoxBody = document.querySelector(".chat-box-body"); // Adjust the selector as needed
    requestAnimationFrame(() => {
        setTimeout(() => {
            chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
        }, 0);
    });
}

// Function to add message to chat logs
function addMessageToChatLogs(sender, message) {
    var chatLogs = document.querySelector(".chat-logs");
    var messageDiv = document.createElement("div");

    if (sender === "You") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.textContent = message;
    chatLogs.appendChild(messageDiv);
    localStorage.setItem('chatLogs', chatLogs.innerHTML);
    scrollToBottom();
}

// Function to load chat logs from localStorage
function loadChatLogs() {
    var savedChatLogs = localStorage.getItem('chatLogs');
    if (savedChatLogs) {
        const chatLogs = document.querySelector(".chat-logs");
        chatLogs.innerHTML = savedChatLogs;
        scrollToBottom();
    }
}

// Get the input field
var input = document.getElementById("chat-input");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keypress", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("send-btn").click();
    }
});
