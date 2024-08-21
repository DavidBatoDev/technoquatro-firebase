import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/feed' element={<h1>Feed</h1>} />
      </Routes>
    </Router>
  )
}

export default App
