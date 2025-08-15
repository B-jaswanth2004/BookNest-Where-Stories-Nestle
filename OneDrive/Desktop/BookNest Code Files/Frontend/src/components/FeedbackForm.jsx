import { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ bookId }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/feedback', {
        userId: user._id,
        bookId,
        rating,
        comment
      });
      alert('Thanks for your feedback!');
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div>
      <h4>Leave Feedback</h4>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      />
      <br />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Your thoughts..."
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FeedbackForm;
