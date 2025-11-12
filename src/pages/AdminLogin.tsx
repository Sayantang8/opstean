
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { logger } from '@/utils/logger';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { signIn, user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Simple rate limiting - block after 5 failed attempts for 15 minutes
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    // Check for existing rate limit
    const lastFailedAttempt = localStorage.getItem('adminLoginLastFailed');
    const failedAttempts = parseInt(localStorage.getItem('adminLoginAttempts') || '0');

    if (lastFailedAttempt && failedAttempts >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - parseInt(lastFailedAttempt);
      if (timeSinceLastAttempt < BLOCK_DURATION) {
        setIsBlocked(true);
        const remainingTime = Math.ceil((BLOCK_DURATION - timeSinceLastAttempt) / 1000 / 60);
        setError(`Too many failed attempts. Try again in ${remainingTime} minutes.`);
      } else {
        // Reset attempts after block duration
        localStorage.removeItem('adminLoginAttempts');
        localStorage.removeItem('adminLoginLastFailed');
      }
    }

    setAttemptCount(failedAttempts);
  }, []);

  useEffect(() => {
    // Only redirect if we have both user and profile, and user has admin/manager role
    if (!loading && user && profile) {
      if (profile.role === 'admin' || profile.role === 'manager') {
        // Clear failed attempts on successful login
        localStorage.removeItem('adminLoginAttempts');
        localStorage.removeItem('adminLoginLastFailed');
        navigate('/admin');
      } else {
        setError('Access denied. Admin or manager role required.');
        logger.security('Unauthorized admin access attempt', {
          userEmail: user.email,
          userRole: profile.role
        });
      }
    }
  }, [user, profile, loading, navigate]);

  const validateInput = (): boolean => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleFailedAttempt = () => {
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    localStorage.setItem('adminLoginAttempts', newAttemptCount.toString());
    localStorage.setItem('adminLoginLastFailed', Date.now().toString());

    if (newAttemptCount >= MAX_ATTEMPTS) {
      setIsBlocked(true);
      setError(`Too many failed attempts. Try again in 15 minutes.`);
      logger.security('Admin login blocked due to too many attempts', {
        email: email,
        attemptCount: newAttemptCount
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      setError('Account temporarily locked. Please try again later.');
      return;
    }

    if (!validateInput()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await signIn(email.toLowerCase().trim(), password);

      if (error) {
        handleFailedAttempt();
        setError('Invalid login credentials');
        logger.security('Failed admin login attempt', {
          email: email,
          error: error.message
        });
        setIsSubmitting(false);
      } else {
        logger.info('Successful admin login', { component: 'AdminLogin' });
      }
    } catch (err) {
      handleFailedAttempt();
      setError('An unexpected error occurred. Please try again.');
      logger.error('Admin login error', err as Error, { component: 'AdminLogin' });
      setIsSubmitting(false);
    }
  };

  // Show loading spinner if auth is loading or we're submitting
  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Opstean Admin Login
          </CardTitle>
          <p className="text-gray-500">Access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {attemptCount > 0 && attemptCount < MAX_ATTEMPTS && (
              <Alert>
                <AlertDescription>
                  {MAX_ATTEMPTS - attemptCount} attempts remaining before temporary lockout.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@opstean.com"
                disabled={isSubmitting || isBlocked}
                maxLength={254}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={isSubmitting || isBlocked}
                maxLength={128}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isBlocked}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
