import { useEffect, useState } from 'react';
import type { AppUser } from '@/types/user';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { USE_MOCK_API } from '@/utils/config';

interface UserSelectProps {
  label: string;
  hideLabel?: boolean;
  value?: number | null;
  onChange: (value: number | null) => void;
  error?: string;
}

export function UserSelect({ label, hideLabel = false, value, onChange, error }: UserSelectProps) {
  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (USE_MOCK_API) {
          setUsers(authService.getMockUsers().filter((entry) => entry.role === 'USER'));
        } else {
          const data = await userService.getUsers();
          if (mounted) setUsers(data.filter((entry) => entry.role === 'USER'));
        }
      } catch {
        if (mounted) setUsers([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const selectId = 'assigned-user';

  return (
    <div className="field">
      {!hideLabel ? (
        <label className="field__label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`field__control field__control--select ${error ? 'field__control--error' : ''}`}
        value={value?.toString() ?? ''}
        onChange={(event) => {
          const selected = event.target.value;
          onChange(selected ? Number(selected) : null);
        }}
      >
        <option value="">Unassigned</option>
        {users.map((user) => (
          <option key={user.id} value={user.id.toString()}>
            {user.name}
          </option>
        ))}
      </select>
      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
