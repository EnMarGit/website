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


// ----------------------------------------------------------------Language select for wider screens----------------------------------------------------------------

// URLs for each language
const languageUrls = {
    'en': 'about-us.html', // Replace with your actual URL for English
    'bg': 'about-us.html'  // Replace with your actual URL for Bulgarian
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
document.addEventListener('DOMContentLoaded', function() {
    // Flag to track if the chatbox is open or minimized
    let isChatBoxMinimized = true;
    // Flag to track if the initial messages have been loaded
    let isInitialMessagesLoaded = false;

    checkAndClearHistoryIfExpired();
    let userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];

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

            // Reload user history from localStorage
            userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];

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
        localStorage.removeItem('userHistory'); // Clear user history
        localStorage.removeItem('firstMessageTimestamp');

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
        // Show loader
        document.querySelector('.spinner').style.display = 'block';

        fetch('https://single-cistern-378521.ey.r.appspot.com/get_initial_messages')
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

                // Hide loader
                document.querySelector('.spinner').style.display = 'none';

                // Delay the scroll to allow the browser to render the new content
                setTimeout(() => {
                    chatLogs.scrollTop = chatLogs.scrollHeight;
                }, 100);  // Delay of 100 milliseconds
            });
    }

    // Function to handle sending clickable messages
    function sendClickableMessage(message) {
        addMessageToChatLogs("You", message);
        
        var isExternalLink = message === "Answer 12A"; // Check if it's the specific external link
        sendMessageToServer(message, isExternalLink);
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

    function saveFirstMessageTimestamp() {
        const timestamp = new Date().getTime();
        localStorage.setItem('firstMessageTimestamp', timestamp.toString());
    }
    
    function checkAndClearHistoryIfExpired() {
        const firstMessageTimestamp = localStorage.getItem('firstMessageTimestamp');
        if (firstMessageTimestamp) {
            const currentTime = new Date().getTime();
            const hoursElapsed = (currentTime - parseInt(firstMessageTimestamp)) / (1000 * 60 * 60);
            if (hoursElapsed >= 24) {
                localStorage.removeItem('userHistory');
                localStorage.removeItem('firstMessageTimestamp');
            }
        }
    }

    // Function to send message to the server
    function sendMessageToServer(message, isPredefined) {
        console.log("Sending message to server:", message, "Is predefined:", isPredefined);

        // Reset chat if 'Start new chat' is selected
        if (message === "Start new chat") {
            userHistory = []; // Reset user history
            localStorage.removeItem('userHistory'); // Clear user history from storage
            loadInitialMessages(); // Reload initial messages
            return; // Stop further processing
        }

        var threadId = getValidThreadId();
        console.log("Current thread ID:", threadId);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://single-cistern-378521.ey.r.appspot.com/message", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        // Show loader
        document.querySelector('.spinner').style.display = 'block';

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Hide loader
                document.querySelector('.spinner').style.display = 'none';
                
                // Check and set first message timestamp inside the callback
                if (userHistory.length === 0) {
                    saveFirstMessageTimestamp();
                }

                var response = JSON.parse(xhr.responseText);

                if (response.startNewChat) {
                    // Clear chat logs and load initial messages
                    document.querySelector(".chat-logs").innerHTML = '';
                    loadInitialMessages();
                    return; // Stop further processing
                }
        
                console.log("External link:", response.isExternalLink);
                if (response.is_predefined) {
                    // Handle predefined responses and options
                    if (response.responses) {
                        console.log("Response.Responses:", response.responses); // For debugging
                        response.responses.filter(resp => resp.trim() !== "")
                                          .forEach(resp => addMessageToChatLogs("Cyrcl Assistant", resp));
                    }
                    
                    // Handling options for predefined responses
                    if (response.options) {
                        response.options.forEach(function(option) {
                            addClickableMessageToChatLogs(option, response.isExternalLink, response.url);
                        });
                        if (response.isExternalLink) {
                            window.open(response.url, '_blank');
                        }
                        updateUserHistory(message);
                    }
                } else {
                    // Handle single response for non-predefined messages
                    if (response.response.trim() !== "") {
                        addMessageToChatLogs("Cyrcl Assistant", response.response);
                    }
                }
    
                saveThreadId(response.thread_id);
            }
        };

        
        console.log("User history:", userHistory); // For debugging

        // Send the current message along with the history of previous messages
        xhr.send(JSON.stringify({
            message: message,
            thread_id: threadId,
            history: userHistory
        }));
    }

    function updateUserHistory(message) {
        userHistory.push(message);
        localStorage.setItem('userHistory', JSON.stringify(userHistory));
    }    

    function scrollToBottom() {
        var chatLogs = document.querySelector(".chat-logs");
        var userMessages = chatLogs.querySelectorAll(".user-message");
        var lastUserMessage = userMessages[userMessages.length - 1];
    
        if (lastUserMessage) {
            // Scroll to the top of the last user message
            lastUserMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Scroll to the bottom of the chat log
            var chatBoxBody = document.querySelector(".chat-box-body");
            requestAnimationFrame(() => {
                setTimeout(() => {
                    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
                }, 0);
            });
        }
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

        // Use innerHTML to render the HTML tags correctly
        messageDiv.innerHTML = message; 

        chatLogs.appendChild(messageDiv);
        localStorage.setItem('chatLogs', chatLogs.innerHTML);
        scrollToBottom();
    }

    // Function to add clickable message to chat logs
    function addClickableMessageToChatLogs(message, isExternalLink, url) {
        console.log("Adding clickable message:", message);
        var chatLogs = document.querySelector(".chat-logs");
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("clickable-message");
        // Use innerHTML to render the HTML tags correctly
        messageDiv.innerHTML = message; 
        messageDiv.onclick = function() { sendClickableMessage(message); };
        chatLogs.appendChild(messageDiv);
        scrollToBottom();
        // Save the current chat state
        localStorage.setItem('chatLogs', chatLogs.innerHTML);
    }

    // Function to load chat logs from localStorage
    function loadChatLogs() {
        var savedChatLogs = localStorage.getItem('chatLogs');
        if (savedChatLogs) {
            const chatLogs = document.querySelector(".chat-logs");
            chatLogs.innerHTML = savedChatLogs;
            // Reattach onclick handlers for clickable messages
            chatLogs.querySelectorAll('.clickable-message').forEach(msg => {
                msg.onclick = function() { sendClickableMessage(msg.textContent); };
            });
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
});



