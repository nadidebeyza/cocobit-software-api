const auth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== adminSecret) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  next();
};

module.exports = auth; 