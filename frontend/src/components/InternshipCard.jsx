import React, { useState } from 'react';
import { MapPin, IndianRupee, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import './InternshipCard.css';

const InternshipCard = ({ internship, onDislike, onLike, isLikedInitial = false }) => {
  const [feedback, setFeedback] = useState(isLikedInitial ? 'like' : null);

  const handleFeedback = (type) => {
    // Toggle logic: if clicking the same button, remove feedback
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    
    if (type === 'like' && onLike) {
      onLike(internship, newFeedback === 'like');
    }
  };

  // Safe parsing values
  const title = internship.title || 'Untitled Internship';
  const location = internship.location || 'Remote/TBD';
  const stipend = internship.stipend || 'Unpaid/TBD';
  const duration = internship.duration || 'Flexible';
  const description = internship.description || 'No description provided.';
  const domain = internship.domain || '';

  return (
    <div className="internship-card">
      <div className="internship-header">
        <div style={{ flex: 1 }}>
          <h3 className="internship-title">{title}</h3>
          <span className="internship-domain">{domain}</span>
        </div>
        {internship.match_score !== undefined && (
          <div className="match-score">
            Score: {internship.match_score}
          </div>
        )}
      </div>

      <div className="internship-badges">
        <div className="badge">
          <MapPin size={14} /> {location}
        </div>
        <div className="badge">
          <IndianRupee size={14} /> {stipend}
        </div>
        <div className="badge">
          <Clock size={14} /> {duration}
        </div>
      </div>

      <p className="internship-description">
        {description.length > 200 ? `${description.substring(0, 200)}...` : description}
      </p>

      <div className="internship-footer">
        <div className="feedback-buttons">
          <button 
            type="button"
            className={`feedback-btn like-btn ${feedback === 'like' ? 'active' : ''}`}
            onClick={() => handleFeedback('like')}
            aria-label="Like"
          >
            <ThumbsUp size={18} />
          </button>
          
          <button 
            type="button"
            className={`feedback-btn dislike-btn ${feedback === 'dislike' ? 'active' : ''}`}
            onClick={() => {
              if (feedback !== 'dislike' && onDislike) {
                onDislike(internship);
              }
              handleFeedback('dislike');
            }}
            aria-label="Dislike"
          >
            <ThumbsDown size={18} />
          </button>
        </div>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
};

export default InternshipCard;
