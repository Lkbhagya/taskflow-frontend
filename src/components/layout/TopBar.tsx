import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar__info">
        <p className="topbar__greeting">Welcome back, {user?.name ?? 'User'}</p>
        <p className="topbar__subtitle">Manage your team workflow efficiently</p>
      </div>

      <div className="topbar__actions">
        <div className="topbar__profile">
          <span className="topbar__avatar" aria-hidden="true">
            {user?.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="topbar__name">{user?.name}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
