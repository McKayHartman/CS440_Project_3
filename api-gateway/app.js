const express = require('express');
const app = express();
const port = 4000;
const { createProxyMiddleware } = require('http-proxy-middleware');

// Middleware to parse JSON bodies
app.use(
    "/api/text",
    createProxyMiddleware({
        target: "http://localhost:5001",
        changeOrigin: true,
    })
);

app.use(
    "/api/images",
    createProxyMiddleware({
        target: "http://localhost:5002",
        changeOrigin: true,
    })
)

app.use(
    "/api/users",
    createProxyMiddleware({
        target: "http://localhost:5003",
        changeOrigin: true,
    })
)


app.listen(4000, () => {
    console.log(`API Gateway running on http://localhost:${port}`);
});