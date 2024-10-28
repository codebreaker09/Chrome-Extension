chrome.runtime.onInstalled.addListener(() => {
  // timer function here
  console.log('Timer added');
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'breakTimer') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '/assets/Explosion.gif',
      title: "Fun time's Over!",
      message:
        "You've been on this site for over an hour, time to be productive!",
    });
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    await chrome.alarms.create('breakTimer', { delayInMinutes: 1 });
    console.log('Start 1-hour break');
  }
});
