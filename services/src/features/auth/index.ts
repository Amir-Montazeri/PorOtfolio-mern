import express from 'express';
// import { addUser, getUsers, userExist } from '../../services/auth/auth.service';
import {
  addUser,
  loginWithToken,
  loginWithUserPass,
} from '../../services/auth/auth.service';

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    res
      .status(400)
      .json({ code: 400, message: 'username and password required' });
    return;
  } else if (typeof username === 'string' && typeof password === 'string') {
    const add = addUser(username, password);
    res.status(201).json({ status: add });
  }
});

router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const { token } = req;
  let isUserExist;

  if (token && (!username || !password)) {
    isUserExist = loginWithToken(token);

    res.status(200).json({ oke: 'token base...', res: isUserExist });
    return;
  } else if (!token && (!username || !password)) {
    res
      .status(400)
      .json({ code: 400, message: 'username and password or token required' });
    return;
  } else if (typeof username === 'string' && typeof password === 'string') {
    isUserExist = loginWithUserPass(username, password);
    if (!Boolean(isUserExist)) {
      res.status(400).json({ message: 'user not exist', isUserExist });
    } else {
      res.status(200).json({ oke: 'was ok by username', isUserExist, token });
    }
  }
});

export default router;
