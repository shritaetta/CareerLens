import React, { useState } from 'react';
import { X } from 'lucide-react';
import './FeedbackModal.css';

const FeedbackModal = ({ internship, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    { id: 'location_not_suitable', label: 'Location not suitable' },
    { id: 'low_stipend', label: 'Low stipend' },
    { id: 'not_my_domain', label: 'Not my domain' },
    { id: 'skills_mismatch', label: 'Skills mismatch' },
    { id: 'duration_not_suitable', label: 'Duration not suitable' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedReason) return;
    onSubmit(selectedReason, internship);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h3>Why dislike this internship?</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <p className="modal-subtitle">Help us improve your recommendations.</p>

        <form onSubmit={handleSubmit}>
          <div className="reasons-list">
            {reasons.map((r) => (
              <label 
                key={r.id} 
                className={`reason-pill ${selectedReason === r.id ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.id}
                  checked={selectedReason === r.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  style={{ display: 'none' }}
                />
                {r.label}
              </label>
            ))}
          </div>
          
          <button 
            type="submit" 
            className="submit-feedback-btn"
            disabled={!selectedReason}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
