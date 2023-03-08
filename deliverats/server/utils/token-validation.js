import jwt from 'jsonwebtoken';
import { ManagementClient } from 'auth0';

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.AUTH0_CLIENT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};