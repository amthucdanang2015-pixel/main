/* ──────────────────────────────────────────────────────────────────────────
   Unified "Work" model. Every project Manh shipped — live web platforms,
   App Store apps, and earlier products — in one list. Each item declares how
   the detail view should render it:
     - "live"    → load the real site in a browser frame
     - "gallery" → 3D screenshot gallery (only apps with published shots)
     - "info"    → animated description + tech stack (no live embed / no shots)
   ────────────────────────────────────────────────────────────────────────── */

export type WorkMode = "live" | "gallery" | "info";

export type WorkItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mode: WorkMode;
  role: string;
  year: string;
  accent: "violet" | "blue" | "cyan" | "amber";
  stack: string[];
  url?: string;
  urlLabel?: string;
  icon?: string;
  shots?: string[];
  highlight?: string; // a single standout metric/fact for the info view
};

export type WorkGroup = { label: string; hint: string; items: WorkItem[] };

const vt = [0, 1, 2, 3, 4, 5, 6].map((i) => `/apps/shots/vocabtunes-ai-word-builder-${i}.png`);
const ke = [0, 1, 2].map((i) => `/apps/shots/king-english-kids-anime-${i}.png`);
const we = [0, 1, 2, 3].map((i) => `/apps/shots/wenlambo_${i}.png`);
const sc = [0, 1, 2, 3, 4].map((i) => `/apps/shots/new-scan-qr-${i}.png`);
const yk = [0, 1, 2, 3, 4].map((i) => `/apps/shots/yk-${i}.png`);
const nv = [0, 1, 2, 3].map((i) => `/apps/shots/never-ever-${i}.jpg`);
const ms = [0, 1, 2, 3].map((i) => `/apps/shots/most-likely-to-${i}.png`);
const rl = [0, 1, 2, 3].map((i) => `/apps/shots/rouly-${i}.png`);
const dl = [0, 1, 2, 3].map((i) => `/apps/shots/dilem_${i}.png`);
const bz = [0, 1, 2, 3].map((i) => `/apps/shots/buzz-${i}.png`);

