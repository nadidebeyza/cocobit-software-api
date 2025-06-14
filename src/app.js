app.use(express.json({ limit: '0' }));
app.use(express.urlencoded({ limit: '0', extended: true }));

app.use((req, res, next) => {
  console.log('Request size:', req.headers['content-length']);
  next();
}); 