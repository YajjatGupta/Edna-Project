"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";

// CSV Data
const rawData = `Sequence ID,Predicted Species,Confidence,Kingdom,Phylum,Class,Order,Family,Genus,Species
1,Chilodonella uncinata,28.63%,Chromista,Ciliophora,Phyllopharyngea,Chlamydodontida,Chilodonellidae,Chilodonella,Chilodonella uncinata
2,Parvochelus russus,92.84%,Animalia,Arthropoda,Malacostraca,Decapoda,Diogenidae,Parvochelus,Parvochelus russus
3,Encephalitozoon intestinalis,5.57%,Fungi,Microsporidia,Microsporidea,Encephalitozoana,Encephalitozoonidae,Encephalitozoon,Encephalitozoon intestinalis
4,Caecitellus parvulus,21.54%,Animalia,Arthropoda,Arachnida,Sarcoptiformes,Endeostigmidae,Caecitellus,Caecitellus parvulus
5,Dasytricha ruminantium,23.83%,Protozoa,Ciliophora,Oligohymenophorea,Entodiniomorphida,Ophryoscolecidae,Dasytricha,Dasytricha ruminantium
6,Dasytricha ruminantium,18.06%,Protozoa,Ciliophora,Oligohymenophorea,Entodiniomorphida,Ophryoscolecidae,Dasytricha,Dasytricha ruminantium
7,Dasytricha ruminantium,9.39%,Protista,Ciliophora,Oligohymenophorea,Entodiniomorphida,Ophryoscolecidae,Dasytricha,Dasytricha ruminantium
8,Diutina catenulata,28.47%,Fungi,Ascomycota,Saccharomycetes,Saccharomycetales,Saccharomycetaceae,Diutina,Diutina catenulata
9,Dasytricha ruminantium,11.21%,Protozoa,Ciliophora,Litostomatea,Plagiopylida,Dasytrichidae,Dasytricha,Dasytricha ruminantium
10,Strigamia maritima,1.08%,Animalia,Arthropoda,Chilopoda,Geophilomorpha,Linotaeniidae,Strigamia,Strigamia maritima`;

// Parse CSV into array of objects
const parseCSV = (csvString: string) => {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      const cleanHeader = header.trim();
      const value = values[index].trim();
      obj[cleanHeader] = cleanHeader === "Confidence" ? parseFloat(value) : value;
      return obj;
    }, {} as Record<string, any>);
  });
};

const speciesData = parseCSV(rawData);

// Header Component
function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/exports" },
  ];

  return (
    <header className="w-full max-w-[1320px] mx-auto py-4 px-6 flex items-center justify-between">
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
    </header>
  );
}

// Footer Component
const LocalFooter = () => (
  <footer className="w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background">
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
          <Link
            href="/upload-data"
            className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline"
          >
            Upload
          </Link>
          <Link
            href="/"
            className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline"
          >
            Home
          </Link>
          <Link
            href="/analysis-results"
            className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline"
          >
            Taxonomy Result
          </Link>
          <Link
            href="/exports"
            className="text-foreground/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline"
          >
            Export
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-xl font-semibold">Contact Us</h3>
        <div className="flex flex-col gap-2">
          <p className="text-foreground/80 text-sm font-normal hover:scale-[1.02] transition-transform">+91 9120731190</p>
          <p className="text-foreground/80 text-sm font-normal hover:scale-[1.02] transition-transform">support@gmail.com</p>
          <p className="text-foreground/80 text-sm font-normal hover:scale-[1.02] transition-transform">Greater Noida</p>
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
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-[1.02]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </footer>
);

// Main Component
export default function AnalysisResultsPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null);

  // Unique species list for dropdown
  const uniqueSpecies = Array.from(new Set(speciesData.map((item) => item["Predicted Species"])));

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const species = speciesData.find((item) => item["Predicted Species"] === selectedName);
    setSelectedSpecies(species || null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-10">
        {/* Top boxes */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1320px] mx-auto">
          {/* Dropdown */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px] hover:scale-105 transform transition-transform duration-300">
            <h2 className="text-lg font-semibold mb-4">Identified Species</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Select an option to see the corresponding analysis
            </p>
            <select
              className="w-full border border-border rounded-md p-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedSpecies ? selectedSpecies["Predicted Species"] : ""}
              onChange={handleSpeciesChange}
            >
              <option value="">-- Select --</option>
              {uniqueSpecies.map((speciesName, idx) => (
                <option key={idx} value={speciesName}>
                  {speciesName}
                </option>
              ))}
            </select>
          </div>

          {/* Taxonomic Tree */}
          <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px] hover:scale-105 transform transition-transform duration-300">
            <h2 className="text-lg font-semibold mb-4">Taxonomic Tree</h2>
            <div className="text-muted-foreground text-sm space-y-2">
              {selectedSpecies ? (
                <>
                  <p><strong>Confidence:</strong> {selectedSpecies.Confidence}%</p>
                  <p><strong>Kingdom:</strong> {selectedSpecies.Kingdom}</p>
                  <p><strong>Phylum:</strong> {selectedSpecies.Phylum}</p>
                  <p><strong>Class:</strong> {selectedSpecies.Class}</p>
                  <p><strong>Order:</strong> {selectedSpecies.Order}</p>
                  <p><strong>Family:</strong> {selectedSpecies.Family}</p>
                  <p><strong>Genus:</strong> {selectedSpecies.Genus}</p>
                  <p><strong>Species:</strong> {selectedSpecies.Species}</p>
                </>
              ) : (
                <p>NA</p>
              )}
            </div>
          </div>
        </div>

        {/* 5 larger boxes */}
        <div className="flex flex-wrap gap-6 max-w-[1320px] mx-auto justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="relative bg-card p-6 rounded-lg shadow-md min-h-[210px] flex items-center justify-center transform transition-transform duration-300 cursor-pointer hover:scale-105"
              style={
                i === 4
                  ? { marginLeft: "auto", marginRight: "auto", width: "48%", transformOrigin: "center" }
                  : { width: "48%", transformOrigin: "center" }
              }
            >
              {i < 4 && <span className="absolute text-4xl font-bold text-muted-foreground">+</span>}
              <p className="text-center text-sm">{`Box ${i + 1}`}</p>
            </div>
          ))}
        </div>

        {/* 10 scrollable boxes */}
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
