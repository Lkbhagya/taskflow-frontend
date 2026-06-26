import { UserList } from '@/components/user/UserList';

export function Users() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-1">
      <header className="page__header">
        <h1>Users</h1>
        <p className="page__subtitle">Manage team members and role assignments.</p>
      </header>

      <UserList />
    </section>
  );
}
