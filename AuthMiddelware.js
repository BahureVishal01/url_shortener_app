const jwt = require('jsonwebtoken');


exports.authUser = (req, res, next)=>{
    
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
   console.log(authHeader);
  const token = authHeader.split(' ')[1];

  jwt.verify(token, "JWT_SECRET", (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}