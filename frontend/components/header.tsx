"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Sun } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  isLoggedIn: boolean;
  onGetStartedClick: () => void;
  onLoginClick: () => void;
  onUploadClick: () => void;
}

const Header = ({ isLoggedIn, onGetStartedClick, onLoginClick, onUploadClick }: HeaderProps) => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/exports" },
  ];

  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="text-2xl font-bold">eDNA</span>
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* <Button className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hidden md:block">
          <Sun className="h-5 w-5" />
        </Button> */}
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
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-lg py-2"
                >
                  {item.name}
                </Link>
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
