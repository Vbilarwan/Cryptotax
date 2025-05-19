import { Disclaimer } from "@/components/Disclaimer";
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { ReportGenerator } from "@/components/ReportGenerator";
import { DonationSection } from "@/components/DonationSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Scroll to element if hash is present in URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Disclaimer />
      <Header />
      <Features />
      <HowItWorks />
      <ReportGenerator />
      <DonationSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
