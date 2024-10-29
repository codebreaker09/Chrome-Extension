//This is what will listen for alarms, it will also deal with them when triggered
chrome.alarms.onAlarm.addListener((alarm) => {
  //this is going to log our alarm was triggered if it's called breakTimer
  if (alarm.name === 'breakTimer') {
    console.log('Alarm triggered: breakTimer');

    //this will look for our gif and then stores it in iconURL
    const iconUrl = chrome.runtime.getURL('assets/explosion.gif');
    console.log('Using icon URL:', iconUrl);

    // This creates our notification with an image, title and message.
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
        //if it doesn't find the tab it will give us this error
        console.error('No active tab found.');
      }
    });
  }
});

//This
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    console.log('Starting break timer for 1 hour...');
    chrome.alarms.create('breakTimer', { delayInMinutes: 1 });
  }
});
