"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Link from "next/link";
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

// Correctly defined LocalFooter component
const LocalFooter = () => (
  <footer className={`w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background mt-20 transition-opacity duration-700`}>
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

            {/* Image Boxes with Individual Titles */}
            <div className="max-w-[1320px] mx-auto">
              <h2 className="text-lg font-semibold mb-6">Species Visualisations</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {selectedImages.length > 0 ? (
                  selectedImages.map((imagePath, i) => {
                    // Titles for each image box
                    const titles = [
                      "MFE structure (base pair probability)",
                      "MFE structure (positional entropy)",
                      "Centroid structure (base pair probability)",
                      "Centroid structure (positional entropy)",
                      "Mountain plot",
                    ];
                    return (
                      <div
                        key={i}
                        className="relative bg-card p-4 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
                        style={{ width: "48%", minHeight: "250px" }}
                      >
                        {/* Title */}
                        <h3 className="text-md font-medium mb-3 text-center">
                          {titles[i] || `Visualisation ${i + 1}`}
                        </h3>

                        {/* Image */}
                        <div className="flex items-center justify-center">
                          <Image
                            src={imagePath}
                            alt={titles[i] || `Visualisation ${i + 1}`}
                            width={500}
                            height={300}
                            className="object-contain w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  [...Array(5)].map((_, i) => {
                    const titles = [
                      "MFE structure (base pair probability)",
                      "MFE structure (positional entropy)",
                      "Centroid structure (base pair probability)",
                      "Centroid structure (positional entropy)",
                      "Mountain plot",
                    ];
                    return (
                      <div
                        key={i}
                        className="relative bg-card p-6 rounded-lg shadow-md min-h-[250px] flex flex-col items-center justify-center transform transition-transform duration-300 cursor-pointer hover:scale-105"
                        style={{ width: "48%", minHeight: "250px" }}
                      >
                        {/* Title */}
                        <h3 className="text-md font-medium mb-3 text-center">
                          {titles[i]}
                        </h3>
                        <span className="text-sm text-muted-foreground">No image</span>
                      </div>
                    );
                  })
                )}
              </div>
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