"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Upload Result", href: "/upload-data" },
    { name: "Taxonomy Result", href: "/analysis-results" },
    { name: "Exports", href: "/analysis-results" },
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
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      alert("Please upload at least one FASTA file before starting the analysis.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('fasta_files', file);
    });
    
    try {
      const res = await fetch('http://127.0.0.1:5001/analyze', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Analysis started successfully:", data);
        alert("Analysis successfully submitted! You will now be redirected to the results page.");
        router.push('/analysis-results/page.tsx');
      } else {
        const errorData = await res.json();
        console.error("Failed to start analysis:", errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error during analysis:", error);
      alert("An error occurred. Please check your network and try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-8">
      {/* Simple, self-contained header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between p-4 px-8 border-b border-border mb-8">
        <h1 className="text-2xl font-bold">eDNA</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:underline">
              {item.name}
            </Link>
          ))}
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center pt-8">
        <main className="w-full max-w-2xl p-6 bg-card rounded-lg border border-border shadow-lg">
          <div className="p-4 border border-dashed border-border rounded-lg flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Data Files</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Upload your FASTA file containing your eDNA sequence data
            </p>
            <div
              className="mt-4 p-16 border border-dashed rounded-lg text-center cursor-pointer min-h-[200px] w-full"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleDivClick}
            >
              <p className="text-sm font-medium text-muted-foreground">
                Drag n Drop Here
              </p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </div>
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
        </main>

        <div className="mt-8 flex gap-4">
          <Button 
            className="bg-primary text-primary-foreground"
            onClick={handleStartAnalysis}
          >
            Start Analysis
          </Button>
          {files.length > 0 && (
            <Button variant="outline" onClick={handleClearFiles}>
              Clear Files
            </Button>
          )}
        </div>
      </div>
      
      <footer className="w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-foreground text-xl font-semibold">Name</h3>
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