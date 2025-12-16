import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import ContentSearch from './pages/ContentSearch'
import LmsSampleJson from './pages/LmsSampleJson'
import ScopeTest from './pages/ScopeTest'

function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link 
          to="/content-search" 
          className={location.pathname === '/content-search' ? 'nav-link active' : 'nav-link'}
        >
          콘텐츠 & 챕터 검색
        </Link>
        <Link 
          to="/lms-sample" 
          className={location.pathname === '/lms-sample' ? 'nav-link active' : 'nav-link'}
        >
          LMS Sample JSON
        </Link>
        <Link 
          to="/scope-test" 
          className={location.pathname === '/scope-test' ? 'nav-link active' : 'nav-link'}
        >
          Scope/Group Manager
        </Link>
      </div>
    </nav>
  )
}

function App() {
  // GitHub Pages base 경로와 일치시킴
  const basename = import.meta.env.BASE_URL || '/lms-test/'
  
  return (
    <BrowserRouter basename={basename}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/content-search" replace />} />
        <Route path="/content-search" element={<ContentSearch />} />
        <Route path="/lms-sample" element={<LmsSampleJson />} />
        <Route path="/scope-test" element={<ScopeTest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
