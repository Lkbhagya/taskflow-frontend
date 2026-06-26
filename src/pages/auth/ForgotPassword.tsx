import { Link } from 'react-router-dom';

export function ForgotPassword() {
  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <h1 className="auth-card__title">Reset password</h1>
        <p className="auth-card__subtitle">Password recovery will be available soon.</p>
      </header>

      <div className="alert alert--info">
        This placeholder is prepared for a future forgot-password integration.
      </div>

      <footer className="auth-card__footer">
        <Link to="/login" className="auth-card__link auth-card__link--emphasis">
          Back to sign in
        </Link>
      </footer>
    </div>
  );
}
