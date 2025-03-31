const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const panchangRoutes = require('./routes/panchangRoutes');

dotenv.config();

const app = express();
const PORT_HTTP = process.env.PORT_HTTP || 5001;
const PORT_HTTPS = process.env.PORT_HTTPS || 5000;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host.replace(PORT_HTTP, PORT_HTTPS)}${req.url}`);
  }
  next();
});

// Routes
app.use('/api', panchangRoutes);

http.createServer(app).listen(PORT_HTTP, () => {
  console.log(`HTTP Server running on http://35.154.137.159:${PORT_HTTP}`);
});

https.createServer(options, app).listen(PORT_HTTPS, () => {
  console.log(`HTTPS Server running on https://35.154.137.159:${PORT_HTTPS}`);
});
