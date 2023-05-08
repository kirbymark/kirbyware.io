# Automatically load red border

To create a Chrome extension that inserts a new 10-pixel red border around a webpage automatically once the page has loaded, you can use the following steps:

1. Create a new directory for your extension and create a manifest file named `manifest.json` in the directory with the following content:

```
{
  "name": "Page Border",
  "version": "1.0",
  "manifest_version": 3,
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

This manifest file specifies the name and version of your extension, the manifest version, and a content script that will be injected into all URLs.

2. Create a JavaScript file named `content.js` in the same directory as your manifest file with the following content:

```javascript
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

window.addEventListener("load", addBorder);
```

This JavaScript code defines a function named `addBorder` that adds a new `div` element with a red 10-pixel border to the `body` element of the current webpage. It then attaches an event listener to the `window` object that calls the `addBorder` function once the page has loaded.

3. Load your extension into Chrome by navigating to `chrome://extensions/`, enabling "Developer mode", clicking "Load unpacked", and selecting the directory containing your extension files.

Once your extension is loaded, it will automatically insert a red 10-pixel border around any webpage that you visit.