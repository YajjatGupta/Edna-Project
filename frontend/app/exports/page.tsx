"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";

// ------------------ Header Component ------------------
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
          {/* This is the div that you want to put the image in */}
          <div className="h-10 w-auto">
            <Image
              src="/logos/logo9.png" // The path is correct
              alt="Taon AI Logo"
              width={38}
              height={10}
              className="object-contain"
            />
          </div>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Local Footer component as provided
const LocalFooter = () => (
    <footer
      className={`w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background mt-20 transition-opacity duration-700`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground text-xl font-semibold">TaxonAI</h3>
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
          <p className="text-foreground/80 text-sm">+91 9120731190</p>
          <p className="text-foreground/80 text-sm">support@gmail.com</p>
          <p className="text-foreground/80 text-sm">Greater Noida</p>
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
);

export default function ExportsPage() {
  const [isFolderEmpty, setIsFolderEmpty] = useState(true);

  // Fetch the folder status from the backend API
  useEffect(() => {
    const checkFolderStatus = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/check-uploads");
        const data = await res.json();
        // Update state based on the backend response
        setIsFolderEmpty(data.is_empty);
      } catch (err) {
        console.error("Failed to check folder status:", err);
        // On error, assume the folder is empty to provide the upload option
        setIsFolderEmpty(true);
      }
    };

    checkFolderStatus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-8 px-6 md:px-12">
        {!isFolderEmpty ? (
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
            {/* Raw Data */}
            <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-start min-h-[320px]">
              <h3 className="text-lg font-semibold">Raw Data</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download unprocessed or minimally processed data
              </p>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground font-semibold mt-6"
              >
                <a href="/downloads/eDNA_testing.fasta" download>
                  Download FASTA file
                </a>
              </Button>
            </div>

            {/* Processed Reports */}
            <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-start min-h-[320px]">
              <h3 className="text-lg font-semibold">Processed Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download data after taxonomic classification and abundance analysis
              </p>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground font-semibold mt-6"
              >
                <a href="/downloads/data.txt" download>
                  Download txt file
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h2 className="text-3xl font-bold mb-4">No Data Available for Export</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Please go to the upload page and run an analysis first.
            </p>
            <Link href="/upload-data">
              <Button size="lg">Go to Upload Page</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <LocalFooter />
    </div>
  );
}