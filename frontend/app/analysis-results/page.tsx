"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer-section";
import Image from "next/image";

// IMPORT THE RAW DATA
import { rawData } from "@/lib/data";

// IMPORT THE NEWLY CREATED IMAGE DATA FILE
import { speciesImages } from "@/lib/images";

// Function to parse the CSV string into an array of objects
const parseCSV = (csvString: string) => {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",");
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      const cleanHeader = header.trim();
      const value = values[index].trim();
      obj[cleanHeader] =
        cleanHeader === "Confidence" ? parseFloat(value) : value;
      return obj;
    }, {} as Record<string, any>);
  });
  return data;
};

// Assuming rawData is always a string.
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
            <SheetContent
              side="bottom"
              className="bg-background border-t border-border text-foreground"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  Navigation
                </SheetTitle>
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
    {/* same footer code */}
  </footer>
);

// Main Page Component
export default function AnalysisResultsPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isFolderEmpty, setIsFolderEmpty] = useState<boolean>(true); // Add new state

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

  // Get a unique list of species for the dropdown
  const uniqueSpecies = Array.from(
    new Set(speciesData.map((item) => item["Predicted Species"]))
  );

  const handleSpeciesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    const species = speciesData.find(
      (item) => item["Predicted Species"] === selectedName
    );
    setSelectedSpecies(species || null);

    // Set the corresponding images
    const images = speciesImages[selectedName] || [];
    setSelectedImages(images);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-10">
        {/* Conditional rendering based on folder status */}
        {!isFolderEmpty ? (
          <>
            {/* Top two boxes */}
            <div className="flex flex-col lg:flex-row gap-6 max-w-[1320px] mx-auto">
              {/* Dropdown Box */}
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
                {selectedSpecies && (
                  <div className="mt-6 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-xl font-medium">
                      <span className="font-bold">Species:</span>{" "}
                      {selectedSpecies["Predicted Species"]}
                    </p>
                    <p className="text-xl font-medium mt-2">
                      <span className="font-bold">Confidence:</span>{" "}
                      {selectedSpecies.Confidence}%
                    </p>
                  </div>
                )}
              </div>

              {/* Taxonomic Tree Box */}
              <div className="flex-1 bg-card p-6 rounded-lg shadow-md min-h-[350px] hover:scale-105 transform transition-transform duration-300">
                <h2 className="text-lg font-semibold mb-4">Taxonomic Tree</h2>
                <div className="text-muted-foreground text-sm space-y-2">
                  {selectedSpecies ? (
                    <>
                      <p>
                        <strong>Kingdom:</strong> {selectedSpecies.Kingdom}
                      </p>
                      <p>
                        <strong>Phylum:</strong> {selectedSpecies.Phylum}
                      </p>
                      <p>
                        <strong>Class:</strong> {selectedSpecies.Class}
                      </p>
                      <p>
                        <strong>Order:</strong> {selectedSpecies.Order}
                      </p>
                      <p>
                        <strong>Family:</strong> {selectedSpecies.Family}
                      </p>
                      <p>
                        <strong>Genus:</strong> {selectedSpecies.Genus}
                      </p>
                      <p>
                        <strong>Species:</strong> {selectedSpecies.Species}
                      </p>
                    </>
                  ) : (
                    <p>NA</p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Boxes */}
            <div className="flex flex-wrap gap-6 max-w-[1320px] mx-auto justify-center">
              {selectedImages.length > 0 ? (
                selectedImages.map((imagePath, i) => (
                  <div
                    key={i}
                    className="relative bg-card p-4 rounded-lg shadow-md flex items-center justify-center hover:scale-105 transform transition-transform duration-300"
                    style={{
                      width: "48%",
                      minHeight: "210px",
                    }}
                  >
                    <Image
                      src={imagePath}
                      alt={`Visualisation ${i + 1}`}
                      width={500}
                      height={300}
                      className="object-contain w-full h-auto rounded-lg"
                    />
                  </div>
                ))
              ) : (
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="relative bg-card p-6 rounded-lg shadow-md min-h-[210px] flex items-center justify-center transform transition-transform duration-300 cursor-pointer hover:scale-105"
                    style={{
                      width: "48%",
                      transformOrigin: "center",
                      minHeight: "210px",
                    }}
                  >
                    <span className="text-sm text-muted-foreground">
                      No image
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h2 className="text-3xl font-bold mb-4">No Analysis Data Found</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Please go back to the upload page to start a new analysis.
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