
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  timeEstimate: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }],
  instructions: {
    type: String,
    required: true
  },
  startingCode: {
    type: String,
    required: true
  },
  testCases: [{
    input: {
      type: String
    },
    expectedOutput: {
      type: String
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  solution: {
    type: String
  },
  hints: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
