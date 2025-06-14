const auth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.authorization;

  // --- START DEBUGGING LOGS ---
  console.log('--- Auth Middleware Debug ---');
  console.log('Backend ADMIN_SECRET (from env):', adminSecret);
  console.log('Authorization Header received:', authHeader);
  // --- END DEBUGGING LOGS ---

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // --- START DEBUGGING LOGS ---
    console.log('Auth failed: No token provided or malformed header.');
    // --- END DEBUGGING LOGS ---
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  // --- START DEBUGGING LOGS ---
  console.log('Token extracted from header:', token);
  // --- END DEBUGGING LOGS ---

  if (token !== adminSecret) {
    // --- START DEBUGGING LOGS ---
    console.log('Auth failed: Token mismatch!');
    // --- END DEBUGGING LOGS ---
    return res.status(403).json({ message: 'Invalid token' });
  }

  // --- START DEBUGGING LOGS ---
  console.log('Auth successful!');
  // --- END DEBUGGING LOGS ---
  next();
};

module.exports = auth; 