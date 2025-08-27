import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/ourlogo.png';

function Header() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="KK Ministries Church logo" className="brand-logo" />
            <span className="brand-text"> Ministries Church</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MainMenu">
                  Call
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile app-like top bar with logo */}
      <div className="mobile-appbar" role="banner">
        <div className="appbar-inner">
          <img src={logo} alt="App logo" className="appbar-logo" />
          <span className="appbar-title">Church Call App</span>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="mobile-bottom-nav" role="navigation" aria-label="Primary">
        <Link className={`bottom-item ${isActive('/')}`} to="/">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>
        <Link className={`bottom-item ${isActive('/MainMenu')}`} to="/MainMenu">
          <i className="fa-solid fa-gear"></i>
          <span>call</span>
        </Link>
        
      </div>
    </header>
  );
}

export default Header;
