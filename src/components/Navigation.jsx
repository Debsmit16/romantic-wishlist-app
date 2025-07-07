import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/wishlist', icon: '🎁', label: 'Wishlist' },
    { path: '/add-wish', icon: '✨', label: 'Add Wish' },
    { path: '/open-when', icon: '💌', label: 'Open When' },
    { path: '/secret-planner', icon: '🤫', label: 'Secret' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
