const express = require('express');
const multer = require('multer');
const app = express();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 * 1024, // 100GB
    fieldSize: 100 * 1024 * 1024 * 1024 // 100GB
  }
});

// Handle multipart/form-data
app.post('*', upload.any(), (req, res) => {
  try {
    // Files will be in req.files
    // Form fields will be in req.body
    console.log('Files received:', req.files);
    console.log('Form data:', req.body);
    
    res.json({ 
      success: true, 
      message: 'Data received',
      files: req.files,
      formData: req.body
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
}); 