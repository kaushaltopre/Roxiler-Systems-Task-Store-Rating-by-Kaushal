exports.validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16})/;
  return regex.test(password);
};

exports.validateUserInput = (req, res, next) => {
  const { name, email, password, address } = req.body;
  
  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({ error: 'Name must be 20-60 characters' });
  }
  
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  if (!this.validatePassword(password)) {
    return res.status(400).json({ 
      error: 'Password must be 8-16 characters with at least one uppercase and one special character'
    });
  }
  
  if (address && address.length > 400) {
    return res.status(400).json({ error: 'Address exceeds 400 characters' });
  }
  
  next();
};