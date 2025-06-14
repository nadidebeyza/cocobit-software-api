const express = require('express');
const app = express();
const getRawBody = require('raw-body');
const multer = require('multer');
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 * 1024 } }); // 100GB

// Remove the default body parsers
// app.use(express.json({ limit: '100gb' }));
// app.use(express.urlencoded({ limit: '100gb', extended: true }));

// Custom middleware to handle large payloads
app.use(async (req, res, next) => {
  try {
    const rawBody = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '100gb',
      encoding: 'utf8'
    });
    req.body = JSON.parse(rawBody);
    next();
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  console.log('Request size:', req.headers['content-length']);
  next();
});

app.use(express.raw({ type: '*/*', limit: '100gb' }));

app.post('/your-endpoint', (req, res) => {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    // Process your large payload here
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
}); 