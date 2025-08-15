import { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = ({ bookId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/feedback/${bookId}`)
      .then(res => setFeedbacks(res.data))
      .catch(() => alert('Could not load feedback'));
  }, [bookId]);

  return (
    <div>
      <h4>Reviews</h4>
      {feedbacks.map(f => (
        <div key={f._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <strong>{f.userId.name}</strong> — ⭐ {f.rating}/5
          <p>{f.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
