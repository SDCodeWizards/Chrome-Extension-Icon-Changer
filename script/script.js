async function moveToFirstPosition() {
  try {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (currentTab) {
      await chrome.tabs.move(currentTab.id, { index: 0 });
      console.log("Tab moved to the first position.");
    }
  } catch (error) {
    if (error.message === "Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(moveToFirstPosition, 50);
    } else {
      console.error(error);
    }
  }
}

function grabFavIcons() {
  const faviconElement = document.querySelector("link[rel*='icon']");
  if (faviconElement) {
    const favicon = faviconElement.href;
    console.log('Current tab favicon:', favicon);
  } else {
    console.log('Favicon element not found on this page.');
  }
}

// contentScript.js

function changeFavicon(newFaviconUrl) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = newFaviconUrl;

  // Replace the current favicon
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Call the function with the URL of your new favicon
const newFaviconUrl = 'http://www.google.com/favicon.ico';
// changeTabFavicon(newFaviconUrl);

document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("b2");
  button.addEventListener("click", function() {
    // moveToFirstPosition();
    changeFavicon(newFaviconUrl);
  });
});
