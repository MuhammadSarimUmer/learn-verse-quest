
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

// Get user progress for a specific language
router.get('/:language', auth, async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({
      user: req.user.id,
      language: req.params.language
    });

    if (!userProgress) {
      return res.status(404).json({ msg: 'Progress not found for this language' });
    }

    res.json(userProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update skill progress
router.put('/skill/:language/:skillId', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const { language, skillId } = req.params;

    // Find user progress
    let userProgress = await UserProgress.findOne({
      user: req.user.id,
      language
    });

    // If no progress record exists, create one
    if (!userProgress) {
      userProgress = new UserProgress({
        user: req.user.id,
        language,
        skills: []
      });
    }

    // Find the skill to update
    const skillIndex = userProgress.skills.findIndex(skill => skill.skillId === skillId);

    // If skill doesn't exist, return error
    if (skillIndex === -1) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    // Update progress and status
    userProgress.skills[skillIndex].progress = progress;
    
    if (progress >= 100) {
      userProgress.skills[skillIndex].status = 'completed';
      userProgress.skills[skillIndex].completedAt = Date.now();
      
      // Grant XP for completing skill
      const user = await User.findById(req.user.id);
      user.xp += 50; // Award 50 XP for completing a skill
      
      // Check for level up (simple algorithm, can be more complex)
      const nextLevelThreshold = user.level * 1000;
      if (user.xp >= nextLevelThreshold) {
        user.level += 1;
      }
      
      await user.save();
    } else if (progress > 0) {
      userProgress.skills[skillIndex].status = 'in-progress';
    }

    userProgress.updatedAt = Date.now();
    await userProgress.save();

    res.json(userProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update streak
router.put('/streak', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get last active date and today's date
    const lastActive = new Date(user.lastActive);
    const today = new Date();
    
    // Reset the time part to compare just the dates
    lastActive.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffTime = Math.abs(today - lastActive);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Update streak based on activity
    if (diffDays === 0) {
      // Already counted for today
      res.json({ streak: user.streak });
    } else if (diffDays === 1) {
      // Consecutive day, increase streak
      user.streak += 1;
      user.lastActive = Date.now();
      await user.save();
      res.json({ streak: user.streak });
    } else {
      // Missed days, reset streak
      user.streak = 1;
      user.lastActive = Date.now();
      await user.save();
      res.json({ streak: user.streak });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
