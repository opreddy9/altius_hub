const express = require('express');
const { User } = require('../models/user'); 
const redisClient = require('redis').createClient();
const router = express.Router();

router.get('/:id', async (req, res) => {
  const userId = req.params.id;


  redisClient.get(`user:${userId}`, async (err, cachedData) => {
    if (err) {
      console.error('Redis Error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (cachedData) {
      
      console.log('Cache hit');
      return res.json(JSON.parse(cachedData));
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      redisClient.setex(`user:${userId}`, 3600, JSON.stringify(user));

      console.log('Cache miss');
      return res.json(user);
    } catch (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, bio, profilePicture } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio, profilePicture },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    redisClient.del(`user:${userId}`);

    return res.json(updatedUser);
  } catch (err) {
    console.error('Database Error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
