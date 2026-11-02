import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

interface DemoAccount {
  role: string;
  email: string;
  password: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: 'System Administrator', email: 'admin@example.com', password: 'admin123' },
  { role: 'Bureau Officer', email: 'officer1@example.com', password: 'officer123' },
  { role: 'Reviewing Officer', email: 'reviewer@example.com', password: 'review123' },
  { role: 'Coordination Officer', email: 'coord@example.com', password: 'coord123' },
  { role: 'Management Viewer', email: 'viewer@example.com', password: 'viewer123' },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filledFromDemo, setFilledFromDemo] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleDemoAccountSelect = (account: DemoAccount) => {
    setValue('email', account.email, { shouldValidate: true });
    setValue('password', account.password, { shouldValidate: true });
    setAuthError(null);
    setFilledFromDemo(true);
    
    // Scroll to form on mobile
    const formElement = document.getElementById('login-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (e: any) {
      setAuthError(e.message || 'Authentication failed. Please check your credentials.');
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-synapse-background px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* SYNAPSE Logo & Branding */}
        <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-radius-lg bg-synapse-accent-light mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-synapse-accent">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-h2 text-synapse-text-primary font-semibold tracking-tight">SYNAPSE</h1>
          <p className="text-body-sm text-synapse-text-secondary mt-1">Enterprise Coordination Platform</p>
        </div>

        {/* Login Form Card */}
        <div className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '100ms' }} id="login-form">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-h3 text-synapse-text-primary font-semibold">Welcome back</h2>
            <p className="text-body text-synapse-text-secondary mt-2 text-balance">
              Sign in to access your workspace and continue where you left off.
            </p>
          </div>

          {/* Auth Error */}
          {authError && (
            <div 
              className="mb-6 flex items-start gap-3 p-3 rounded-radius-md bg-synapse-error-light border border-synapse-error/20 animate-slide-up"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 text-synapse-error mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-synapse-error">{authError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-5">
            {/* Email Field */}
            <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register('email')}
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="you@organization.com"
                disabled={isSubmitting}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-body-sm text-synapse-error flex items-center gap-1.5" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  {...register('password')}
                  className={`input pr-12 ${errors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-synapse-text-muted hover:text-synapse-text-secondary active:text-synapse-text-primary transition-colors duration-fast p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-body-sm text-synapse-error flex items-center gap-1.5" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="btn-primary w-full py-3 text-body-lg disabled:opacity-40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ChevronRight className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Demo Access Section */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-synapse-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-synapse-background text-synapse-text-muted font-medium">Demo Access</span>
            </div>
          </div>

          <div className="space-y-2" role="list" aria-label="Demo accounts">
            {DEMO_ACCOUNTS.map((account, index) => (
              <button
                key={account.email}
                type="button"
                onClick={() => handleDemoAccountSelect(account)}
                disabled={isSubmitting}
                className="demo-account w-full text-left p-3 rounded-radius-md bg-synapse-surface border border-synapse-border hover:border-synapse-border-strong hover:bg-synapse-surface-hover active:bg-synapse-border transition-all duration-fast ease-out-expo flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                role="listitem"
                style={{ animationDelay: `${350 + index * 30}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-radius-md bg-synapse-accent-light flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4.5 h-4.5 text-synapse-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm font-medium text-synapse-text-primary truncate">{account.role}</p>
                    <p className="text-body-sm text-synapse-text-secondary truncate">{account.email}</p>
                  </div>
                </div>
                <span className="text-caption text-synapse-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-gap duration-fast">
                  Use Demo Account
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-caption text-synapse-text-muted">
            © 2024 SYNAPSE. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;