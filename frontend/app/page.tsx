"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { BentoSection } from "@/components/bento-section";
import { LargeTestimonial } from "@/components/large-testimonial";
import { TestimonialGridSection } from "@/components/testimonial-grid-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";
import LoginModal from "@/components/login-modal";
import SignupModal from "@/components/signup-modal";
import Header from "@/components/header";

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state from localStorage on initial render
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // New logic: Clear local storage when the tab is closed
  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("isLoggedIn");
    };

    window.addEventListener("beforeunload", handleTabClose);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

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

  // --- Signup handler ---
  const handleSignup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirm_password: confirmPassword }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // persist login state
        closeModal();
        console.log("User signed up successfully!");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  // --- Login handler ---
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // persist login state
        closeModal();
        console.log("User signed in successfully!");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // --- Logout handler (optional) ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // clear persistence
    console.log("User logged out");
  };

  // --- Handler for button clicks after login/signup ---
  const handleUploadDataClick = () => {
    router.push("/upload-data");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <Header
          onGetStartedClick={openSignupModal}
          isLoggedIn={isLoggedIn}
          onLoginClick={openLoginModal}
          onUploadClick={handleUploadDataClick}
        />
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection 
            onGetStarted={openSignupModal} 
            isLoggedIn={isLoggedIn}
            onUploadClick={handleUploadDataClick}
          />
          <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <BentoSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>
        <AnimatedSection id="testimonials-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
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