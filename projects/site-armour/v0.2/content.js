// Add a style block to the head of the HTML document
const sa_style = document.createElement("style");
sa_style.innerHTML = `
@property --angle {
  syntax: '<angle>';
  initial-value: 90deg;
  inherits: true;
}

@property --gradX {
  syntax: '<percentage>';
  initial-value: 50%;
  inherits: true;
}

@property --gradY {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: true;
}


@keyframes borderRotate {
	100% {
		--angle: 420deg;
	}
}

@keyframes borderRadial {
	20% {
		--gradX: 100%;
		--gradY: 50%;
	}
	40% {
		--gradX: 100%;
		--gradY: 100%;
	}
	60% {
		--gradX: 50%;
		--gradY: 100%;
	}
	80% {
		--gradX: 0%;
		--gradY: 50%;
	}
	100% {
		--gradX: 50%;
		--gradY: 0%;
	}
}

:root {
	--d: 800ms;
	--angle: 90deg;
	--gradX: 100%;
	--gradY: 50%;
	--c1: rgba(255, 0, 0, 1);
	--c2: rgba(255, 0, 0, 0.3);
}`;
document.head.appendChild(sa_style);



function addBorder() {
    const body = document.getElementsByTagName("body")[0];
    const newBorder = document.createElement("div");
    newBorder.style.border = "25px solid red";
    newBorder.style.boxSizing = "border-box";
    newBorder.style.width = "100%";
    newBorder.style.height = "100%";
    newBorder.style.position = "absolute";
    newBorder.style.top = "0";
    newBorder.style.left = "0";
    newBorder.style.zIndex = "9999999";

    newBorder.style.borderImage = "conic-gradient(from var(--angle), var(--c2), var(--c1) 0.1turn, var(--c1) 0.15turn, var(--c2) 0.25turn) 30";
    newBorder.style.animation = "borderRotate var(--d) linear infinite forwards";


    // Add a new style rule for the second child of the newBorder element
    const child_style = document.createElement("child_style");
    child_style.innerHTML = `
      div:nth-child(2) {
        border-image: radial-gradient(ellipse at var(--gradX) var(--gradY), var(--c1), var(--c1) 10%, var(--c2) 40%) 30;
        animation: borderRadial var(--d) linear infinite forwards;
      }
    `;
    newBorder.appendChild(child_style);




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
    // setInterval(() => {
    //   newBorder.style.display = visible ? "none" : "block";
    //   visible = !visible;
    // }, 100); 
    
  }
  
  window.addEventListener("load", addBorder);