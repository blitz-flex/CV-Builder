import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight, CheckCircle2, Layout, Zap, ShieldCheck, FileDown } from 'lucide-react'
import '../styles/welcome/Welcome.css'
import '../styles/welcome/HeroMockup.css'
import '../styles/welcome/WelcomeFeatures.css'

function Welcome() {
  const navigate = useNavigate()
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="welcome">
      <div className="subtle-bg">
        <div className="gradient-sphere"></div>
        <div className="grid-subtle"></div>
      </div>

      <div className="content">
        <div className="left">
          <div className="brand">
            <div className="brand-icon">
              <FileText size={24} color="white" />
            </div>
            <span>CV Builder</span>
          </div>

          <h1><span className="highlight-text">Elevate</span> Your Professional Future</h1>

          <p className="intro">
            Transform your past achievements into future opportunities. Build a
            resume that tells a more powerful story of your success.
          </p>

          <div className="small-features">
            <div className="s-feature">
              <Layout size={18} />
              <span>Modern Layouts</span>
            </div>
            <div className="s-feature">
              <ShieldCheck size={18} />
              <span>ATS Friendly</span>
            </div>
            <div className="s-feature">
              <FileDown size={18} />
              <span>PDF Export</span>
            </div>
          </div>

          <div className="actions">
            <button className="start-btn" onClick={() => navigate('/create')}>
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <div className="trust">
              <CheckCircle2 size={16} />
              <span>No registration required</span>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="mockup-view">
            <div className="paper-wrapper">
              <div className="paper-modern" key={animKey}>
                <div className="p-layout">
                  <div className="p-sidebar">
                    <div className="p-avatar"></div>
                    <div className="p-side-section">
                      <div className="p-line p-side-title"></div>
                      <div className="p-pills">
                        <div className="p-pill"></div>
                        <div className="p-pill"></div>
                        <div className="p-pill"></div>
                      </div>
                    </div>
                    <div className="p-side-section">
                      <div className="p-line p-side-title"></div>
                      <div className="p-line p-side-full"></div>
                      <div className="p-line p-side-full"></div>
                    </div>
                  </div>

                  <div className="p-main">
                    <div className="p-header-top">
                      <div className="p-line p-main-title"></div>
                      <div className="p-line p-sub-title"></div>
                    </div>

                    <div className="p-body-content">
                      <div className="p-section">
                        <div className="p-line p-section-title"></div>
                        <div className="p-line p-full-width"></div>
                        <div className="p-line p-mid-width"></div>
                      </div>

                      <div className="p-section">
                        <div className="p-line p-section-title"></div>
                        <div className="p-line p-full-width"></div>
                        <div className="p-line p-mid-width"></div>
                      </div>

                      <div className="p-section">
                        <div className="p-line p-section-title"></div>
                        <div className="p-line p-full-width"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paper-shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
