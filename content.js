//once onMessage is invoked, it will active the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showPopup') {
    console.log('Showing popup modal...');

    // This is our css, this is how our popup will look to the user
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

    // This will add our gif to popup/
    const gif = document.createElement('img');
    gif.src = chrome.runtime.getURL('assets/explosion.gif');
    gif.style.width = '200px'; // Only made it 200px wide, we can change that later

    // Here we added a message to our popup
    const messageText = document.createElement('p');
    messageText.textContent =
      "Time's up! You've been on this site for too long!";

    // added a close button to the popup, also added some css
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Append elements to the popup, which makes it all fit
    modal.appendChild(gif);
    modal.appendChild(messageText);
    modal.appendChild(closeButton);

    // Append the popup to the body of the webpage, which adds the popup to the page
    document.body.appendChild(modal);
  }
});

// Immediately start the timer when the content script loads
chrome.runtime.sendMessage({ action: 'startTimer' });
