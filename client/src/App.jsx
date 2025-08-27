import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMembers from './pages/AddMembers.jsx'
import CallGroup from './pages/CallGroup.jsx'
import GroupList from './pages/GroupList.jsx'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MainMenu from './pages/MainMenu.jsx'

import './App.css'

function App() {
	return (
		<div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MainMenu" element={<MainMenu />} />
		   <Route path="/AddMembers" element={<AddMembers />} />
		   <Route path="/CallGroup" element={<CallGroup />} />
		   <Route path="/GroupList" element={<GroupList />} />
        </Routes>
      </main>
      <Footer />
    </div>
	)
}

export default App
