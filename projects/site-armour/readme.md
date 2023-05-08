# Initial version of Chrome Extension to help with site quality

Want to change to this

To modify the above extension to use the current website URL to request a status flag from a backend service and add a border only if the request returns a flag of true, you can modify the `content.js` file to send an HTTP request to the backend API with the current website URL. The backend API can then check the status of the current website and send a response back to the content script with a flag indicating whether a border should be added or not.

Here's an example of how you can modify the `content.js` file:

```javascript
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const url = new URL(tabs[0].url);
  const hostname = url.hostname;
  fetch(`http://localhost/check-status?site=${hostname}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "true") {
        addBorder();
      }
    })
    .catch(error => console.log(error));
});

function addBorder() {
  const body = document.getElementsByTagName("body")[0];
  const newBorder = document.createElement("div");
  newBorder.style.border = "10px solid red";
  newBorder.style.boxSizing = "border-box";
  newBorder.style.width = "100%";
  newBorder.style.height = "100%";
  newBorder.style.position = "absolute";
  newBorder.style.top = "0";
  newBorder.style.left = "0";
  newBorder.style.zIndex = "9999";
  body.appendChild(newBorder);
}
```

This code uses the `chrome.tabs.query` function to get the current active tab in the current window, and then extracts the hostname from the URL of the tab. It then sends an HTTP request to `http://localhost/check-status` with the hostname as a query parameter. When the HTTP request completes, the content script checks if the `status` property in the response is equal to `"true"`, and if so, calls the `addBorder` function to add a red 10-pixel border around the webpage.

Here's an example of how you can modify the `background.js` file to handle the `check-status` request:

```javascript
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "checkStatus") {
    const site = request.site;
    fetch(`http://localhost/check-status?site=${site}`)
      .then(response => response.json())
      .then(data => {
        sendResponse(data);
      })
      .catch(error => console.log(error));
  }
  return true;
});
```

This code listens for the `checkStatus` message and sends an HTTP request to `http://localhost/check-status` with the `site` parameter as a query parameter. When the HTTP request completes, the background script sends a response back to the content script with the status flag as a JSON object.

With these modifications, your Chrome extension will now use the current website URL to request a status flag from a backend service, and add a red 10-pixel border around the webpage if the flag is equal to `"true"`.