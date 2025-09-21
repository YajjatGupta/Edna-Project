"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { User, Menu, Upload } from "lucide-react";

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

// ------------------ Footer Component ------------------
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
        <div className="flex flex-col gap-2 text-foreground/80 text-sm font-normal">
          <Link href="/upload-data">Upload</Link>
          <Link href="/">Home</Link>
          <Link href="/analysis-results">Taxonomy Result</Link>
          <Link href="/exports">Export</Link>
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

// ------------------ Message Modal ------------------
interface MessageModalProps {
  message: string;
  onClose: () => void;
}

const MessageModal = ({ message, onClose }: MessageModalProps) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-card p-6 rounded-lg shadow-xl max-w-sm w-full">
      <h4 className="text-lg font-semibold mb-2">Notice</h4>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="flex justify-end mt-4">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  </div>
);

// ------------------ Upload Page Component ------------------
export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageModal, setMessageModal] = useState({ visible: false, message: "" });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files.length) setFiles(Array.from(e.dataTransfer.files));
    e.dataTransfer.clearData();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) setFiles(Array.from(e.target.files)); };
  const handleClearFiles = () => { setFiles([]); if (fileInputRef.current) fileInputRef.current.value = ""; };
  const handleDivClick = () => fileInputRef.current?.click();

  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      setMessageModal({ visible: true, message: "Please upload at least one FASTA file." });
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("fasta_files", file));
    try {
      const res = await fetch("http://127.0.0.1:5001/analyze", { method: "POST", body: formData });
      if (res.ok) {
        setMessageModal({ visible: true, message: "Analysis submitted! Redirecting..." });
        setTimeout(() => { window.location.href = "/analysis-results"; }, 2000);
      } else {
        const errorData = await res.json();
        setMessageModal({ visible: true, message: `Error: ${errorData.message}` });
      }
    } catch {
      setMessageModal({ visible: true, message: "Network error. Please try again." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-8 px-6 md:px-12">
        <div className="w-full max-w-2xl p-6 bg-card rounded-lg border border-border shadow-lg">
          <div
            className="p-4 border border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer min-h-[200px] w-full hover:bg-background/50 transition"
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
                  {files.map((file, index) => (<li key={index}>{file.name}</li>))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground" onClick={handleStartAnalysis}>
              Start Analysis
            </Button>
            {files.length > 0 && (
              <Button variant="outline" onClick={handleClearFiles}>Clear Files</Button>
            )}
          </div>
        </div>
      </main>

      <LocalFooter />

      {messageModal.visible && (
        <MessageModal
          message={messageModal.message}
          onClose={() => setMessageModal({ ...messageModal, visible: false })}
        />
      )}
    </div>
  );
}
