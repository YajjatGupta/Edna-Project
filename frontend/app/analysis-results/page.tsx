"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer-section"; // adjust the path if needed

// Sample dropdown options and corresponding answers
const options = ["Option 1", "Option 2", "Option 3"];
const answers: Record<string, string> = {
  "Option 1": "Answer for Option 1",
  "Option 2": "Answer for Option 2",
  "Option 3": "Answer for Option 3",
};

// Header Component
function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/exports" },
  ];

  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6">
      <div className="flex items-center justify-between">
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
          <Button className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
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

const LocalFooter = () => (
  <footer className="w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground text-xl font-semibold">eDNA</h3>
        <p className="text-foreground/80 text-sm font-normal">Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets</p>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-xl font-semibold">Quick Links</h3>
        <div className="flex flex-col gap-2">
          <a href="#" className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Upload</a>
          <a href="#" className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Biodiversity Insights</a>
          <a href="#" className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Taxonomy Result</a>
          <a href="#" className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Export</a>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-xl font-semibold">Contact Us</h3>
        <div className="flex flex-col gap-2">
          <p className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">+91 9120731190</p>
          <p className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">support@gmail.com</p>
          <p className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">Greater Noida</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-xl font-semibold">NewsLetter</h3>
        <p className="text-foreground/80 text-sm font-normal">Subscribe to our NewsLetter</p>
        <div className="flex flex-col gap-2 mt-2">
          <input type="email" placeholder="Enter your Email" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground" />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-[1.02]">Subscribe</button>
        </div>
      </div>
    </div>
  </footer>
);

// Main Page Component
export default function AnalysisResultsPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-10">
        {/* Top two boxes */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1320px] mx-auto">
          {/* Dropdown Box */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px] hover:scale-105 transform transition-transform duration-300">
            <h2 className="text-lg font-semibold mb-4">Identified Species</h2>
            <p className="text-muted-foreground text-sm mb-4">Select an option to see the corresponding analysis</p>
            <select
              className="w-full border border-border rounded-md p-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">-- Select --</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Answer Box */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px] hover:scale-105 transform transition-transform duration-300">
            <h2 className="text-lg font-semibold mb-4">Taxonomic Tree</h2>
            <p className="text-muted-foreground text-sm">
              {selectedOption ? answers[selectedOption] : "NA"}
            </p>
          </div>
        </div>

        {/* 5 Larger Boxes */}
        <div className="flex flex-wrap gap-6 max-w-[1320px] mx-auto justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="relative bg-card p-6 rounded-lg shadow-md min-h-[210px] flex items-center justify-center transform transition-transform duration-300 cursor-pointer hover:scale-105"
              style={
                i === 4
                  ? { marginLeft: "auto", marginRight: "auto", width: "48%", transformOrigin: "center", minHeight: "210px" }
                  : { width: "48%", transformOrigin: "center", minHeight: "210px" }
              }
            >
              {i < 4 && <span className="absolute text-4xl font-bold text-muted-foreground">+</span>}
              <p className="text-center text-sm">{`Box ${i + 1}`}</p>
            </div>
          ))}
        </div>

        {/* 10 Scrollable Boxes */}
        <div className="overflow-x-auto max-w-[1320px] mx-auto">
          <div className="flex gap-2 w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="min-w-[140px] h-40 bg-card p-3 rounded-lg shadow-md flex items-center justify-center text-sm transform transition-transform duration-300 hover:scale-105"
              >
                Small Box {i + 1}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <LocalFooter />
    </div>
  );
}