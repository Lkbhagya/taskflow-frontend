import { useEffect, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { LoadingState } from '@/components/common/LoadingState';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { USE_MOCK_API } from '@/utils/config';
import { useToast } from '@/components/ui/Toast';
import type { AppUser } from '@/types/user';

export function UserList() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (USE_MOCK_API) {
          setUsers(authService.getMockUsers());
        } else {
          const data = await userService.getUsers();
          if (mounted) setUsers(data);
        }
      } catch (err) {
        // fallback to mock
        setUsers(authService.getMockUsers());
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleRole = async (user: AppUser) => {
    setUpdatingUserId(user.id);

    const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';

    try {
      const updatedUser = await userService.updateUserRole(user.id.toString(), nextRole);
      setUsers((current) => current.map((entry) => (entry.id === updatedUser.id ? updatedUser : entry)));
      toast.addToast({
        title: `Role updated to ${updatedUser.role}`,
        description: `${updatedUser.name} is now ${updatedUser.role.toLowerCase()}.`,
        variant: 'success',
      });
    } catch (err) {
      toast.addToast({
        title: 'Role update failed',
        description: err instanceof Error ? err.message : 'Unable to update role.',
        variant: 'error',
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading users..." />;
  }

  return (
    <div className="user-list card-panel">
      <div className="overflow-x-auto flex justify-center">
        <table className="task-table w-full max-w-5xl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge variant="role">{user.role}</Badge>
              </td>
              <td className="text-right">
                <Button
                  size="sm"
                  variant={user.role === 'ADMIN' ? 'danger' : 'secondary'}
                  isLoading={updatingUserId === user.id}
                  onClick={() => handleToggleRole(user)}
                >
                  {user.role === 'ADMIN' ? 'Revoke Admin' : 'Make Admin'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
