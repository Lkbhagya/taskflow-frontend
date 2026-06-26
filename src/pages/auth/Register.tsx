import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useAuth } from '@/hooks/useAuth';
import {
  validateRegisterForm,
  type RegisterFormErrors,
} from '@/utils/validation';

export function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validateRegisterForm({
      name,
      email,
      password,
      confirmPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await register({ name, email, password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed.');
    }
  };

  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <div className="auth-card__logo" aria-hidden="true">
          TF
        </div>
        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__subtitle">Join TaskFlow and start managing work</p>
      </header>

      <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
        {submitError ? (
          <div className="alert alert--error" role="alert">
            {submitError}
          </div>
        ) : null}

        <Input
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <footer className="auth-card__footer">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="auth-card__link auth-card__link--emphasis">
            Sign in
          </Link>
        </p>
      </footer>
    </div>
  );
}
