import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import ChatBot from "@/components/ui/ChatBot";
import SpaceBackground from "@/components/SpaceBackground";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main className="relative min-h-screen text-bright overflow-hidden">
        <SpaceBackground />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
