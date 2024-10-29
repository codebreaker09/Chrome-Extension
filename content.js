chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showPopup') {
    console.log('Showing popup modal...');

    // Create a modal element
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.style.textAlign = 'center';

    // Add the GIF to the modal
    const gif = document.createElement('img');
    gif.src = chrome.runtime.getURL('assets/explosion.gif');
    gif.style.width = '200px'; // Adjust as needed

    // Add a message to the modal
    const messageText = document.createElement('p');
    messageText.textContent =
      "Time's up! You've been on this site for too long!";

    // Add a close button to the modal
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Append elements to the modal
    modal.appendChild(gif);
    modal.appendChild(messageText);
    modal.appendChild(closeButton);

    // Append the modal to the body of the webpage
    document.body.appendChild(modal);
  }
});

// Immediately start the timer when the content script loads
chrome.runtime.sendMessage({ action: 'startTimer' });
