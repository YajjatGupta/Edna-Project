"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, User } from "lucide-react"; // only icons
import Link from "next/link"; // correct Link import

function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/exports" },
  ];

  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold">eDNA</span>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hidden md:block">
            <User className="h-5 w-5" />
          </Button>
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
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-lg py-2"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default function ExportsPage() {
  const [showFooter, setShowFooter] = useState(false);

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} data...`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-8 px-6 md:px-12">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
          {/* Raw Data */}
          <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-between min-h-[320px]">
            <div>
              <h3 className="text-lg font-semibold">Raw Data</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download unprocessed or minimally processed data
              </p>
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
              </div>
            </div>
            <Button
              onClick={() => handleExport("raw")}
              className="w-full bg-primary text-primary-foreground font-semibold mt-4"
            >
              Download FASTA file
            </Button>
          </div>

          {/* Processed Reports */}
          <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-between min-h-[320px]">
            <div>
              <h3 className="text-lg font-semibold">Processed Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download data after taxonomic classification and abundance
                analysis
              </p>
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
              </div>
            </div>
            <Button
              onClick={() => handleExport("processed")}
              className="w-full bg-primary text-primary-foreground font-semibold mt-4"
            >
              Download FASTA file
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background mt-20 transition-opacity duration-700 ${
          showFooter ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-foreground text-xl font-semibold">eDNA</h3>
            <p className="text-foreground/80 text-sm font-normal">
              Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xl font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/upload-data" className="text-foreground/80 text-sm font-normal hover:underline">
                Upload
              </Link>
              <Link href="/" className="text-foreground/80 text-sm font-normal hover:underline">
                Home
              </Link>
              <Link href="/analysis-results" className="text-foreground/80 text-sm font-normal hover:underline">
                Taxonomy Result
              </Link>
              <Link href="/exports" className="text-foreground/80 text-sm font-normal hover:underline">
                Export
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xl font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p className="text-foreground/80 text-sm font-normal">+91 9120731190</p>
              <p className="text-foreground/80 text-sm font-normal">support@gmail.com</p>
              <p className="text-foreground/80 text-sm font-normal">Greater Noida</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xl font-semibold">Newsletter</h3>
            <p className="text-foreground/80 text-sm font-normal">Subscribe to our Newsletter</p>
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="email"
                placeholder="Enter your Email"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
