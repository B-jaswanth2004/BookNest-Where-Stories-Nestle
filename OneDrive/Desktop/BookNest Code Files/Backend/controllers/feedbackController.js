const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;

    const existing = await Feedback.findOne({ userId, bookId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.status(200).json({ message: 'Feedback updated', feedback: existing });
    }

    const feedback = new Feedback({ userId, bookId, rating, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

exports.getBookFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ bookId: req.params.bookId }).populate('userId', 'name');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
