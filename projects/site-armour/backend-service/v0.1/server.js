const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Modify this endpoint to accept an incoming URL as a parameter
app.get('/status/:url', (req, res) => {
  const url = req.params.url;
  
  let status = 'unknown';

  res.send(`Status for URL '${url}': ${status}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});