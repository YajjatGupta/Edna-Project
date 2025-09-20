"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from "@/components/hero-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { SocialProof } from "@/components/social-proof";
import { BentoSection } from "@/components/bento-section";
import { LargeTestimonial } from "@/components/large-testimonial";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialGridSection } from "@/components/testimonial-grid-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";
import LoginModal from "@/components/login-modal";
import SignupModal from "@/components/signup-modal";
import { Header } from "@/components/header";

// Note: In a real project, these interfaces would be defined within their
// respective component files (e.g., header.tsx).
interface HeaderProps {
  onGetStartedClick: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

interface HeroSectionProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Modal control ---
  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  // --- Signup handler with types ---
  const handleSignup = async (email: string, password: string, confirmPassword: string) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirm_password: confirmPassword })
      });
      const data = await res.json();
      console.log(data.message);
      if (res.status === 201) {
        closeModal();
        console.log("User signed up successfully!");
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  // --- Login handler with types ---
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.status === 200) {
        setIsLoggedIn(true);
        closeModal();
        console.log("User signed in successfully!");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // --- Check upload page access ---
  const checkUpload = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.error('Upload check error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <Header
          onGetStartedClick={openSignupModal}
          isLoggedIn={isLoggedIn}
          onLoginClick={openLoginModal}
        />
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection
            onGetStarted={openSignupModal}
            isLoggedIn={isLoggedIn}
          />
          <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[411px] md:mt-[400px]" delay={0.1}>
          <SocialProof />
        </AnimatedSection>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <BentoSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>
        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <CTASection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onSwitchToSignup={openSignupModal}
        onClose={closeModal}
        onLogin={handleLogin}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onSwitchToLogin={openLoginModal}
        onClose={closeModal}
        onSignup={handleSignup}
      />
    </div>
  );
}