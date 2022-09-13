import express from 'express';
// import { addUser, getUsers, userExist } from '../../services/auth/auth.service';
import {
  addUser,
  loginWithToken,
  loginWithUserPass,
} from '../../services/auth/auth.service';

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    res.status(400).json({ code: 400, message: 'email and password required' });
    return;
  } else if (typeof email === 'string' && typeof password === 'string') {
    const add = addUser(email, password);
    res.status(201).json({ status: add });
  }
});

router.get('/login', (req, res) => {
  const { email, password } = req.query;
  const { token } = req;
  let isUserExist;

  if (token && (!email || !password)) {
    isUserExist = loginWithToken(token);

    res.status(200).json({ oke: 'token base...', res: isUserExist });
    return;
  } else if (!token && (!email || !password)) {
    res
      .status(400)
      .json({ code: 400, message: 'email and password or token required' });
    return;
  } else if (typeof email === 'string' && typeof password === 'string') {
    isUserExist = loginWithUserPass(email, password);
    if (!Boolean(isUserExist)) {
      res.status(400).json({ message: 'user not exist', isUserExist });
    } else {
      res.status(200).json({ oke: 'was ok by email', isUserExist, token });
    }
  }
});

export default router;
