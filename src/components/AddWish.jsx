import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddWish.css'

const AddWish = ({ addWish }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Home',
    priority: '✨',
    status: 'Still want 🛍️',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Home', 'Fashion', 'Beauty', 'Books', 'Tech', 
    'Experiences', 'Accessories', 'Jewelry', 'Art', 'Other'
  ]

  const priorities = [
    { value: '💖', label: 'High Priority', description: 'Really want this!' },
    { value: '✨', label: 'Medium Priority', description: 'Would be nice to have' },
    { value: '💫', label: 'Low Priority', description: 'Someday maybe' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a title for your wish!')
      return
    }

    setIsSubmitting(true)
    
    // Simulate a brief loading time for better UX
    setTimeout(() => {
      addWish(formData)
      setIsSubmitting(false)
      navigate('/wishlist')
    }, 500)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="add-wish-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add New Wish ✨</h1>
          <p className="page-subtitle">
            What beautiful dream would you like to add to your collection?
          </p>
        </div>

        <div className="add-wish-form-container">
          <form onSubmit={handleSubmit} className="add-wish-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Wish Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="What's your heart's desire?"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input form-textarea"
                placeholder="Tell me more about this wish... colors, style, why you want it 💕"
                rows="4"
              />
            </div>

            {/* Category and Priority Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <div className="priority-options">
                  {priorities.map(priority => (
                    <label key={priority.value} className="priority-option">
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={handleInputChange}
                        className="priority-radio"
                      />
                      <div className="priority-content">
                        <span className="priority-emoji">{priority.value}</span>
                        <div className="priority-text">
                          <span className="priority-label">{priority.label}</span>
                          <span className="priority-description">{priority.description}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Add a Picture (Optional)
              </label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
                <label htmlFor="image" className="image-upload-label">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <div className="image-overlay">
                        <span>Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <span className="upload-icon">📸</span>
                      <span>Click to add a photo</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="Still want 🛍️">Still want 🛍️</option>
                <option value="Surprise me 💌">Surprise me 💌</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-heart">💖</span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Add to Wishlist
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddWish
