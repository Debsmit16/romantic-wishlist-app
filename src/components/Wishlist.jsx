import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WishCard from './WishCard'
import CommentsPanel from './CommentsPanel'
import './Wishlist.css'

const Wishlist = ({ wishes, updateWish, deleteWish, addComment }) => {
  const [selectedWish, setSelectedWish] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showComments, setShowComments] = useState(false)

  // Get unique categories
  const categories = ['all', ...new Set(wishes.map(wish => wish.category))]
  
  // Filter and sort wishes
  const filteredWishes = wishes
    .filter(wish => {
      if (filterStatus !== 'all' && wish.status !== filterStatus) return false
      if (filterCategory !== 'all' && wish.category !== filterCategory) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateAdded) - new Date(a.dateAdded)
        case 'oldest':
          return new Date(a.dateAdded) - new Date(b.dateAdded)
        case 'priority':
          const priorityOrder = { '💖': 3, '✨': 2, '💫': 1 }
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleWishClick = (wish) => {
    setSelectedWish(wish)
    setShowComments(true)
  }

  const handleStatusChange = (wishId, newStatus) => {
    updateWish(wishId, { status: newStatus })
    
    // Show confetti animation for completed wishes
    if (newStatus === 'Got it 🎁') {
      createConfetti()
    }
  }

  const createConfetti = () => {
    const confettiContainer = document.createElement('div')
    confettiContainer.className = 'confetti-container'
    document.body.appendChild(confettiContainer)

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti-piece'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.animationDelay = Math.random() * 3 + 's'
      confetti.style.backgroundColor = ['#FFD1DC', '#E5C3FF', '#FFE4E1'][Math.floor(Math.random() * 3)]
      confettiContainer.appendChild(confetti)
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer)
    }, 3000)
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">My Wishlist ✨</h1>
          <p className="page-subtitle">
            All the beautiful things that make my heart flutter
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="wishlist-controls">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="status-filter">Status:</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Wishes</option>
                <option value="Still want 🛍️">Still Want</option>
                <option value="Got it 🎁">Got It</option>
                <option value="Surprise me 💌">Surprise Me</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>

          <Link to="/add-wish" className="btn btn-primary add-wish-btn">
            <span>✨</span>
            Add New Wish
          </Link>
        </div>

        {/* Wishlist Grid */}
        {filteredWishes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💫</div>
            <h3>No wishes found</h3>
            <p>Start adding some beautiful dreams to your wishlist!</p>
            <Link to="/add-wish" className="btn btn-primary">
              Add Your First Wish
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {filteredWishes.map(wish => (
              <WishCard
                key={wish.id}
                wish={wish}
                onWishClick={handleWishClick}
                onStatusChange={handleStatusChange}
                onDelete={deleteWish}
                onUpdate={updateWish}
              />
            ))}
          </div>
        )}

        {/* Comments Panel */}
        {showComments && selectedWish && (
          <CommentsPanel
            wish={selectedWish}
            onClose={() => setShowComments(false)}
            onAddComment={addComment}
          />
        )}

        {/* Quick Stats */}
        <div className="wishlist-stats">
          <div className="stat-item">
            <span className="stat-number">{wishes.length}</span>
            <span className="stat-label">Total Wishes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {wishes.filter(w => w.status === 'Got it 🎁').length}
            </span>
            <span className="stat-label">Fulfilled</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {wishes.filter(w => w.status === 'Still want 🛍️').length}
            </span>
            <span className="stat-label">Still Wanting</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {wishes.filter(w => w.status === 'Surprise me 💌').length}
            </span>
            <span className="stat-label">Surprises</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
