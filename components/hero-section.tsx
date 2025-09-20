// components/hero-section.tsx
import React from "react"
import { Button } from "@/components/ui/button"
import { Header } from "./header"

// Add a prop type for the handler function
interface HeroSectionProps {
  onGetStarted: () => void;
}

// Update the component signature to accept the new prop
export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section
      className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4
           w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0"
    >
      {/* SVG Background (no changes) */}
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* ... all your SVG code goes here ... */}
        </svg>
      </div>

      {/* Header (no changes) */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header onGetStartedClick={openSignupModal} />
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-16 md:mt-[120px] lg:mt-[160px] px-4">
        <h1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
          Edna Biodiversity
        </h1>
        <p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto">
          Identifying Taxonomy and Assesing Biodiversity from eDna Datasets using AI
        </p>
      </div>

      {/* This Button now triggers the modal */}
      <Button
        onClick={onGetStarted}
        className="relative z-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10"
      >
        Get Started
      </Button>
    </section>
  )
}