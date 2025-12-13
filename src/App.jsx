import { useState } from 'react'
import Welcome from './components/Welcome'
import CVForm from './components/CVForm'
import './styles/App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  return (
    <>
      {currentPage === 'welcome' && <Welcome onGetStarted={() => setCurrentPage('form')} />}
      {currentPage === 'form' && <CVForm />}
    </>
  )
}

export default App
