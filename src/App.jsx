import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import CVForm from './components/CVForm'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/create" element={<CVForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
