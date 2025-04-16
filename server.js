const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const SignIn = require('./models/SignIn');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// POST /sign-in
app.post('/sign-in', async (req, res) => {
  const { name, ageGroup } = req.body;

  if (!name || !ageGroup) {
    return res.status(400).json({ error: 'Missing name or ageGroup' });
  }

  try {
    const newSignIn = new SignIn({ name, ageGroup });
    await newSignIn.save();
    res.status(201).json({ message: 'Sign-in saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save sign-in' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
