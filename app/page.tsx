import AuroraBackground from "@/components/AuroraBackground";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <AuroraBackground />
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Hero />
        <Stats />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <References />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
