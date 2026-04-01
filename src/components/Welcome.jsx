import { useNavigate } from 'react-router-dom'
import { Feather } from 'lucide-react'
import '../styles/welcome/Welcome.css'
import '../styles/welcome/HeroMockup.css'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome vintage-theme">
      <div className="vintage-bg">
        <div className="texture-overlay"></div>
        <div className="vignette"></div>
      </div>

      <div className="content">
        <div className="left">
          <div className="parchment-brand">
            <div className="vintage-icon-wrapper">
              <div className="feather-bg"></div>
              <Feather size={20} color="#3e2723" />
            </div>
            <span>CV Builder</span>
          </div>

          <h1 className="cinzel-title">Create Your <span className="script-accent">Perfect</span> CV in Seconds</h1>

          <p className="intro antique-font">
            Create professional resumes that command attention.
            Transform your experience into an elegant story of success
            using our timeless designs.
          </p>

          <div className="actions">
            <div className="button-frame">
              <button className="gold-btn" onClick={() => navigate('/create')}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="book-view">
            <div className="s-scroll-container">
              <div className="s-scroll-top"></div>
              <div className="s-scroll-paper">
                <div className="squiggly-lines">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`squiggly-line-wrapper line-${i}`}>
                      <svg viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M 0 6 Q 5 0 10 6 T 20 6 T 30 6 T 40 6 T 50 6 T 60 6 T 70 6 T 80 6 T 90 6 T 100 6 T 110 6 T 120 6 T 130 6 T 140 6 T 150 6 T 160 6 T 170 6 T 180 6 T 190 6 T 200 6" pathLength="100" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <div className="s-scroll-bottom"></div>

              <div className="pen-container-s">
                <div className="modern-pen">
                  <div className="pen-body">
                    <div className="pen-clip"></div>
                  </div>
                  <div className="pen-nib"></div>
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
