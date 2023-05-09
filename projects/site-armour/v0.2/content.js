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
    newBorder.style.zIndex = "9999999";
    body.appendChild(newBorder);

    const currentUrl = window.location.href;
    console.log('Current URL: ' + currentUrl); 
    chrome.runtime.sendMessage({ type: "fetchStatus", url: currentUrl }, function(
      response
    ) {
      if (response && response.status === "up") {
        console.log("Backend is up!");
      } else {
        console.log("Backend is down!");
      }
    });
  
    let visible = true;
    setInterval(() => {
      newBorder.style.display = visible ? "none" : "block";
      visible = !visible;
    }, 100); 
  }
  
  window.addEventListener("load", addBorder);