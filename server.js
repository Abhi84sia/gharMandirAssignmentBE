const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors module
const panchangRoutes = require('./routes/panchangRoutes');
const fs = require('fs');
const https = require('https');



dotenv.config();
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: 'https://ghar-mandir-assignment-fe.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Mount routes
app.use('/api', panchangRoutes);

https.createServer(options, app).listen(PORT, () => {
  console.log('Server running on https://35.154.137.159:3003');
});
