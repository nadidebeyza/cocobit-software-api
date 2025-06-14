app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

app.use((req, res, next) => {
  console.log('Request size:', req.headers['content-length']);
  next();
}); 