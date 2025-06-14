const express = require('express');
const app = express();

// Remove all other middleware and parsers
app.use((req, res, next) => {
  console.log('Request size:', req.headers['content-length']);
  next();
});

// Handle all POST requests
app.post('*', (req, res) => {
  let data = '';
  
  req.on('data', chunk => {
    data += chunk;
  });
  
  req.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      // Process your data here
      res.json({ success: true, message: 'Data received' });
    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON' });
    }
  });
  
  req.on('error', (error) => {
    res.status(500).json({ error: 'Error processing request' });
  });
}); 