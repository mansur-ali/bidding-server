const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const auctionRoutes = require('./routes/auctions');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auction', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
