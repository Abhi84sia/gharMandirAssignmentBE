const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors module
const panchangRoutes = require('./routes/panchangRoutes');

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
