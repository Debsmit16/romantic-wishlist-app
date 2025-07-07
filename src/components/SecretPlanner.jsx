import React, { useState } from 'react'
import './SecretPlanner.css'

const SecretPlanner = ({ wishes }) => {
  const [secretNotes, setSecretNotes] = useState({})
  const [giftPlans, setGiftPlans] = useState({})
  const [surpriseUnlocks, setSurpriseUnlocks] = useState({})
  const [showSecretMessage, setShowSecretMessage] = useState(false)

  const updateGiftPlan = (wishId, status) => {
    setGiftPlans(prev => ({
      ...prev,
      [wishId]: status
    }))
  }

  const updateSecretNote = (wishId, note) => {
    setSecretNotes(prev => ({
      ...prev,
      [wishId]: note
    }))
  }

  const addSurpriseUnlock = (wishId, date, message) => {
    setSurpriseUnlocks(prev => ({
      ...prev,
      [wishId]: { date, message }
    }))
  }

  const getGiftStatus = (wishId) => {
    return giftPlans[wishId] || 'planning'
  }

  const getSecretNote = (wishId) => {
    return secretNotes[wishId] || ''
  }

  return (
    <div className="secret-planner-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Secret Gift Planner 🎁</h1>
          <p className="page-subtitle">
            Your private planning space - only you can see this! 🤫
          </p>
        </div>

        {/* Secret Access Warning */}
        <div className="secret-warning">
          <div className="warning-icon">🔒</div>
          <div className="warning-content">
            <h3>Private Planning Zone</h3>
            <p>This section is completely private. Plan surprises, track purchases, and add secret notes without spoiling the magic!</p>
          </div>
        </div>

        {/* Gift Planning Grid */}
        <div className="gift-planning-grid">
          {wishes.map(wish => (
            <div key={wish.id} className="gift-plan-card">
              <div className="wish-preview">
                <h4>{wish.title}</h4>
                <p className="wish-category">{wish.category}</p>
                <span className="wish-priority">{wish.priority}</span>
              </div>

              <div className="planning-section">
                <div className="status-section">
                  <label className="plan-label">Gift Status:</label>
                  <select
                    value={getGiftStatus(wish.id)}
                    onChange={(e) => updateGiftPlan(wish.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="planning">🤔 Planning</option>
                    <option value="researching">🔍 Researching</option>
                    <option value="found">✨ Found Perfect Gift</option>
                    <option value="bought">🛍️ Purchased</option>
                    <option value="wrapped">🎁 Wrapped & Ready</option>
                    <option value="given">💝 Given</option>
                  </select>
                </div>

                <div className="notes-section">
                  <label className="plan-label">Secret Notes:</label>
                  <textarea
                    value={getSecretNote(wish.id)}
                    onChange={(e) => updateSecretNote(wish.id, e.target.value)}
                    placeholder="Ideas, links, store locations, surprise plans..."
                    className="secret-notes"
                    rows="3"
                  />
                </div>

                <div className="surprise-section">
                  <label className="plan-label">Surprise Unlock:</label>
                  <div className="surprise-controls">
                    <input
                      type="date"
                      className="surprise-date"
                      placeholder="Special date"
                    />
                    <input
                      type="text"
                      className="surprise-message"
                      placeholder="Secret message to reveal..."
                    />
                    <button
                      onClick={() => addSurpriseUnlock(wish.id, '', '')}
                      className="btn btn-sm btn-secondary"
                    >
                      Set Surprise
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Planning Stats */}
        <div className="planning-stats">
          <div className="stat-card">
            <div className="stat-icon">🤔</div>
            <div className="stat-content">
              <span className="stat-number">
                {Object.values(giftPlans).filter(status => status === 'planning').length}
              </span>
              <span className="stat-label">Planning</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛍️</div>
            <div className="stat-content">
              <span className="stat-number">
                {Object.values(giftPlans).filter(status => status === 'bought').length}
              </span>
              <span className="stat-label">Purchased</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎁</div>
            <div className="stat-content">
              <span className="stat-number">
                {Object.values(giftPlans).filter(status => status === 'wrapped').length}
              </span>
              <span className="stat-label">Ready</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💝</div>
            <div className="stat-content">
              <span className="stat-number">
                {Object.values(giftPlans).filter(status => status === 'given').length}
              </span>
              <span className="stat-label">Given</span>
            </div>
          </div>
        </div>

        {/* Secret Message Section */}
        <div className="secret-message-section">
          <button
            onClick={() => setShowSecretMessage(!showSecretMessage)}
            className="secret-reveal-btn"
          >
            💌 Click for Secret Planning Tips
          </button>

          {showSecretMessage && (
            <div className="secret-tips">
              <h3>💡 Secret Planning Tips</h3>
              <ul>
                <li>🔍 Use the research status to save links and ideas</li>
                <li>📝 Add store locations and price comparisons in notes</li>
                <li>🎯 Set surprise unlocks for special occasions</li>
                <li>📱 Screenshot this page for shopping reference</li>
                <li>💝 Plan the perfect reveal moment</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SecretPlanner
