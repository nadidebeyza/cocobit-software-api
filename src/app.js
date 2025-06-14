const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors());

// Increase Node.js memory limit
app.use(express.json({ 
  limit: '100gb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ 
  limit: '100gb', 
  extended: true 
}));

// Log request size
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
      res.status(500).json({ error: 'Error processing request' });
    }
  });
  
  req.on('error', (error) => {
    res.status(500).json({ error: 'Error processing request' });
  });
}); 