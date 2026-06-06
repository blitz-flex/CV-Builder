import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import TemplatePicker from './components/TemplatePicker'
import CVForm from './components/CVForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/templates" element={<TemplatePicker />} />
        <Route path="/create" element={<CVForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
