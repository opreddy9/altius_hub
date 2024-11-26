const { User, validateUser } = require('../models/user');
const fs = require('fs');

exports.updateProfile = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findById(req.body.name);
    if (!user) return res.status(404).send('User not found');

    // Update fields
    user.name = req.body.name;
    user.bio = req.body.bio;

    // Update profile picture if provided
    if (req.file) {
      if (user.profilePicture) fs.unlinkSync(user.profilePicture); // Delete old image if exists
      user.profilePicture = req.file.path;
    }

    await user.save();
    res.status(200).send({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
