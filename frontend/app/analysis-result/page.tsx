"use client"

import { Search } from "lucide-react"
import { useState } from "react"

// Define the type for a kingdom object
type Kingdom = {
  name: string;
  details: string[];
};

export default function AnalysisResultsPage() {
  const [activeKingdom, setActiveKingdom] = useState<string | null>(null);

  // Corrected function signature with a defined type for 'kingdom'
  const handleKingdomClick = (kingdom: string) => {
    setActiveKingdom(activeKingdom === kingdom ? null : kingdom);
  };

  const kingdomData: Kingdom[] = [ // Use the defined type here
    { name: 'Animalia', details: ['Phylum: Chordata', 'Class: Mammalia', 'Order: Primates'] },
    { name: 'Plantae', details: ['Division: Magnoliophyta', 'Class: Liliopsida', 'Order: Asparagales'] },
    { name: 'Bacteria', details: ['Phylum: Proteobacteria', 'Class: Gammaproteobacteria', 'Order: Enterobacteriales'] },
  ];

  const stats = [
    { label: "Total Species", value: 6, color: "from-green-400/50 to-green-600/50" },
    { label: "Total Species", value: 6, color: "from-teal-400/50 to-teal-600/50" },
    { label: "Total Species", value: 6, color: "from-purple-400/50 to-purple-600/50" },
    { label: "Total Species", value: 6, color: "from-blue-400/50 to-blue-600/50" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 px-8 border-b border-gray-200">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold">eDNA</span>
          <div className="flex gap-4 text-sm font-medium text-gray-600">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Upload Result</a>
            <a href="#" className="hover:underline">Taxonomy Result</a>
            <a href="#" className="hover:underline">Biodiversity Insights</a>
            <a href="#" className="hover:underline">Exports</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">☀</span>
          <span className="text-gray-600">👤</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-8 bg-gray-100">
        <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-8">
          {/* Identified Species Card */}
          <div className="flex-1 min-w-[300px] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Identified Species</h2>
            <p className="text-gray-500 text-sm mb-4">Detailed list of organisms detected in your samples</p>
            <div className="relative">
              <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Taxonomic Tree Card */}
          <div className="flex-1 min-w-[300px] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Taxonomic Tree</h2>
            <p className="text-gray-500 text-sm mb-4">Interactive hierarchical view of identified organisms</p>
            <div className="flex flex-col gap-2">
              {kingdomData.map((kingdom, index) => (
                <div key={index} className="flex flex-col">
                  {/* Corrected onClick handler to pass the kingdom name string */}
                  <div className="flex items-center justify-between p-2 cursor-pointer bg-gray-50 rounded-md hover:bg-gray-100" onClick={() => handleKingdomClick(kingdom.name)}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-600">{activeKingdom === kingdom.name ? '∨' : '>'}</span>
                      <span className="font-medium">{kingdom.name}</span>
                    </div>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">Kingdom</span>
                  </div>
                  {activeKingdom === kingdom.name && (
                    <div className="pl-6 pt-2">
                      {kingdom.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-gray-600 mb-1">{detail}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-gradient-to-br ${stat.color} text-white`}>
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </main>

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
  )
}