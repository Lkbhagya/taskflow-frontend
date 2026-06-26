import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          TF
        </span>
        <span className="sidebar__name">TaskFlow</span>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {isAdmin ? (
          <NavLink to="/dashboard" className="sidebar__link">
            Dashboard
          </NavLink>
        ) : null}

        <NavLink to="/tasks" className="sidebar__link">
          {isAdmin ? 'Tasks' : 'My Tasks'}
        </NavLink>

        {isAdmin ? (
          <NavLink to="/users" className="sidebar__link">
            Users
          </NavLink>
        ) : null}

        {/* <NavLink to="/profile" className="sidebar__link">
          Profile
        </NavLink> */}
      </nav>
    </aside>
  );
}
