"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState({
    sampleLocation: '',
    sampleType: '',
    collectionDate: '',
    samplingDepth: ''
  });
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

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  // New function to handle the analysis
  const handleStartAnalysis = () => {
    if (files.length === 0) {
      alert("Please upload at least one file before starting the analysis.");
      return;
    }
    // Here you would send the files and metadata to your backend
    console.log("Starting analysis with files:", files);
    console.log("Metadata:", metadata);

    // In a real application, you would create a FormData object and send it
    // const formData = new FormData();
    // files.forEach(file => {
    //   formData.append('files', file);
    // });
    // formData.append('metadata', JSON.stringify(metadata));
    // fetch('/api/analyze', { method: 'POST', body: formData });
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

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button 
          className="bg-primary text-primary-foreground"
          onClick={handleStartAnalysis} // Add the click handler here
        >
          Start Analysis
        </Button>
        {files.length > 0 && (
          <Button variant="outline" onClick={handleClearFiles}>
            Clear Files
          </Button>
        )}
      </div>
            {/* Footer */}
      <footer className="w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
          {/* Name Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-black text-xl font-semibold">Name</h3>
            <p className="text-black/80 text-sm font-normal">Identifying Taxonomy and Assessing Biodiversity from eDNA Datasets</p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-black text-xl font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Upload</a>
              <a href="#" className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Biodiversity Insights</a>
              <a href="#" className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Taxonomy Result</a>
              <a href="#" className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02] hover:underline">Export</a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-black text-xl font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">+91 9120731190</p>
              <p className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">support@gmail.com</p>
              <p className="text-black/80 text-sm font-normal transition-transform transform hover:scale-[1.02]">Greater Noida</p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-black text-xl font-semibold">NewsLetter</h3>
            <p className="text-black/80 text-sm font-normal">Subscribe to our NewsLetter</p>
            <div className="flex flex-col gap-2 mt-2">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-800"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-[1.02]">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}