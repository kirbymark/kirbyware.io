const express = require('express');
const app = express();

const resultArray = [
  { key: "https://www.cnn.com/", value: "good" },
  { key: "verizon.com", value: "bad" },
  { key: "epsn.com", value: "unknown" },
  { key: "www.drudgereport.com", value: "bad" },
  { key: "drudgereport.com", value: "unknown" },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/status/:url', (req, res) => {
  const url = req.params.url;
  console.log("Recived request for url: " + url); 
    
  const result = resultArray.find(obj => obj.key === url);
  const status = result ? result.value : "not-found";
  console.log("Result is: " + status); 

  // res.send(`url:${url},nod.status: ${status}`);
  res.json({ url: url, status: status });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});