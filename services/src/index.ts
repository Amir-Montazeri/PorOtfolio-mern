import express from 'express';
import bearerToken from 'express-bearer-token';
import { auth } from './routes';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bearerToken());

app.get('/', (req, res) =>
  res.json({
    message: 'App is working!',
    version: '1',
  })
);

app.use('/auth', auth);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
