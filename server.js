/* eslint no-console: 0 */
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const proxyConfig = {
  '/api': {
    target: process.env.FIREBASE_API_DOMAIN,
    prependPath: true,
    pathRewrite: {
      '^/api': '/',
    },
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    Object.keys(proxyConfig).forEach((context) => {
      server.use(createProxyMiddleware(context, proxyConfig[context]));
    });

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
