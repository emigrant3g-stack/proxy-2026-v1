// index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Проксируем все запросы с вашего адреса на API Telegram
app.use('/', createProxyMiddleware({
    //target: 'https://api.telegram.org',
    target: 'https://google.com',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/', // сохраняем путь запроса
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy bridge is running on port ${PORT}`);
});
