"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";

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
              <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors">
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
                  <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground text-lg py-2">
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

export default function AnalysisResultsPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow p-8 space-y-10">
        {/* Top two boxes */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1320px] mx-auto">
          {/* Left box: Dropdown */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px]">
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

          {/* Right box: Answer */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px]">
            <h2 className="text-lg font-semibold mb-4">Taxonomic Tree</h2>
            <p className="text-muted-foreground text-sm">
              {selectedOption ? answers[selectedOption] : "NA"}
            </p>
          </div>
        </div>

        {/* 5 larger boxes */}
        <div className="flex gap-4 max-w-[1320px] mx-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 bg-card p-6 rounded-lg shadow-md cursor-pointer transform transition-transform ${
                i < 4 ? "hover:scale-105" : ""
              } min-h-[250px]`} // increased height
            >
              <p className="text-center text-sm">Box {i + 1}</p>
            </div>
          ))}
        </div>

        {/* 10 scrollable boxes */}
        <div className="overflow-x-auto max-w-[1320px] mx-auto">
          <div className="flex gap-2 w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="min-w-[140px] h-40 bg-card p-3 rounded-lg shadow-md flex items-center justify-center text-sm"
              >
                Small Box {i + 1}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
