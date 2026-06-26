import { UserProfileCard } from '@/components/user/UserProfileCard';

export function Profile() {
  return (
    <section className="page">
      <header className="page__header">
        <h1>Profile</h1>
        <p className="page__subtitle">Your account details and access level.</p>
      </header>

      <UserProfileCard />
    </section>
  );
}
