import express from 'express';
import {
  registerUser,
  loginWithToken,
  loginWithUserPass,
} from 'services/auth/auth.service';

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    res.status(400).json({ code: 400, message: 'email and password required' });
    return;
  } else if (typeof email === 'string' && typeof password === 'string') {
    const { result } = registerUser(email, password);
    if (result.status === 'user already exist') {
      res.status(409).json(result);
    } else if (result.status === 'user created') {
      res.status(201).json(result);
    }
  }
});

router.get('/login', (req, res) => {
  const { email, password } = req.query;
  const { token } = req;

  if (!token && (!email || !password)) {
    res.status(400).json({ message: 'email and password or token required' });
  } else if (typeof email === 'string' && typeof password === 'string') {
    let user = loginWithUserPass(email, password);
    if (user === false) {
      res.status(404).json({ message: 'user not exist' });
    } else {
      res.status(200).json({ message: 'user was exist', user });
    }
  } else if (token) {
    let user = loginWithToken(token);
    if (user === false) {
      res.status(404).json({ message: 'user not exist' });
    } else {
      res.status(200).json({ message: 'user was exist', user });
    }
  }
});

export default router;
