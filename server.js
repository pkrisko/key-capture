/* eslint no-console: 0 */
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const devProxy = {
  '/api': {
    target: 'http://127.0.0.1:5001/randpiano/us-central1',
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
    if (dev && devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(createProxyMiddleware(context, devProxy[context]));
      });
    }

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
