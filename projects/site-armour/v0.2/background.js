
chrome.runtime.onMessage.addListener((msg, sender, response) {
    if (msg.name == "fetchStatus") {
      const apiCall = `https://site-arm-be.kirbyware.io/status/${request.url}`;
      console.log(apiCall);

      //Call the api .. 
      fetch(apiCall).then(function(res) {
        //wait for response
        if (res.status !== 200) {
          response({ status: "error" });
          return;
        }
        res.json().then(function(data) {
          //send the response
          response({status: data.status, url: data.url});
        }); 
      }).catch(function(err) {
        response({ status: "error" });
        });
    }  
      return true; // to indicate that the response will be sent asynchronously
  });