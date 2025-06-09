import { Router, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

interface UserStore {
  [username: string]: string; // username -> password hash
}

const users: UserStore = {};
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const registerHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'username and password required' });
    return;
  }
  if (users[username]) {
    res.status(409).json({ error: 'user exists' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = passwordHash;
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

router.post('/register', registerHandler);

const loginHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const storedHash = users[username];
  if (!storedHash) {
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }
  const match = await bcrypt.compare(password, storedHash);
  if (!match) {
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

router.post('/login', loginHandler);

export default router;
