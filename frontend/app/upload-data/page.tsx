"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(true); // replace with real auth

  // Upload Page nav items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/exports" },
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleClearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDivClick = () => fileInputRef.current?.click();

  const handleStartAnalysis = async () => {
    if (files.length === 0) return alert("Please upload at least one FASTA file before starting the analysis.");

    const formData = new FormData();
    files.forEach((file) => formData.append("fasta_files", file));

    try {
      const res = await fetch("http://127.0.0.1:5001/analyze", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        alert("Analysis successfully submitted! Redirecting...");
        router.push("/analysis-results");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header-like navbar */}
      <header className="w-full py-4 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src="/logos/logo.png" alt="Pointer Logo" className="h-16 w-auto" />

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button
  onClick={() => {}}
  className="hidden md:block bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-medium shadow-sm text-base transition-transform duration-300 hover:scale-105 hover:shadow-md active:scale-95"
>
  Upload Data
</Button>
) : (
              <Button
                onClick={() => alert("Get Started clicked")}
                className="hidden md:block bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-medium shadow-sm text-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
              >
                Get Started
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
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
                      className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {isLoggedIn ? (
                    <Button
                      onClick={() => {}}
                      className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                    >
                      Upload Data
                    </Button>
                  ) : (
                    <Button
                      onClick={() => alert("Get Started clicked")}
                      className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm"
                    >
                      Try for Free
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <main className="flex-grow flex flex-col items-center pt-8 px-6 md:px-12">
        <div className="w-full max-w-2xl p-6 bg-card rounded-lg border border-border shadow-lg">
          <div
            className="p-4 border border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer min-h-[200px] w-full"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleDivClick}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Data Files</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Upload your FASTA file containing eDNA sequence data
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept=".fasta,.fna,.fa"
            />
            {files.length > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold">Selected Files:</p>
                <ul className="text-sm text-muted-foreground">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground" onClick={handleStartAnalysis}>
              Start Analysis
            </Button>
            {files.length > 0 && (
              <Button variant="outline" onClick={handleClearFiles}>
                Clear Files
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
