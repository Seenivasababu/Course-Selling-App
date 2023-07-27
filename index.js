const express = require('express');

require('dotenv').config();
const cors = require('cors')
const app = express();

const mongoose = require('mongoose');

const admin = require('./routes/admin')
const user = require('./routes/user')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/admin',admin)
app.use('/user', user)
// Start the server
const PORT = 3001; // You can change this to any available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
