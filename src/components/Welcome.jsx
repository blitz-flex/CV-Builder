import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight, Sparkles, Download, Edit3 } from 'lucide-react'
import '../styles/Welcome.css'

function Welcome() {
  const navigate = useNavigate()
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey(prev => prev + 1)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="welcome">
      <div className="content">
        <div className="left">
          <div className="brand">
            <FileText size={36} strokeWidth={2.5} />
            <span>CV Builder</span>
          </div>
          
          <h1>Create Your Perfect CV in Seconds</h1>
          
          <p className="intro">
            Professional resume for your career success. 
            Completely free, simple and fast.
          </p>

          <div className="highlights">
            <div className="highlight">
              <Sparkles size={20} />
              <span>Professional</span>
            </div>
            <div className="highlight">
              <Edit3 size={20} />
              <span>Easy to use</span>
            </div>
            <div className="highlight">
              <Download size={20} />
              <span>PDF Export</span>
            </div>
          </div>

          <button className="start-btn" onClick={() => navigate('/create')}>
            Get Started Free
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="right">
          <div className="mockup">
            <div className="paper">
              <div className="paper-content" key={animKey}>
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
      </div>
    </div>
  )
}

export default Welcome
