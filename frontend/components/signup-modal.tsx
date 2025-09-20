// components/signup-modal.tsx
import React, { useState } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onSwitchToLogin: () => void;
  onClose: () => void;
  onSignup?: (email: string, password: string, confirmPassword: string) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onSwitchToLogin, onClose, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignup) {
      onSignup(email, password, confirmPassword); // call backend handler
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card text-foreground p-8 rounded-lg shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{' '}
          <a href="#" onClick={onSwitchToLogin} className="text-primary hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
