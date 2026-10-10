import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Filieres from "@/components/Filieres";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Filieres />
      <Footer />
    </div>
  );
}