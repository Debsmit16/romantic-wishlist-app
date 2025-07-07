import React, { useState } from 'react'
import './WishCard.css'

const WishCard = ({ wish, onWishClick, onStatusChange, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedWish, setEditedWish] = useState(wish)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedWish(wish)
  }

  const handleSave = () => {
    onUpdate(wish.id, editedWish)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedWish(wish)
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Got it 🎁':
        return '#90EE90'
      case 'Still want 🛍️':
        return '#FFD1DC'
      case 'Surprise me 💌':
        return '#E5C3FF'
      default:
        return '#FFE4E1'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case '💖':
        return { icon: '💖', label: 'High Priority' }
      case '✨':
        return { icon: '✨', label: 'Medium Priority' }
      case '💫':
        return { icon: '💫', label: 'Low Priority' }
      default:
        return { icon: '💫', label: 'Low Priority' }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isEditing) {
    return (
      <div className="wish-card editing">
        <div className="edit-form">
          <input
            type="text"
            value={editedWish.title}
            onChange={(e) => setEditedWish({ ...editedWish, title: e.target.value })}
            className="edit-input title-input"
            placeholder="Wish title..."
          />
          
          <textarea
            value={editedWish.description}
            onChange={(e) => setEditedWish({ ...editedWish, description: e.target.value })}
            className="edit-input description-input"
            placeholder="Description..."
            rows="3"
          />
          
          <div className="edit-controls">
            <select
              value={editedWish.category}
              onChange={(e) => setEditedWish({ ...editedWish, category: e.target.value })}
              className="edit-select"
            >
              <option value="Home">Home</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Books">Books</option>
              <option value="Tech">Tech</option>
              <option value="Experiences">Experiences</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
            
            <select
              value={editedWish.priority}
              onChange={(e) => setEditedWish({ ...editedWish, priority: e.target.value })}
              className="edit-select"
            >
              <option value="💖">💖 High</option>
              <option value="✨">✨ Medium</option>
              <option value="💫">💫 Low</option>
            </select>
          </div>
          
          <div className="edit-actions">
            <button onClick={handleSave} className="btn btn-primary btn-sm">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wish-card" onClick={() => onWishClick(wish)}>
      {/* Priority Badge */}
      <div className="priority-badge" title={getPriorityIcon(wish.priority).label}>
        {getPriorityIcon(wish.priority).icon}
      </div>

      {/* Wish Image */}
      {wish.image && (
        <div className="wish-image">
          <img src={wish.image} alt={wish.title} />
        </div>
      )}

      {/* Wish Content */}
      <div className="wish-content">
        <h3 className="wish-title">{wish.title}</h3>
        <p className="wish-description">{wish.description}</p>
        
        <div className="wish-meta">
          <span className="wish-category">{wish.category}</span>
          <span className="wish-date">{formatDate(wish.dateAdded)}</span>
        </div>
      </div>

      {/* Status Section */}
      <div className="wish-status">
        <select
          value={wish.status}
          onChange={(e) => {
            e.stopPropagation()
            onStatusChange(wish.id, e.target.value)
          }}
          className="status-select"
          style={{ backgroundColor: getStatusColor(wish.status) }}
        >
          <option value="Still want 🛍️">Still want 🛍️</option>
          <option value="Got it 🎁">Got it 🎁</option>
          <option value="Surprise me 💌">Surprise me 💌</option>
        </select>
      </div>

      {/* Comments Indicator */}
      {wish.comments && wish.comments.length > 0 && (
        <div className="comments-indicator">
          <span className="comment-icon">💬</span>
          <span className="comment-count">{wish.comments.length}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="wish-actions">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleEdit()
          }}
          className="action-btn edit-btn"
          title="Edit wish"
        >
          ✏️
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (window.confirm('Are you sure you want to delete this wish?')) {
              onDelete(wish.id)
            }
          }}
          className="action-btn delete-btn"
          title="Delete wish"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default WishCard