export const workGroups: WorkGroup[] = [
  {
    label: "Live Web Platforms",
    hint: "Loads the real, deployed site",
    items: [
      {
        id: "opencto",
        name: "OpenCTO",
        tagline: "The first crypto-powered ads platform on X",
        description:
          "Built the frontend for a platform that lets communities fund and run advertising campaigns on X (Twitter) with crypto — campaign flows, wallet connection and the marketing site.",
        mode: "live",
        role: "Frontend · Web3",
        year: "2024",
        accent: "cyan",
        stack: ["Next.js", "TypeScript", "Web3", "Vercel"],
        url: "https://opencto.vercel.app/",
        urlLabel: "opencto.vercel.app",
      },
      {
        id: "agentcto",
        name: "AgentCTO",
        tagline: "A community-owned AI agent launchpad",
        description:
          "Daily AI brainstorm → community vote & crowdfund → top token launch, with fair allocations and airdrops. Built the interactive launchpad frontend and the on-chain integration.",
        mode: "live",
        role: "Frontend · Web3",
        year: "2024",
        accent: "blue",
        stack: ["Next.js", "React", "Smart Contracts", "Vercel"],
        url: "https://agentcto-fun-nam-nguyens-projects-2dee7f8f.vercel.app/",
        urlLabel: "agentcto.vercel.app",
      },
      {
        id: "grouppump",
        name: "GroupPump",
        tagline: "Launch together, pump together",
        description:
          "A campaign platform for coordinated community token launches — explore, create and manage groupump campaigns. Built the campaign-management frontend.",
        mode: "live",
        role: "Frontend · Web3",
        year: "2024",
        accent: "amber",
        stack: ["Next.js", "React", "Web3", "Vercel"],
        url: "https://groupumpfun.vercel.app/",
        urlLabel: "groupumpfun.vercel.app",
      },
      {
        id: "moreso",
        name: "Moreso",
        tagline: "Web3-first global luxury fashion IP",
        description:
          "Led the frontend for a luxury fashion IP platform, working with the founder and artists to turn their designs into shipped features. Built the smart-contract integration and the viral 'reveal' feature that drove its biggest marketing moment.",
        mode: "live",
        role: "Frontend Lead",
        year: "2023",
        accent: "violet",
        stack: ["React", "Node.js", "AWS", "Solidity", "Elasticsearch"],
        url: "https://www.moreso.io/",
        urlLabel: "moreso.io",
      },
    ],
  },
  {
    label: "App Store — 10 live",
    hint: "Built end-to-end in React Native",
    items: [
      {
        id: "vocabtunes",
        name: "VocabTunes",
        tagline: "AI word builder, TikTok-style",
        description:
          "AI-powered English vocabulary as a TikTok-style swipe feed — dynamic flashcards, music-enhanced sessions and smart recall, all tuned by AI. Reached top-200 downloads of the day.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2024",
        accent: "violet",
        stack: ["React Native", "AWS Amplify", "Lambda", "DynamoDB", "Node.js"],
        url: "https://apps.apple.com/us/app/vocabtunes-ai-word-builder/id6473722198",
        urlLabel: "App Store",
        icon: "/apps/icons/vocabtunes-ai-word-builder.jpg",
        shots: vt,
      },
      {
        id: "kingenglish",
        name: "King English Kids Anime",
        tagline: "AI anime English lessons for kids",
        description:
          "AI-generated anime videos and AI-voiced flashcards that make learning English fun for kids — songs, stories, quizzes and conversations. Reached top-15 downloads of the day.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2024",
        accent: "amber",
        stack: ["React Native", "AWS", "Node.js"],
        url: "https://apps.apple.com/us/app/king-english-kids-anime/id6483942011",
        urlLabel: "App Store",
        icon: "/apps/icons/king-english-kids-anime.jpg",
        shots: ke,
      },
      {
        id: "wenlambo",
        name: "WenLambo AI",
        tagline: "AI memecoin chart scanner",
        description:
          "Snap or upload a memecoin chart and get an instant AI Buy / Sell / Hold call with the reasoning — trend, key levels and indicators, built camera-first for volatile charts.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2025",
        accent: "amber",
        stack: ["React Native", "AI Vision", "Node.js", "AWS"],
        url: "https://apps.apple.com/us/app/wenlambo-ai-meme-alt-scanner/id6749757392",
        urlLabel: "App Store",
        icon: "/apps/icons/wenlambo-ai.jpg",
        shots: we,
      },
      {
        id: "qrcode",
        name: "New Scan QR Code",
        tagline: "Instant QR scan & generator",
        description:
          "Full-screen instant QR scanning plus a custom generator for links, Wi-Fi, text, contacts and locations — fast, ad-free, with a clean visual history.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2025",
        accent: "cyan",
        stack: ["React Native", "Camera", "Swift interop"],
        url: "https://apps.apple.com/us/app/new-scan-qr-code-no-ads/id6749230692",
        urlLabel: "App Store",
        icon: "/apps/icons/new-scan-qr-code-no-ads.jpg",
        shots: sc,
      },
      {
        id: "yikes",
        name: "YIKES!",
        tagline: "Truth or dare, read aloud",
        description:
          "A modern truth-or-dare that reads cards out loud so no one stares at a phone — playful, flirty or chaotic packs, plus custom rules you make your own.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "amber",
        stack: ["React Native", "Text-to-speech"],
        url: "https://apps.apple.com/us/app/yikes-truth-dare-party-game/id6758385148",
        urlLabel: "App Store",
        icon: "/apps/icons/yikes-truth-dare-party-game.jpg",
        shots: yk,
      },
      {
        id: "rouly",
        name: "Rouly",
        tagline: "Party roulette",
        description:
          "Spin the wheel, it picks who's next, the card says what to do — a clean, premium, ad-free party roulette for friends, couples and wild nights.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "blue",
        stack: ["React Native", "Animations"],
        url: "https://apps.apple.com/us/app/rouly-party-roulette-game/id6758606033",
        urlLabel: "App Store",
        icon: "/apps/icons/rouly.jpg",
        shots: rl,
      },
      {
        id: "mostlikelyto",
        name: "Most Likely To",
        tagline: "Listen & vote",
        description:
          "The app reads each question aloud, the countdown runs and everyone votes before time's up — easy to learn, fast to play, made for group moments.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "cyan",
        stack: ["React Native", "Text-to-speech"],
        url: "https://apps.apple.com/us/app/most-likely-to-listen-vote/id6759958663",
        urlLabel: "App Store",
        icon: "/apps/icons/most-likely-to.jpg",
        shots: ms,
      },
      {
        id: "neverever",
        name: "Never Ever",
        tagline: "Never-have-I-ever, automated",
        description:
          "Never-have-I-ever, fully automated — it picks the player, reads the prompt aloud, counts down and moves on. No pauses, no friction, just press play and let it run.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "violet",
        stack: ["React Native", "Text-to-speech"],
        url: "https://apps.apple.com/us/app/never-ever-listen-answer/id6759959558",
        urlLabel: "App Store",
        icon: "/apps/icons/never-ever.jpg",
        shots: nv,
      },
      {
        id: "dilemma",
        name: "Dilemma",
        tagline: "Would-you-rather, faster",
        description:
          "Would-you-rather as a faster party game — a wheel picks the player and the app reads the dilemma aloud, then the next turn starts fast. Offline, ad-free.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "amber",
        stack: ["React Native", "Text-to-speech"],
        url: "https://apps.apple.com/us/app/dilemma-what-would-you-choose/id6761237352",
        urlLabel: "App Store",
        icon: "/apps/icons/dilemma.jpg",
        shots: dl,
      },
      {
        id: "buzzed",
        name: "Buzzed",
        tagline: "Do-or-drink party cards",
        description:
          "A do-or-drink party card game with themed deck packs and custom rules built for real groups — quick setup, rotating turns and decks that match the vibe.",
        mode: "gallery",
        role: "Frontend · React Native",
        year: "2026",
        accent: "violet",
        stack: ["React Native", "Offline-first"],
        url: "https://apps.apple.com/us/app/buzzed-adult-party-game-cards/id6757947194",
        urlLabel: "App Store",
        icon: "/apps/icons/buzzed.jpg",
        shots: bz,
      },
    ],
  },
  {
    label: "Earlier Products",
    hint: "Landmarks that made their mark",
    items: [
      {
        id: "whalestats",
        name: "WhaleStats",
        tagline: "Tracking the biggest crypto whales",
        description:
          "Co-built the analytics product that tracked top cryptocurrency whale wallets — owning frontend, build and the growth that pushed it to ~200K monthly users and a spot among the top-10 crypto voices on Twitter.",
        mode: "info",
        role: "Founding Engineer",
        year: "2021",
        accent: "cyan",
        stack: ["React", "Node.js", "AWS", "Elasticsearch", "Solidity"],
        highlight: "~200K monthly users · top-10 crypto voice on Twitter",
      },
      {
        id: "koalachat",
        name: "KoalaChat",
        tagline: "Turns every cafe & campus into a chatroom",
        description:
          "A location-based chat app — walk into a place, drop into its room. Built the React Native client and the realtime AWS AppSync backend.",
        mode: "info",
        role: "Full-Stack",
        year: "2020",
        accent: "violet",
        stack: ["React Native", "AppSync", "DynamoDB", "Firebase"],
      },
      {
        id: "oqeo",
        name: "Oqeo",
        tagline: "Women-only ride-hailing",
        description:
          "A ride-hailing platform where both driver and rider are women. Built the React Native apps and the Apollo GraphQL backend with live maps.",
        mode: "info",
        role: "Full-Stack",
        year: "2019",
        accent: "amber",
        stack: ["React Native", "Apollo GraphQL", "MongoDB", "Maps"],
      },
      {
        id: "baecafe",
        name: "BaeCafe",
        tagline: "Two sold-out NFT collections",
        description:
          "Co-led development for BaeCafe seasons 1 & 2 — minted and launched both NFT collections, then sold the project.",
        mode: "info",
        role: "Frontend Lead",
        year: "2022",
        accent: "violet",
        stack: ["React", "Solidity", "Hardhat", "Node.js"],
        highlight: "2 seasons minted & sold out",
      },
      {
        id: "chainalerts",
        name: "ChainAlerts",
        tagline: "NFT floor-price alerts, everywhere",
        description:
          "A platform that fires alerts via Email, Telegram, Slack or Line the moment an NFT collection's floor price moves.",
        mode: "info",
        role: "Full-Stack",
        year: "2022",
        accent: "blue",
        stack: ["React", "Node.js", "AWS", "Smart Contracts"],
      },
      {
        id: "cardpool",
        name: "Cardpool",
        tagline: "Gift-card exchange at scale",
        description:
          "A long-running US gift-card exchange platform — maintained and extended a large multi-service system in Angular, Ruby, Node.js and AWS microservices.",
        mode: "info",
        role: "Senior Engineer",
        year: "2020",
        accent: "cyan",
        stack: ["Angular", "Ruby", "Node.js", "AWS"],
      },
    ],
  },
];

export const references = [
  {
    name: "Nam Nguyen Van",
    relation: "Product Leader & Co-founder",
    period: "2016 — Present",
    quote:
      "Manh has been the engineer beside me on every product I've led for nearly a decade. He leads the frontend completely and reaches into the backend whenever it counts — and he ships.",
    email: "mailnamnv@gmail.com",
    phone: "+84 979 734 061",
  },
  {
    name: "Ha Thanh Hung",
    relation: "Engineering colleague",
    period: "2017 — 2023",
    quote:
      "One of the most reliable frontend-focused developers I've worked with — fast to learn new stacks and consistently dependable under pressure.",
    email: "thanhhung071@gmail.com",
    phone: "+84 932 778 939",
  },
];
