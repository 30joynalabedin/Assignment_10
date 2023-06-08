const jwt = require('jsonwebtoken');

function generateToken(userId, secretKey) {
  const payload = { userId };
  const options = { expiresIn: '1h' }; 

  return jwt.sign(payload, secretKey, options);
}

function authenticate(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'mysecretkey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      
      req.userId = decoded.userId;
      next();
    });
  }

const token = generateToken('123456', 'mysecretkey');
console.log(token);


module.exports = authenticate;