"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Sun, User } from "lucide-react"; // Added Sun and User icons

export default function ExportsPage() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Biodiversity Insights", href: "/biodiversity-insights" },
    { name: "Exports", href: "/exports" },
  ];

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} data...`);
    // NOTE: alert() has been replaced with a console log for functionality
    // in this environment. You can implement a custom modal or message
    // box here for a better user experience.
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between p-4 px-8 border-b border-border mb-8">
        <h1 className="text-2xl font-bold">eDNA</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:underline">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Sun size={20} className="text-foreground cursor-pointer" />
            <User size={20} className="text-foreground cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center pt-8">
        <main className="w-full max-w-4xl p-6 bg-card rounded-lg border border-border shadow-lg space-y-6 flex flex-col md:flex-row gap-6 items-stretch">
          {/* Raw Data section */}
          <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-between">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
            <Button
              onClick={() => handleExport("raw")}
              className="w-full bg-primary text-primary-foreground font-semibold mt-4"
            >
              Download FASTA file
            </Button>
          </div>

          {/* Processed Reports section */}
          <div className="flex-1 p-6 border border-border rounded-lg bg-background flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Processed Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Download data after taxonomic classification and abundance analysis
              </p>
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
            <Button
              onClick={() => handleExport("processed")}
              className="w-full bg-primary text-primary-foreground font-semibold mt-4"
            >
              Download FASTA file
            </Button>
          </div>
        </main>
      </div>

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
  );
}
