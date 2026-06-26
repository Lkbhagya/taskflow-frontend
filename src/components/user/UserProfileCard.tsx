import { Badge } from '@/components/common/Badge';
import { useAuth } from '@/hooks/useAuth';

export function UserProfileCard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-card card-panel">
      <div className="profile-card__header">
        <span className="profile-card__avatar" aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <h2>{user.name}</h2>
          <Badge variant="role">{user.role}</Badge>
        </div>
      </div>

      <dl className="profile-card__details">
        <div>
          <dt>User ID</dt>
          <dd>{user.id}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{user.role === 'ADMIN' ? 'Administrator' : 'Team Member'}</dd>
        </div>
        <div>
          <dt>Access Level</dt>
          <dd>
            {user.role === 'ADMIN'
              ? 'Full task management and user administration'
              : 'Personal and assigned tasks only'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
