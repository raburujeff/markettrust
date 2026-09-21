import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="app-shell">
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
      <main className="page-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell site-footer-inner">
          <p>MarketTrust — trusted civic answers for East Africa</p>
        </div>
      </footer>
    </div>
  )
}
