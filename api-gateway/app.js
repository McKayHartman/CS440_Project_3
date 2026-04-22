const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

const TEXT_SERVICE_URL = process.env.TEXT_SERVICE_URL || 'http://localhost:5001';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5002';
const IMAGE_SERVICE_URL = process.env.IMAGE_SERVICE_URL || 'http://localhost:5003';

app.use(
  '/api/text',
  createProxyMiddleware({
    target: TEXT_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/users',
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/api/images',
  createProxyMiddleware({
    target: IMAGE_SERVICE_URL,
    changeOrigin: true,
  })
);

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
