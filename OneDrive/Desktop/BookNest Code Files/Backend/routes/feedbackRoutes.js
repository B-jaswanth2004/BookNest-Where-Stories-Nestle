const express = require('express');
const router = express.Router();
const { submitFeedback, getBookFeedback } = require('../controllers/feedbackController');

router.post('/', submitFeedback);
router.get('/:bookId', getBookFeedback);

module.exports = router;
