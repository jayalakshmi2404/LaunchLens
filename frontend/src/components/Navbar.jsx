import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Navbar.css'

const links = [
  { to: '/', label: 'Project Input' },
  { to: '/risk-assessment', label: 'Risk Assessment' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <img src={logo} alt="LaunchLens logo" className="brand-mark" />
          <span className="brand-name">LaunchLens</span>
        </div>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
