import express from 'express';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import { auth } from './routes';

const corsOptions = {
  origin: true,
};

const allowHosts: string[] = ['http://localhost:8080'];
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bearerToken());
app.use(
  cors((req, callback) => {
    let origin = req.header('Origin');

    const options = {
      origin: allowHosts.some((allowHost) => allowHost === origin),
    };

    callback(null, options);
  })
);

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
