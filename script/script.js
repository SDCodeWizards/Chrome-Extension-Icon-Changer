// Runs imidiately when you runs
document.addEventListener("DOMContentLoaded", function() {
    // Get the active tab's favicon
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      var tabFavicon = tab.favIconUrl;
      
      // Create an image element to display the favicon
      var faviconImage = document.createElement("img");
      faviconImage.src = tabFavicon;
      
      // Append the image to the popup's body
      document.body.appendChild(faviconImage);
    });
  });


//ERROR: Cannot read properties of null.

// Buttons if clicked.
document.getElementById("myButton").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      var tabUrl = tab.url;
      // Do something with the tabUrl
      console.log(tab)
      console.log(tabUrl)
    });
  });