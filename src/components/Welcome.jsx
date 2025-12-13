import { useState, useEffect } from 'react'
import { FileText, ArrowRight, CheckCircle } from 'lucide-react'
import '../styles/Welcome.css'

function Welcome({ onGetStarted }) {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="welcome">
      <div className="hero">
        <div className="logo-container">
          <FileText size={48} />
          <h1>CV Builder</h1>
        </div>
        <p className="subtitle">Create a professional CV in minutes.</p>
        
        <ul className="features">
          <li><CheckCircle size={20} /> Simple and intuitive interface</li>
          <li><CheckCircle size={20} /> Diverse selection of design templates</li>
          <li><CheckCircle size={20} /> Download in PDF format with one click</li>
        </ul>

        <button className="cta" onClick={onGetStarted}>
          Start Creating <ArrowRight size={20} />
        </button>
      </div>
      
      <div className="visual">
        <div className="cv-paper">
          <div className="cv-content" key={animationKey}>
            <div className="cv-section">
              <div className="cv-line header"></div>
              <div className="cv-line subheader"></div>
            </div>
            <div className="cv-section">
              <div className="cv-line small"></div>
              <div className="cv-line full"></div>
              <div className="cv-line full"></div>
              <div className="cv-line medium"></div>
            </div>
            <div className="cv-section">
              <div className="cv-line small"></div>
              <div className="cv-line full"></div>
              <div className="cv-line medium"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
