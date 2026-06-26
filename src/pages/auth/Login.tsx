import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Checkbox } from '@/components/common/Checkbox';
import { Input } from '@/components/common/Input';
import { useAuth } from '@/hooks/useAuth';
import {
  validateEmail,
  validateLoginForm,
  validatePassword,
  type LoginFormErrors,
} from '@/utils/validation';

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === 'email') {
      const result = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: result.isValid ? undefined : result.message }));
    }

    if (field === 'password') {
      const result = validatePassword(password);
      setErrors((prev) => ({
        ...prev,
        password: result.isValid ? undefined : result.message,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    setTouched({ email: true, password: true });

    const validationErrors = validateLoginForm({ email, password });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await login({ email: email.trim(), password, rememberMe });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to sign in.');
    }
  };

  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <div className="auth-card__logo" aria-hidden="true">
          TF
        </div>
        <h1 className="auth-card__title">TaskFlow</h1>
        <p className="auth-card__subtitle">Sign in to manage your team workflow</p>
      </header>

      <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
        {submitError ? (
          <div className="alert alert--error" role="alert">
            {submitError}
          </div>
        ) : null}

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : undefined}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : undefined}
        />

        <div className="auth-card__options">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <Link to="/forgot-password" className="auth-card__link">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <footer className="auth-card__footer">
        <p>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="auth-card__link auth-card__link--emphasis">
            Register
          </Link>
        </p>
      </footer>
    </div>
  );
}
