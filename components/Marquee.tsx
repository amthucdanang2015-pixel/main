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
    <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-6">
      <div className="mask-fade-x overflow-hidden pb-6">
        <div
          className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
          style={{
            ["--marquee-duration" as string]: "30s",
          }}
        >
          {[...items, ...items].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-display text-lg text-bone/35"
            >
              {t}
              <span className="text-accent-violet/60">✳</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-5 right-5 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, var(--hairline) 8%, var(--hairline) 92%, transparent 100%)",
        }}
      />
    </div>
  );
}
