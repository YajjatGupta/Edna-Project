"use client"

import { Search, Menu, User, Upload } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // <-- Add this import

// Define the type for a kingdom object
type Kingdom = {
  name: string;
  details: string[];
};

// Define the Header component to be self-contained for this page
function Header() {
  const navItems = [
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/analysis-results" },
  ];
  
  // This is a simplified header for this specific page, assuming the user is logged in.
  // It does not include the full logic from our previous conversations.
  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-foreground text-xl font-semibold">eDNA</span>
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
          <Button
            onClick={() => console.log("User profile click")}
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <User className="h-5 w-5" />
          </Button>
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
                    className="text-muted-foreground hover:text-foreground justify-start text-lg py-2"
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

export default function AnalysisResultsPage() {
  const [activeKingdom, setActiveKingdom] = useState<string | null>(null);

  const handleKingdomClick = (kingdom: string) => {
    setActiveKingdom(activeKingdom === kingdom ? null : kingdom);
  };

  const kingdomData: Kingdom[] = [
    { name: 'Animalia', details: ['Phylum: Chordata', 'Class: Mammalia', 'Order: Primates'] },
    { name: 'Plantae', details: ['Division: Magnoliophyta', 'Class: Liliopsida', 'Order: Asparagales'] },
    { name: 'Bacteria', details: ['Phylum: Proteobacteria', 'Class: Gammaproteobacteria', 'Order: Enterobacteriales'] },
  ];

  const stats = [
    { label: "Total Species", value: 6, color: "from-green-400/50 to-green-600/50" },
    { label: "Total Species", value: 6, color: "from-teal-400/50 to-teal-600/50" },
    { label: "Total Species", value: 6, color: "from-purple-400/50 to-purple-600/50" },
    { label: "Total Species", value: 6, color: "from-blue-400/50 to-blue-600/50" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow p-8 bg-card">
        <div className="max-w-[1320px] mx-auto flex flex-wrap lg:flex-nowrap gap-8 mb-8">
          {/* Identified Species Card */}
          <div className="flex-1 min-w-[300px] bg-background p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Identified Species</h2>
            <p className="text-muted-foreground text-sm mb-4">Detailed list of organisms detected in your samples</p>
            <div className="relative">
              <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-border bg-card text-foreground" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>

          {/* Taxonomic Tree Card */}
          <div className="flex-1 min-w-[300px] bg-background p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Taxonomic Tree</h2>
            <p className="text-muted-foreground text-sm mb-4">Interactive hierarchical view of identified organisms</p>
            <div className="flex flex-col gap-2">
              {kingdomData.map((kingdom, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className="flex items-center justify-between p-2 cursor-pointer bg-card rounded-md hover:bg-card/80"
                    onClick={() => handleKingdomClick(kingdom.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-muted-foreground">{activeKingdom === kingdom.name ? '∨' : '>'}</span>
                      <span className="font-medium">{kingdom.name}</span>
                    </div>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">Kingdom</span>
                  </div>
                  {activeKingdom === kingdom.name && (
                    <div className="pl-6 pt-2">
                      {kingdom.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-muted-foreground mb-1">{detail}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-gradient-to-br ${stat.color} text-white`}
            >
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
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
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-[1.02]">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}