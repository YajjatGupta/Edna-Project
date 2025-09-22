import type React from "react"

// Define a TypeScript interface for the BentoCard's props
interface BentoCardProps {
  title: string;
  description: string;
  imageUrl: string; // Updated to accept a string for the image URL
}

// Use the interface to type the component's props
const BentoCard = ({ title, description, imageUrl }: BentoCardProps) => (
  <div className="overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative">
    {/* Background and other elements remain unchanged */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-center gap-1.5">
        <p className="self-stretch text-foreground text-lg font-normal leading-7">
          {title} <br />
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
    </div>
    
    {/* This is the new div for the image with fixed height */}
    <div className="self-stretch h-64 relative z-10"> 
      <img
        src={imageUrl}
        alt={title}
        // Use w-full and h-full to make the image fill the container.
        // Use object-cover to crop the image to fit the container without distortion.
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export function BentoSection() {
  const cards = [
    {
      title: "Upload TaxonAI sequences",
      description: "Easily upload your FASTA files containing environmental DNA data.",
      imageUrl: "/images/upload.jpg", 
    },
    {
      title: "Add sample metadata",
      description: "Provide sampling details such as location, depth, and collection date.",
      imageUrl: "/images/metadata.jpg", 
    },
    {
      title: "Automated preprocessing",
      description: "Run quality checks and preprocessing before downstream analysis.",
      imageUrl: "/images/preprocessing.jpg",
    },
    {
      title: "Species identification",
      description: "Match sequences against reference databases to identify organisms.",
      imageUrl: "/images/identification.jpg", 
    },
    {
      title: "Biodiversity & abundance",
      description: "Get insights into species diversity, abundance, and richness.",
      imageUrl: "/images/reporting.jpg", 
    },
    {
      title: "Collaborative reporting",
      description: "Generate interactive reports and share results with your team.",
      imageUrl: "/images/biodiversity.jpg",
    },
  ];

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent relative"> {/* Added relative to the section */}
      
      {/* Moved the blur background div to be a direct child of the section */}
      <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />

      {/* This is the main content wrapper. Give it a higher z-index and relative position. */}
      <div className="w-full py-8 md:py-16 relative z-10 flex flex-col justify-start items-start gap-6">
        
        {/* The text container is now a child of the main content wrapper */}
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Empower Your Biodiversity Research
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              {/* Leverage cutting-edge AI to process TaxonAI datasets, visualize species diversity, and make informed decisions for conservation and research. Explore your data in real-time with interactive dashboards. */}
            </p>
          </div>
        </div>

        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}