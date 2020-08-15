import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: process.env.FIREBASE_API_DOMAIN,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
  prependPath: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
