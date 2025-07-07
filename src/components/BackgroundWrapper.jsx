import React from 'react'
import './BackgroundWrapper.css'

const BackgroundWrapper = ({ theme, settings, children }) => {
  const getBackgroundClass = () => {
    const classes = [
      'background-wrapper',
      `theme-${theme}`,
      settings.animations ? 'animations-on' : 'animations-off',
      settings.particles ? 'particles-on' : 'particles-off'
    ]
    return classes.join(' ')
  }

  return (
    <div className={getBackgroundClass()}>
      {settings.particles && (
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 5}`} />
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

export default BackgroundWrapper
