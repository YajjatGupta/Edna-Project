// components/login-modal.tsx
import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onSwitchToSignup: () => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onSwitchToSignup, onClose }) => {
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <a href="#" onClick={onSwitchToSignup} className="text-primary hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;