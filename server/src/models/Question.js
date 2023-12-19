const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctOption: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  language:{
    type: String,
    required: true,
  },
});

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
