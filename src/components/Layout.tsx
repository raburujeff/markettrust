import { NavLink, Outlet } from 'react-router-dom'
import { ConnectionBanner } from './ConnectionBanner'

export function Layout() {
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ConnectionBanner />
      <header className="site-header">
        <div className="shell site-header-inner">
          <NavLink to="/" className="brand">
            Market<span>Trust</span>
          </NavLink>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/ask" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Ask
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Report
            </NavLink>
            <NavLink
              to="/cases"
              className={({ isActive }) => (isActive ? 'active hide-sm' : 'hide-sm')}
            >
              Cases
            </NavLink>
            <NavLink to="/ask" className="nav-cta">
              Try the demo
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main" className="page-main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell site-footer-inner">
          <p>MarketTrust — civic answers you can verify before you act</p>
        </div>
      </footer>
    </div>
  )
}
