/** Moves the current tab to the front of the tabs */
async function moveToFirstPosition() {
    try {
      // Use the chrome.tabs.query method to get information about the currently active tab in the current window.
      const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if a valid tab is obtained.
      if (currentTab) {
        // Get the tab's favicon URL.
        const faviconUrl = currentTab.favIconUrl;
        // Move the current tab to the first position (index 0) in the tab order.
        await chrome.tabs.move(currentTab.id, { index: 0 });
        console.log("Success: Tab moved to the first position.");
        return faviconUrl;
      }
    } catch (error) {
      // Handle potential errors that may occur during tab manipulation.
      if (error.message === "Tabs cannot be edited right now (user may be dragging a tab).") {
        // If the error message indicates that tabs cannot be edited at the moment, retry the operation after a short delay.
        setTimeout(moveToFirstPosition, 50);
      } else {
        // Log any other unexpected errors.
        console.error(error);
      }
    }
  }
  
  /** When the button is clicked. move the tab forward. */
  document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("b2");
    const faviconImage = document.getElementById("faviconImage");
  
    button.addEventListener("click", async function() {
      try {
        const faviconUrl = await moveToFirstPosition();
        if (faviconUrl) {
          faviconImage.src = faviconUrl;
          console.log(faviconUrl);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
  