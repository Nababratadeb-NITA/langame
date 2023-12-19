const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  language:{
    type: String,
    required: true
  },
  difficulty:{
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
