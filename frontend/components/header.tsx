"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Upload } from "lucide-react"
import Link from "next/link"

// Corrected prop interface with `isLoggedIn` and `onLoginClick`
interface HeaderProps {
  onGetStartedClick: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onUploadClick: () => void; // <-- Add this new prop
}

export function Header({ onGetStartedClick, isLoggedIn, onLoginClick, onUploadClick }: HeaderProps) {
  const navItems = [
    { name: "Features", href: "#features-section" },
    { name: "Pricing", href: "#pricing-section" },
    { name: "Testimonials", href: "#testimonials-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-foreground text-xl font-semibold">Pointer</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Conditional rendering for the desktop header button */}
          {!isLoggedIn ? (
            <Button
              onClick={onGetStartedClick}
              className="hidden md:block bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={onUploadClick} // <-- Use the new prop here
              className="hidden md:block bg-secondary text-secondary-foreground hover:bg-secondary/120 px-6 py-2 rounded-full font-medium shadow-sm"
            >
              <Upload className="mr-2 h-5 w-5" /> Upload Data
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Conditional rendering for the mobile header button */}
                {!isLoggedIn ? (
                  <Button
                    onClick={onGetStartedClick}
                    className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                  >
                    Try for Free
                  </Button>
                ) : (
                  <Button
                    onClick={onUploadClick} // <-- Use the new prop here
                    className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Data
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}