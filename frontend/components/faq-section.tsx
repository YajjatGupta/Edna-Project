"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

// --- Data Source ---
const faqData = [
  {
    question: "What is Edna and who is it for?",
    answer:
      "eDNA is an AI-powered platform designed to identify species and assess biodiversity from eDNA datasets. It is ideal for researchers, conservationists, educators, and environmental organizations looking to streamline biodiversity analysis.",
  },
  {
    question: "How does eDNA analyze eDNA samples?",
    answer:
      "eDNA uses advanced AI algorithms to classify species from environmental DNA sequences, providing accurate taxonomic identifications, diversity metrics, and interactive visualizations.",
  },
  {
    question: "Can I integrate eDNA with my existing research tools?",
    answer:
      "Yes! You can export results in standard formats (CSV, JSON) to integrate with other data analysis pipelines, GIS software, or reporting tools.",
  },
  {
    question: "What data can I upload?",
    answer:
      "eDNA supports eDNA datasets in CSV or FASTA format. You can upload samples from soil, water, or other environmental sources for analysis.",
  },
  {
    question: "Is my data secure with eDNA?",
    answer:
      "Absolutely. All uploaded data is encrypted and stored securely. Users have full control over who can access their datasets and results.",
  },
  {
    question: "What plans are available?",
    answer:
      "Free: Limited uploads and basic visualization. Pro: Advanced analysis, larger datasets, and customizable dashboards. Enterprise: Tailored solutions, unlimited data, and dedicated support.",
  },
  {
    question: "Can I visualize biodiversity changes over time?",
    answer:
      "Yes! eDNA provides interactive charts, heatmaps, and time-series visualizations to track changes in species diversity across regions or time periods.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign up, upload your eDNA dataset, and explore the results in your personalized dashboard.",
  },
];

// --- Component Props Interface ---
interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

// --- Individual FAQ Item Component ---
const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }

  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

// --- Main FAQ Section Component ---
export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            Frequently Asked Questions
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Everything you need to know about eDNA and how it can transform biodiversity research using AI.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}