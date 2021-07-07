const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3001;
require('dotenv').config();

app.use(
  cors({ origin: '*' }, { allowedHeaders: ['Content-Type', 'Authorization'] })
);
app.use(express.json());

// ROUTES
app.use('/api/recipebook', require('./routes/recipebook'));
app.use('/api/user', require('./routes/auth'));

// DB
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;


db.on('error', (err) => console.error(err));
db.once('open', () => console.log('connected to db'));

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});

