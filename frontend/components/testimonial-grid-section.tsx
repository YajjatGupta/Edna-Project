"use client";

import Image from "next/image";

const testimonials = [
  {
    quote: "Vipin leads the project, coordinating tasks and guiding the AI pipeline development. He explores novel methods and oversees model implementation to ensure efficiency and accuracy.",
    name: "Vipin Yadav",
    company: "Team Leader",
    avatar: "/images/avatars/annette-black.png",
    type: "large-teal",
  },
  {
    quote: "Atishay focuses on frontend development, creating interactive interfaces and integrating AI outputs seamlessly for users.",
    name: "Atishay Jain",
    company: "Frontend Developer",
    avatar: "/images/avatars/albert-flores.png",
    type: "large-light",
  },
  {
    quote: "Vaishnavi designs intuitive UI/UX and contributes to frontend development, ensuring smooth interaction between design and functionality.",
    name: "Vaishnavi Srivastava",
    company: "UI/UX & Frontend Developer",
    avatar: "/images/avatars/cody-fisher.png",
    type: "small-dark",
  },
  {
    quote: "Aeshni handles backend development and database management, supporting data analysis and ensuring structured data handling.",
    name: "Aeshni Yadav",
    company: "Backend & Database",
    avatar: "/images/avatars/robert-fox.png",
    type: "small-dark",
  },
  {
    quote: "Yajat manages data preprocessing and analysis, extracting insights and preparing datasets for effective model training.",
    name: "Yajat Gupta",
    company: "Data Analyst",
    avatar: "/images/avatars/cameron-williamson.png",
    type: "small-dark",
  },
  {
    quote: "Harsh provides biological expertise, conducts research, and ensures AI approaches are scientifically accurate and relevant.",
    name: "Harsh Mishra",
    company: "Biological Research",
    avatar: "/images/avatars/darlene-robertson.png",
    type: "small-dark",
  },
];

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  type?: string; // optional to be safe
}

const TestimonialCard = ({
  quote,
  name,
  company,
  avatar,
  type = "small-dark", // default type
}: TestimonialCardProps) => {
  const isLargeCard = type?.startsWith("large") ?? false;
  const avatarSize = isLargeCard ? 48 : 36;
  const avatarBorderRadius = isLargeCard ? "rounded-[41px]" : "rounded-[30.75px]";
  const padding = isLargeCard ? "p-6" : "p-[30px]";

  const baseCardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding}`;
  let cardClasses = baseCardClasses;
  let quoteClasses = "";
  let nameClasses = "";
  let companyClasses = "";
  let backgroundElements = null;
  let cardHeight = "";
  const cardWidth = "w-full md:w-[384px]";

  if (type === "large-teal") {
    cardClasses += " bg-primary";
    quoteClasses = "text-primary-foreground text-2xl font-medium leading-8";
    nameClasses = "text-primary-foreground text-base font-normal leading-6";
    companyClasses = "text-primary-foreground/60 text-base font-normal leading-6";
    cardHeight = "h-[502px]";
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
      />
    );
  } else if (type === "large-light") {
    cardClasses += " bg-[rgba(231,236,235,0.12)]";
    quoteClasses = "text-foreground text-2xl font-medium leading-8";
    nameClasses = "text-foreground text-base font-normal leading-6";
    companyClasses = "text-muted-foreground text-base font-normal leading-6";
    cardHeight = "h-[502px]";
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
      />
    );
  } else {
    cardClasses += " bg-card outline outline-1 outline-border outline-offset-[-1px]";
    quoteClasses = "text-foreground/80 text-[17px] font-normal leading-6";
    nameClasses = "text-foreground text-sm font-normal leading-[22px]";
    companyClasses = "text-muted-foreground text-sm font-normal leading-[22px]";
    cardHeight = "h-[244px]";
  }

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      {backgroundElements}
      <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>{quote}</div>
      <div className="relative z-10 flex justify-start items-center gap-3 mt-4">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          width={avatarSize}
          height={avatarSize}
          className={avatarBorderRadius}
          style={{ width: avatarSize, height: avatarSize, border: "1px solid rgba(255, 255, 255, 0.08)" }}
        />
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  );
};

export function TestimonialGridSection() {
  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Effortless TaxonAI discovery for every researcher
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
            Hear how researchers uncover biodiversity faster, analyze samples seamlessly, <br />
            and gain confidence in their results using our powerful TaxonAI tools.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-4 max-w-[1100px] mx-auto">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
