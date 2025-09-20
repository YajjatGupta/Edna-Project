// components/upload-section.tsx
"use client";

import React, { useState } from "react";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadMessage("");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a FASTA file first.");
      return;
    }

    // Call parent handler
    onFileUpload(selectedFile);
    setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
  };

  return (
    <section className="flex flex-col items-center justify-center text-center mx-auto py-16 px-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold mb-4">Upload Your FASTA File</h1>
      <p className="text-muted-foreground mb-6">
        Select a FASTA file to analyze and assess biodiversity using AI.
      </p>

      <input
        type="file"
        accept=".fasta,.fa,.txt"
        onChange={handleFileChange}
        className="mb-4 w-full text-sm file:border file:border-border file:rounded-md file:bg-background file:text-foreground file:px-4 file:py-2 file:cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        Upload
      </button>

      {uploadMessage && (
        <p className="mt-4 text-sm text-green-500">{uploadMessage}</p>
      )}
    </section>
  );
};
