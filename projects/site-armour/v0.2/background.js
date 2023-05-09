
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "fetchStatus") {
      const apiUrl = `https://site-arm-be.kirbyware.io/status/${request.url}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sendResponse(data);
            })
        .catch(error => console.error(error));
      return true; // to indicate that the response will be sent asynchronously
    }
  });