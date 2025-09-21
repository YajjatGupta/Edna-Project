"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
  onGetStartedClick: () => void;
  onLoginClick: () => void;
  onUploadClick: () => void;
}

const Header = ({ isLoggedIn, onGetStartedClick, onLoginClick, onUploadClick }: HeaderProps) => {
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#testimonials-section" },
    { name: "Overview", href: "#features-section" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="text-2xl font-bold">eDNA</span>
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hidden md:block">
          <User className="h-5 w-5" />
        </Button>

        {!isLoggedIn ? (
          <Button
            onClick={onGetStartedClick}
            className="hidden md:inline-flex items-center justify-center bg-secondary text-secondary-foreground 
                       px-6 py-2 rounded-full font-medium shadow-sm text-lg
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg
                       active:scale-95"
          >
            Get Started
          </Button>
        ) : (
          <Button
            onClick={onUploadClick}
            className="hidden md:inline-flex items-center justify-center bg-secondary text-secondary-foreground 
                       px-6 py-2 rounded-full font-medium shadow-sm text-lg
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg
                       active:scale-95"
          >
            Upload Data
          </Button>
        )}

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-foreground text-lg py-2 w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              {!isLoggedIn ? (
                <Button onClick={onGetStartedClick} className="w-full mt-4 bg-secondary text-secondary-foreground">
                  Get Started
                </Button>
              ) : (
                <Button onClick={onUploadClick} className="w-full mt-4 bg-secondary text-secondary-foreground">
                  Upload Data
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
