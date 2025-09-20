"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold">eDNA</h1>
      </header>

      <main className="w-full max-w-4xl p-6 bg-card rounded-lg border border-border shadow-lg flex flex-col md:flex-row gap-8">
        {/* Data Files Section */}
        <div className="flex-1 p-4 border border-dashed border-border rounded-lg flex flex-col items-center justify-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Data Files</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Upload your FASTA file containing your eDNA sequence data
          </p>
          <div
            // Updated class to increase padding and dimensions
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
            multiple // Allow multiple files
            className="hidden"
            accept=".fasta,.fna,.fa" // <-- Add this line
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

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button className="bg-primary text-primary-foreground">
          Start Analysis
        </Button>
        {files.length > 0 && (
          <Button variant="outline" onClick={handleClearFiles}>
            Clear Files
          </Button>
        )}
      </div>
    </div>
  );
}