const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const panchangRoutes = require('./routes/panchangRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.use(express.json());

// Mount routes
app.use('/api', panchangRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});