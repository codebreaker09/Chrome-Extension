chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'breakTimer') {
    console.log('Alarm triggered: breakTimer');

    const iconUrl = chrome.runtime.getURL('assets/explosion.gif');
    console.log('Using icon URL:', iconUrl);

    // Create a notification
    chrome.notifications.create(
      {
        type: 'basic',
        iconUrl: iconUrl,
        title: "Fun time's Over!",
        message:
          "You've been on this site for over an hour, time to be productive!",
      },
      (notificationId) => {
        console.log('Notification attempt made');
        if (chrome.runtime.lastError) {
          console.error(
            'Notification Error:',
            chrome.runtime.lastError.message
          );
        } else {
          console.log('Notification shown with ID:', notificationId);
        }
      }
    );

    // Send a message to the active tab to display the popup
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showPopup' });
      } else {
        console.error('No active tab found.');
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    console.log('Starting break timer for 1 minute...');
    chrome.alarms.create('breakTimer', { delayInMinutes: 1 });
  }
});
