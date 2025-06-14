app.use(express.json({ limit: '100gb' }));
app.use(express.urlencoded({ limit: '100gb', extended: true }));

app.use((req, res, next) => {
  console.log('Request size:', req.headers['content-length']);
  next();
}); 