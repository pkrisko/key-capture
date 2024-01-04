import httpProxy from 'http-proxy';

const API_URL = process.env.FIREBASE_API_DOMAIN;
const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => new Promise((resolve, reject) => {
  req.headers['x-forwarded-port'] = req.headers['x-forwarded-port'] || '443';
  proxy.web(req, res, { target: API_URL, changeOrigin: true, prependPath: true }, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      res.status(500).json({ error: 'Error occurred in proxy' });
      return reject(err);
    }
    return resolve();
  });
});

export default handler;
