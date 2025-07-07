import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components (we'll create these)
import Home from './components/Home'
import Wishlist from './components/Wishlist'
import AddWish from './components/AddWish'
import Settings from './components/Settings'
import SecretPlanner from './components/SecretPlanner'
import OpenWhen from './components/OpenWhen'
import Navigation from './components/Navigation'
import BackgroundWrapper from './components/BackgroundWrapper'

function App() {
  const [wishes, setWishes] = useState([
    {
      id: 1,
      title: "Cozy Reading Nook",
      description: "A beautiful corner with fairy lights and soft cushions",
      category: "Home",
      priority: "💖",
      status: "Still want 🛍️",
      image: null,
      comments: [],
      dateAdded: new Date().toISOString()
    },
    {
      id: 2,
      title: "Vintage Jewelry Box",
      description: "Something with little compartments and a mirror",
      category: "Accessories",
      priority: "✨",
      status: "Surprise me 💌",
      image: null,
      comments: [],
      dateAdded: new Date().toISOString()
    }
  ])

  const [theme, setTheme] = useState('romantic-blush')
  const [settings, setSettings] = useState({
    couplePhoto: null,
    anniversaryDate: null,
    animations: true,
    particles: true,
    customColors: null
  })

  const addWish = (newWish) => {
    const wish = {
      ...newWish,
      id: Date.now(),
      comments: [],
      dateAdded: new Date().toISOString()
    }
    setWishes([...wishes, wish])
  }

  const updateWish = (id, updates) => {
    setWishes(wishes.map(wish => 
      wish.id === id ? { ...wish, ...updates } : wish
    ))
  }

  const deleteWish = (id) => {
    setWishes(wishes.filter(wish => wish.id !== id))
  }

  const addComment = (wishId, comment) => {
    setWishes(wishes.map(wish =>
      wish.id === wishId
        ? {
            ...wish,
            comments: [...wish.comments, {
              id: Date.now(),
              text: comment,
              timestamp: new Date().toISOString()
            }]
          }
        : wish
    ))
  }

  // Apply theme changes to document body (for text colors, etc.)
  useEffect(() => {
    const className = `${theme} ${settings.animations ? 'animations-enabled' : 'animations-disabled'}`
    document.body.className = className
  }, [theme, settings])

  return (
    <div className={`app ${theme} ${settings.animations ? 'animations-enabled' : 'animations-disabled'}`}>
      <BackgroundWrapper
        theme={theme}
        settings={settings}
      >
        <div />
      </BackgroundWrapper>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/wishlist" 
              element={
                <Wishlist 
                  wishes={wishes}
                  updateWish={updateWish}
                  deleteWish={deleteWish}
                  addComment={addComment}
                />
              } 
            />
            <Route 
              path="/add-wish" 
              element={<AddWish addWish={addWish} />} 
            />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  theme={theme}
                  setTheme={setTheme}
                  settings={settings}
                  setSettings={setSettings}
                />
              } 
            />
            <Route
              path="/secret-planner"
              element={<SecretPlanner wishes={wishes} />}
            />
            <Route
              path="/open-when"
              element={<OpenWhen />}
            />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </div>
  )
}

export default App
