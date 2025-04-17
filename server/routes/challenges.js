
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Challenge = require('../models/Challenge');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const { language } = req.query;
    let query = {};
    
    // Filter by language if provided
    if (language) {
      query.language = language;
    }
    
    const challenges = await Challenge.find(query).select('-solution');
    res.json(challenges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get challenge by ID
router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).select('-solution');
    
    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }
    
    res.json(challenge);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Challenge not found' });
    }
    res.status(500).send('Server error');
  }
});

// Submit challenge solution
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ msg: 'No code submitted' });
    }
    
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }
    
    // In a real implementation, this would execute the code against test cases
    // For demo purposes, we'll just consider it a success
    const success = true;
    const score = challenge.points;
    
    // Update user progress
    let userProgress = await UserProgress.findOne({
      user: req.user.id,
      language: challenge.language
    });
    
    if (!userProgress) {
      userProgress = new UserProgress({
        user: req.user.id,
        language: challenge.language,
        skills: [],
        completedChallenges: [],
        completedProjects: []
      });
    }
    
    // Check if challenge already completed
    const alreadyCompleted = userProgress.completedChallenges.find(
      c => c.challengeId.toString() === req.params.id
    );
    
    if (!alreadyCompleted) {
      userProgress.completedChallenges.push({
        challengeId: challenge._id,
        completedAt: Date.now(),
        score
      });
      
      // Grant XP for completing challenge
      const user = await User.findById(req.user.id);
      user.xp += score;
      
      // Check for level up (simple algorithm, can be more complex)
      const nextLevelThreshold = user.level * 1000;
      if (user.xp >= nextLevelThreshold) {
        user.level += 1;
      }
      
      user.lastActive = Date.now();
      await user.save();
      await userProgress.save();
    }
    
    res.json({
      success,
      score,
      message: success ? 'All tests passed!' : 'Some tests failed.',
      alreadyCompleted: !!alreadyCompleted
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
