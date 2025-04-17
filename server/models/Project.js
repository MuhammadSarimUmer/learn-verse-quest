
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  timeEstimate: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  languages: [{
    type: String
  }],
  topics: [{
    type: String
  }],
  popular: {
    type: Boolean,
    default: false
  },
  steps: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    resources: [{
      title: {
        type: String
      },
      url: {
        type: String
      }
    }]
  }],
  requirements: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
