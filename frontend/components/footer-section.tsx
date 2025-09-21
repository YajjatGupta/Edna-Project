"use client"

import { Footer } from "react-day-picker";

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 py-10 md:py-[70px] bg-neutral-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-4">
        {/* Name Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-xl font-semibold">Name</h3>
          <p className="text-black/80 text-sm font-normal">Identifying Taxonomy and Assessing Biodiversity from TaxonAI Datasets</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-black text-xl font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-black/80 text-sm font-normal hover:underline">Upload</a>
            {/* <a href="#" className="text-black/80 text-sm font-normal hover:underline">Biodiversity Insights</a> */}
            <a href="#" className="text-black/80 text-sm font-normal hover:underline">Taxonomy Result</a>
            <a href="#" className="text-black/80 text-sm font-normal hover:underline">Export</a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-black text-xl font-semibold">Contact Us</h3>
          <div className="flex flex-col gap-2">
            <p className="text-black/80 text-sm font-normal">+91 9120731190</p>
            <p className="text-black/80 text-sm font-normal">support@gmail.com</p>
            <p className="text-black/80 text-sm font-normal">Greater Noida</p>
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
            <button className="bg-black text-white px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-105">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;
