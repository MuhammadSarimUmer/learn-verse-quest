
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    required: true
  },
  skills: [{
    skillId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['locked', 'in-progress', 'completed'],
      default: 'locked'
    },
    completedAt: {
      type: Date
    }
  }],
  completedChallenges: [{
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number
    }
  }],
  completedProjects: [{
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentCourse: {
    courseId: {
      type: String
    },
    name: {
      type: String
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProgress', UserProgressSchema);
