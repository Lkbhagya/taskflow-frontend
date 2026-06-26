import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__background" aria-hidden="true">
        <div className="auth-layout__orb auth-layout__orb--one" />
        <div className="auth-layout__orb auth-layout__orb--two" />
        <div className="auth-layout__grid" />
      </div>
      <main className="auth-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
