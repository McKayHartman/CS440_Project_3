const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 4000;

app.use(
  '/api/text',
  createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
  })
);

app.use(
  '/api/users',
  createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
  })
);

app.use(
  '/api/images',
  createProxyMiddleware({
    target: 'http://localhost:5003',
    changeOrigin: true,
  })
);

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
