import React, { useState } from 'react'
import './OpenWhen.css'

const OpenWhen = () => {
  const [openWhenNotes, setOpenWhenNotes] = useState([
    {
      id: 1,
      title: "Open when you're feeling sad",
      message: "Remember that you are loved beyond measure. Every storm passes, and you are stronger than you know. I'm here for you always. 💕",
      isOpened: false,
      emoji: "😢"
    },
    {
      id: 2,
      title: "Open on your birthday",
      message: "Happy birthday to the most amazing person in my world! Today we celebrate you and all the joy you bring to my life. Here's to another year of beautiful memories together! 🎂✨",
      isOpened: false,
      emoji: "🎂"
    },
    {
      id: 3,
      title: "Open when you miss me",
      message: "Distance means nothing when someone means everything. Close your eyes and feel my love surrounding you. We'll be together soon! 💖",
      isOpened: false,
      emoji: "💔"
    },
    {
      id: 4,
      title: "Open when you need motivation",
      message: "You are capable of amazing things! Your dreams are valid and achievable. I believe in you completely. Go out there and show the world how incredible you are! 🌟",
      isOpened: false,
      emoji: "💪"
    },
    {
      id: 5,
      title: "Open when you can't sleep",
      message: "Let my love be your lullaby tonight. Think of all our beautiful memories and dream of all the adventures yet to come. Sweet dreams, my love. 🌙",
      isOpened: false,
      emoji: "🌙"
    }
  ])

  const [newNote, setNewNote] = useState({
    title: '',
    message: '',
    emoji: '💕'
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const openNote = (id) => {
    setOpenWhenNotes(prev => 
      prev.map(note => 
        note.id === id ? { ...note, isOpened: true } : note
      )
    )
  }

  const addNewNote = () => {
    if (newNote.title && newNote.message) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        message: newNote.message,
        emoji: newNote.emoji,
        isOpened: false
      }
      setOpenWhenNotes(prev => [...prev, note])
      setNewNote({ title: '', message: '', emoji: '💕' })
      setShowAddForm(false)
    }
  }

  const deleteNote = (id) => {
    setOpenWhenNotes(prev => prev.filter(note => note.id !== id))
  }

  const resetNote = (id) => {
    setOpenWhenNotes(prev => 
      prev.map(note => 
        note.id === id ? { ...note, isOpened: false } : note
      )
    )
  }

  const emojiOptions = ['💕', '💖', '💝', '🌟', '🌙', '🎂', '😢', '💪', '🌈', '✨', '🦋', '🌸']

  return (
    <div className="open-when-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Open When... 💌</h1>
          <p className="page-subtitle">
            Special messages for special moments
          </p>
        </div>

        {/* Add New Note Button */}
        <div className="add-note-section">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary add-note-btn"
          >
            <span>✨</span>
            {showAddForm ? 'Cancel' : 'Create New Note'}
          </button>
        </div>

        {/* Add Note Form */}
        {showAddForm && (
          <div className="add-note-form">
            <div className="form-group">
              <label>Note Title</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Open when..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                value={newNote.message}
                onChange={(e) => setNewNote(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Your loving message..."
                className="form-input form-textarea"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Emoji</label>
              <div className="emoji-selector">
                {emojiOptions.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setNewNote(prev => ({ ...prev, emoji }))}
                    className={`emoji-option ${newNote.emoji === emoji ? 'selected' : ''}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button onClick={addNewNote} className="btn btn-primary">
                <span>💝</span>
                Create Note
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="notes-grid">
          {openWhenNotes.map(note => (
            <div key={note.id} className={`note-card ${note.isOpened ? 'opened' : ''}`}>
              <div className="note-front">
                <div className="note-emoji">{note.emoji}</div>
                <h3 className="note-title">{note.title}</h3>
                <button
                  onClick={() => openNote(note.id)}
                  className="open-note-btn"
                  disabled={note.isOpened}
                >
                  {note.isOpened ? 'Opened 💖' : 'Open Note 💌'}
                </button>
              </div>

              {note.isOpened && (
                <div className="note-back">
                  <div className="note-message">
                    <p>{note.message}</p>
                  </div>
                  <div className="note-actions">
                    <button
                      onClick={() => resetNote(note.id)}
                      className="btn btn-sm btn-secondary"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="btn btn-sm delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="notes-stats">
          <div className="stat-item">
            <span className="stat-number">{openWhenNotes.length}</span>
            <span className="stat-label">Total Notes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {openWhenNotes.filter(note => note.isOpened).length}
            </span>
            <span className="stat-label">Opened</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {openWhenNotes.filter(note => !note.isOpened).length}
            </span>
            <span className="stat-label">Waiting</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenWhen
