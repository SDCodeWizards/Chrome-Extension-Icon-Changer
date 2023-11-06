// chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition() {
  try {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (currentTab) {
      await chrome.tabs.move(currentTab.id, { index: 0 });
      console.log("Success.");
    }
  } catch (error) {
    if (error.message === "Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(moveToFirstPosition, 50);
    } else {
      console.error(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("b2");
  button.addEventListener("click", function() {
    moveToFirstPosition();
  });
});
