"use client";

const items = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "Node.js",
  "Ruby on Rails",
  "GraphQL",
  "AWS",
  "Lambda",
  "DynamoDB",
  "Solidity",
  "Hardhat",
  "Ethers.js",
  "PostgreSQL",
  "MongoDB",
  "Elasticsearch",
  "Docker",
  "Java",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-b border-hairline py-5 marquee-paused">
      <div className="mask-fade-x flex">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" style={{ ["--marquee-duration" as string]: "45s" }}>
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg text-bone/35">
              {t}
              <span className="text-accent-violet/60">✳</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
