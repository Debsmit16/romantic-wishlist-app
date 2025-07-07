import React, { useState } from 'react'
import './CommentsPanel.css'

const CommentsPanel = ({ wish, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(wish.id, newComment.trim())
      setNewComment('')
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="comments-panel" onClick={(e) => e.stopPropagation()}>
        <div className="comments-header">
          <div className="wish-info">
            <h3>{wish.title}</h3>
            <p>{wish.description}</p>
          </div>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="comments-content">
          <div className="comments-list">
            {wish.comments && wish.comments.length > 0 ? (
              wish.comments.map(comment => (
                <div key={comment.id} className="comment-bubble">
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-timestamp">
                    {formatTimestamp(comment.timestamp)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-comments">
                <span className="no-comments-icon">💭</span>
                <p>No comments yet. Start the conversation!</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="comment-form">
            <div className="comment-input-container">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a sweet note or thought... 💕"
                className="comment-input"
                rows="3"
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!newComment.trim()}
                title="Send with love"
              >
                💖
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentsPanel
