"use client";

import { profile, links } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan text-white shadow-lg">
            <span className="flex flex-col items-center leading-none">
              <span className="text-[11px] font-extrabold">M</span>
              <span className="text-[7px] font-bold tracking-tight">NC</span>
            </span>
          </span>
          <span className="font-display text-sm text-bone/70">{profile.name}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-bone/45">
          <a href={links.email} className="hover:text-bone">Email</a>
          <a href={links.appStore} target="_blank" rel="noreferrer" className="hover:text-bone">App Store</a>
          <a href={profile.cv} download className="hover:text-bone">CV</a>
          <a href="#top" className="hover:text-bone">Back to top ↑</a>
        </div>
        <div className="font-mono text-xs text-bone/30">
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
}
