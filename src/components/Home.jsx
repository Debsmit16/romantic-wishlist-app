import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const romanticQuotes = [
  "Every wish you make is a star I want to reach for you 💫",
  "Your dreams are my favorite bedtime stories 💕",
  "In a world full of wishes, you're my only reality ✨",
  "Every item on your list is a reason to make you smile 😊",
  "Your happiness is my favorite project 💖",
  "Collecting moments, creating memories, fulfilling wishes 🌟",
  "You deserve every beautiful thing your heart desires 💝"
]

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showSecretMessage, setShowSecretMessage] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState([])

  useEffect(() => {
    // Rotate quotes every 5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % romanticQuotes.length)
    }, 5000)

    // Create floating hearts
    const createFloatingHeart = () => {
      const heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2,
        size: 0.8 + Math.random() * 0.4
      }
      setFloatingHearts(prev => [...prev.slice(-10), heart])
    }

    const heartInterval = setInterval(createFloatingHeart, 2000)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(heartInterval)
    }
  }, [])

  const handleSecretClick = () => {
    setShowSecretMessage(true)
    setTimeout(() => setShowSecretMessage(false), 3000)
  }

  return (
    <div className="home-page">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.animationDuration}s`,
              fontSize: `${heart.size}rem`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="home-container">
        {/* Main Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-header">
            <h1 className="welcome-title">
              Hey love, here's where dreams take shape 💖
            </h1>
            <p className="welcome-subtitle">
              Your personal wishlist sanctuary, crafted with all my love
            </p>
          </div>

          {/* Daily Quote */}
          <div className="daily-quote">
            <div className="quote-content">
              <span className="quote-text">
                {romanticQuotes[currentQuote]}
              </span>
            </div>
            <div className="quote-indicator">
              {romanticQuotes.map((_, index) => (
                <span
                  key={index}
                  className={`quote-dot ${index === currentQuote ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="home-navigation">
            <Link to="/wishlist" className="nav-button primary">
              <span className="nav-icon">🎁</span>
              <span>View Wishlist</span>
            </Link>
            
            <Link to="/add-wish" className="nav-button secondary">
              <span className="nav-icon">✨</span>
              <span>Add New Wish</span>
            </Link>
            
            <Link to="/open-when" className="nav-button tertiary">
              <span className="nav-icon">💌</span>
              <span>Open When Notes</span>
            </Link>

            <Link to="/settings" className="nav-button tertiary">
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </div>

          {/* Secret Heart */}
          <div className="secret-section">
            <button 
              className="secret-heart"
              onClick={handleSecretClick}
              title="Click for a secret message 💕"
            >
              💝
            </button>
            
            {showSecretMessage && (
              <div className="secret-message">
                <p>You are the most beautiful wish that came true in my life 💕</p>
              </div>
            )}
          </div>

          {/* Anniversary Countdown */}
          <div className="countdown-section">
            <div className="countdown-card">
              <h3>Next Special Day</h3>
              <div className="countdown-display">
                <div className="countdown-item">
                  <span className="countdown-number">14</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">7</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">23</span>
                  <span className="countdown-label">Minutes</span>
                </div>
              </div>
              <p className="countdown-event">Until our anniversary 💕</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">🛍️</div>
            <div className="stat-content">
              <span className="stat-number">12</span>
              <span className="stat-label">Wishes</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-number">5</span>
              <span className="stat-label">Fulfilled</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💌</div>
            <div className="stat-content">
              <span className="stat-number">3</span>
              <span className="stat-label">Surprises</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
