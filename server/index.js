import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// API routes - proxy to Rick and Morty API with error handling and timeouts
app.use('/api', createProxyMiddleware({
  target: 'https://rickandmortyapi.com/api',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Cache-Control'] = 'public, max-age=3600'; // Cache for 1 hour
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({
      error: 'Proxy Error',
      message: 'Failed to fetch data from Rick and Morty API'
    });
  },
  proxyTimeout: 10000,
  timeout: 10000,
}));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});