// ----------------------------------------------------------------Special CTA Button Mid: Scroll Behavious----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.cta-button-mid').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor behavior

        var targetSection = document.getElementById('about-us-section');
        var headerOffset = document.querySelector('.sticky-header').offsetHeight; // Replace '.sticky-header' with your header's class or ID

        if (targetSection) {
            var elementPosition = targetSection.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ----------------------------------------------------------------Cookie Pop-up----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    var cookieConsent = localStorage.getItem('cookieConsent');
    var cookiePopup = document.getElementById('cookieConsentPopup');
    var cookieOptions = document.querySelector('.cookie-options');
    var initialButtons = document.querySelector('.initial-buttons');
    var detailedButtons = document.querySelector('.detailed-buttons');
    var cookieOverlay = document.getElementById('cookieConsentOverlay');

    if (!cookieConsent) {
        cookiePopup.style.transform = "translateY(0)";
        cookieOverlay.style.display = "block";
    }

    function hideConsentPopup() {
        cookiePopup.style.transform = "translateY(100%)";
        cookieOverlay.style.display = "none";
    }

    // Function to set consent
    function setConsent(essential, analytics, advertising) {
        var consentData = {
            essential: essential,
            analytics: analytics,
            advertising: advertising
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        hideConsentPopup();
    }

    // Event listener for the initial "I Accept" button
    document.getElementById('initialAccept').addEventListener('click', function() {
        setConsent(true, true, true);
    });

    // Event listener for the detailed "I Accept" button
    document.getElementById('acceptCookies').addEventListener('click', function() {
        var analyticsConsent = document.getElementById('analyticsCookies').checked;
        var advertisingConsent = document.getElementById('advertisingCookies').checked;
        setConsent(true, analyticsConsent, advertisingConsent);
    });

    // Event listener for the "Accept All" button
    document.getElementById('acceptAllCookies').addEventListener('click', function() {
        setConsent(true, true, true);
    });

    // Event listener for the "Decline" button
    document.getElementById('declineCookies').addEventListener('click', function() {
        setConsent(true, false, false);
    });

    // Event listener for the "Show Purposes" button
    document.getElementById('showPurposes').addEventListener('click', function() {
        initialButtons.style.display = 'none';
        cookieOptions.style.display = 'block';
        detailedButtons.style.display = 'block';
    });
});