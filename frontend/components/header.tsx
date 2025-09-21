"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

// Corrected prop interface with `isLoggedIn` and `onLoginClick`
interface HeaderProps {
  onGetStartedClick: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onUploadClick: () => void; // <-- New prop
}

export function Header({ onGetStartedClick, isLoggedIn, onLoginClick, onUploadClick }: HeaderProps) {
  const navItems = [
    { name: "Home", href: "#features-section" },
    { name: "Overview", href: "" },
    { name: "About Us", href: "#testimonials-section" },
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
            <img
              src="/logos/logo.png"      // Path to your logo
              alt="Pointer Logo"         // Accessibility text
              className="h-16 w-auto"    // Adjust height as needed
            />
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
          {/* Conditional rendering for desktop buttons */}
          {!isLoggedIn ? (
            <Button
              onClick={onGetStartedClick}
              className="hidden md:block bg-secondary text-secondary-foreground 
                         px-8 py-3 rounded-full font-medium shadow-sm
                         text-lg
                         transition-transform duration-300 
                         hover:scale-110 hover:shadow-xl 
                         hover:bg-secondary hover:text-secondary-foreground
                         active:scale-95"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={onUploadClick}
              className="hidden md:block bg-secondary text-secondary-foreground 
                         px-8 py-3 rounded-full font-medium shadow-sm
                         text-lg
                         transition-transform duration-300 
                         hover:scale-110 hover:shadow-xl 
                         hover:bg-secondary hover:text-secondary-foreground
                         active:scale-95 active:bg-gray-200"
            >
              Upload Data
            </Button>
          )}

          {/* Mobile Sheet menu */}
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

                {/* Conditional rendering for mobile buttons */}
                {!isLoggedIn ? (
                  <Button
                    onClick={onGetStartedClick}
                    className="w-full mt-4 bg-secondary text-secondary-foreground 
                               hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                  >
                    Try for Free
                  </Button>
                ) : (
                  <Button
                    onClick={onUploadClick}
                    className="w-full mt-4 bg-secondary text-secondary-foreground 
                               hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                  >
                    Upload Data
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
