
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Only allow users to view their own profile unless we add admin role later
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ msg: 'Not authorized to view this profile' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    // Only allow users to update their own profile
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ msg: 'Not authorized to update this profile' });
    }
    
    const { name, profilePicture, currentPassword, newPassword } = req.body;
    
    // Get user
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    
    // If updating password
    if (currentPassword && newPassword) {
      // Check if current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ msg: 'Current password is incorrect' });
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    
    // Save updates
    await user.save();
    
    // Return user without password
    const updatedUser = await User.findById(req.params.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
