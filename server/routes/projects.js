
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    let query = {};
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Filter by language if provided
    if (language) {
      query.languages = language;
    }
    
    const projects = await Project.find(query);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// Save project progress
router.post('/:id/save', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Determine which language to update progress for (use first language in project)
    const language = project.languages[0];
    
    // Update user progress
    let userProgress = await UserProgress.findOne({
      user: req.user.id,
      language
    });
    
    if (!userProgress) {
      userProgress = new UserProgress({
        user: req.user.id,
        language,
        skills: [],
        completedChallenges: [],
        completedProjects: []
      });
    }
    
    // Check if project already completed
    const alreadyCompleted = userProgress.completedProjects.find(
      p => p.projectId.toString() === req.params.id
    );
    
    if (completed && !alreadyCompleted) {
      userProgress.completedProjects.push({
        projectId: project._id,
        completedAt: Date.now()
      });
      
      // Grant XP for completing project
      const user = await User.findById(req.user.id);
      let xpAwarded = 0;
      
      // Award XP based on difficulty
      if (project.difficulty === 'Beginner') {
        xpAwarded = 100;
      } else if (project.difficulty === 'Intermediate') {
        xpAwarded = 250;
      } else if (project.difficulty === 'Advanced') {
        xpAwarded = 500;
      }
      
      user.xp += xpAwarded;
      
      // Check for level up (simple algorithm, can be more complex)
      const nextLevelThreshold = user.level * 1000;
      if (user.xp >= nextLevelThreshold) {
        user.level += 1;
      }
      
      user.lastActive = Date.now();
      await user.save();
      await userProgress.save();
      
      return res.json({
        success: true,
        xpAwarded,
        message: 'Project completed successfully!'
      });
    } else if (completed && alreadyCompleted) {
      return res.json({
        success: true,
        message: 'Project already completed.',
        alreadyCompleted: true
      });
    } else {
      // Just save progress without marking as completed
      user.lastActive = Date.now();
      await user.save();
      
      return res.json({
        success: true,
        message: 'Progress saved.'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
