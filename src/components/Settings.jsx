import React, { useState } from 'react'
import './Settings.css'

const Settings = ({ theme, setTheme, settings, setSettings }) => {
  const [tempSettings, setTempSettings] = useState(settings)
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  const themes = [
    {
      id: 'romantic-blush',
      name: 'Romantic Blush',
      description: 'Soft pinks and lavenders for a dreamy feel',
      colors: ['#FFF0F5', '#FFD1DC', '#E5C3FF'],
      icon: '💕'
    },
    {
      id: 'sunset-dreams',
      name: 'Sunset Dreams',
      description: 'Warm oranges and corals like a beautiful sunset',
      colors: ['#FFE4E1', '#FFA07A', '#FF6B6B'],
      icon: '🌅'
    },
    {
      id: 'lavender-fields',
      name: 'Lavender Fields',
      description: 'Purple hues inspired by endless lavender fields',
      colors: ['#E6E6FA', '#DDA0DD', '#BA55D3'],
      icon: '💜'
    },
    {
      id: 'ocean-breeze',
      name: 'Ocean Breeze',
      description: 'Cool blues like a gentle ocean breeze',
      colors: ['#E0F6FF', '#87CEEB', '#1E90FF'],
      icon: '🌊'
    },
    {
      id: 'midnight-romance',
      name: 'Midnight Romance',
      description: 'Deep mysterious colors for intimate moments',
      colors: ['#2a1a2e', '#16213e', '#0f3460'],
      icon: '🌙'
    },
    {
      id: 'cherry-blossom',
      name: 'Cherry Blossom',
      description: 'Delicate pinks like spring cherry blossoms',
      colors: ['#FFE4E6', '#FFB6C1', '#FF1493'],
      icon: '🌸'
    },
    {
      id: 'forest-whisper',
      name: 'Forest Whisper',
      description: 'Fresh greens like a peaceful forest',
      colors: ['#F0FFF0', '#98FB98', '#32CD32'],
      icon: '🌿'
    },
    {
      id: 'golden-hour',
      name: 'Golden Hour',
      description: 'Warm golds like the perfect golden hour',
      colors: ['#FFF8DC', '#FFD700', '#FF8C00'],
      icon: '✨'
    },
    {
      id: 'cosmic-love',
      name: 'Cosmic Love',
      description: 'Deep purples like the infinite cosmos',
      colors: ['#191970', '#4B0082', '#9400D3'],
      icon: '🌌'
    }
  ]

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setTempSettings(prev => ({
          ...prev,
          couplePhoto: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnimationsToggle = () => {
    const newValue = !tempSettings.animations
    setTempSettings(prev => ({
      ...prev,
      animations: newValue
    }))
    // Apply immediately
    setSettings(prev => ({
      ...prev,
      animations: newValue
    }))
  }

  const handleParticlesToggle = () => {
    const newValue = !tempSettings.particles
    setTempSettings(prev => ({
      ...prev,
      particles: newValue
    }))
    // Apply immediately
    setSettings(prev => ({
      ...prev,
      particles: newValue
    }))
  }

  const handleAnniversaryChange = (date) => {
    setTempSettings(prev => ({
      ...prev,
      anniversaryDate: date
    }))
  }

  const saveSettings = () => {
    setSettings(tempSettings)
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  const resetSettings = () => {
    const defaultSettings = {
      couplePhoto: null,
      anniversaryDate: null,
      animations: true,
      particles: true,
      customColors: null
    }
    setTempSettings(defaultSettings)
    setSettings(defaultSettings)
    setTheme('romantic-blush')
  }

  return (
    <div className="settings-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Customization Studio ✨</h1>
          <p className="page-subtitle">
            Create your perfect romantic atmosphere with beautiful themes and effects
          </p>
        </div>

        {showSaveMessage && (
          <div className="save-message">
            <span>💖</span>
            Settings saved successfully!
          </div>
        )}

        <div className="settings-grid">
          {/* Theme Gallery */}
          <div className="settings-card theme-gallery-card">
            <div className="card-header">
              <h3>🎨 Theme Gallery</h3>
              <p>Choose from our collection of beautiful romantic themes</p>
            </div>

            <div className="theme-gallery">
              {themes.map(themeOption => (
                <label key={themeOption.id} className={`theme-card ${theme === themeOption.id ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value={themeOption.id}
                    checked={theme === themeOption.id}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                  <div className="theme-preview">
                    <div className="theme-icon">{themeOption.icon}</div>
                    <div className="theme-colors">
                      {themeOption.colors.map((color, index) => (
                        <span key={index} style={{ backgroundColor: color }}></span>
                      ))}
                    </div>
                    <div className="theme-info">
                      <span className="theme-name">{themeOption.name}</span>
                      <span className="theme-description">{themeOption.description}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Visual Effects */}
          <div className="settings-card">
            <div className="card-header">
              <h3>✨ Visual Effects</h3>
              <p>Enhance your experience with beautiful animations</p>
            </div>

            <div className="effects-options">
              <div className="effect-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={tempSettings.animations}
                    onChange={handleAnimationsToggle}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  <div className="toggle-content">
                    <span className="toggle-title">🎭 Smooth Animations</span>
                    <span className="toggle-description">Enable floating hearts, transitions, and hover effects</span>
                  </div>
                </label>
              </div>

              <div className="effect-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={tempSettings.particles}
                    onChange={handleParticlesToggle}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  <div className="toggle-content">
                    <span className="toggle-title">🌟 Floating Particles</span>
                    <span className="toggle-description">Beautiful floating particles that match your theme</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="settings-card">
            <div className="card-header">
              <h3>📸 Couple's Photo</h3>
              <p>Add your special photo to the dashboard</p>
            </div>

            <div className="photo-upload-section">
              {tempSettings.couplePhoto ? (
                <div className="photo-preview">
                  <img src={tempSettings.couplePhoto} alt="Couple" />
                  <div className="photo-overlay">
                    <button
                      onClick={() => setTempSettings(prev => ({ ...prev, couplePhoto: null }))}
                      className="remove-photo-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="photo-placeholder">
                  <span className="photo-icon">💕</span>
                  <p>No photo uploaded</p>
                </div>
              )}

              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="photo-input"
              />
              <label htmlFor="photo-upload" className="btn btn-secondary">
                <span>📷</span>
                {tempSettings.couplePhoto ? 'Change Photo' : 'Upload Photo'}
              </label>
            </div>
          </div>



          {/* Anniversary Date */}
          <div className="settings-card">
            <div className="card-header">
              <h3>💕 Anniversary Date</h3>
              <p>Set your special date for countdown</p>
            </div>

            <div className="anniversary-section">
              <input
                type="date"
                value={tempSettings.anniversaryDate || ''}
                onChange={(e) => handleAnniversaryChange(e.target.value)}
                className="anniversary-input"
              />
              {tempSettings.anniversaryDate && (
                <div className="anniversary-preview">
                  <span className="anniversary-icon">💖</span>
                  <span>Next anniversary: {new Date(tempSettings.anniversaryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button onClick={resetSettings} className="btn btn-secondary">
            <span>🔄</span>
            Reset to Default
          </button>
          <button onClick={saveSettings} className="btn btn-primary">
            <span>💾</span>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
