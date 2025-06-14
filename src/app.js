const express = require('express');
const app = express();

// Remove all middleware and handle raw requests
app.post('*', (req, res) => {
  const chunks = [];
  
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  req.on('end', () => {
    try {
      const body = Buffer.concat(chunks);
      const data = JSON.parse(body.toString());
      // Process your data here
      res.json({ success: true, message: 'Data received' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error processing request' });
    }
  });
  
  req.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).json({ error: 'Error processing request' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
}); 