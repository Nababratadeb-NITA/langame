const Question = require('../models/Question');

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Get all questions for a specific language
exports.getQuestionsByLanguage = async (req, res) => {
    try {
      const { language } = req.params;
      const questions = await Question.find({ language });
      res.json({ questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Get all questions for a specific language with a specific difficulty
  exports.getQuestionsByLanguageAndDifficulty = async (req, res) => {
    try {
      const { language, difficulty } = req.params;
      const questions = await Question.find({ language, difficulty });
      res.json({ questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correctOption, difficulty, language } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctOption,
      difficulty,
      language,
    });

    const savedQuestion = await newQuestion.save();

    res.json({ message: 'Question added successfully', question: savedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing question
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctOption, difficulty, language } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options, correctOption, difficulty, language },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully', question: deletedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
