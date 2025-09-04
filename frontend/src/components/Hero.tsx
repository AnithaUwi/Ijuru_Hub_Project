import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/coworking-bg.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          IJURU HUB
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90">
          CO-WORKING SPACE
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80">
          Modern and flexible workspace solutions in Kimironko, Kigali. 
          Where professionals, entrepreneurs, and innovators come together to work, connect, and grow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Book Your Space
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
            onClick={() => scrollToSection('pricing')}
          >
            View Pricing
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">8AM - 8PM</h3>
            <p className="text-white/80">Mon - Fri Operating Hours</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">From 5K RWF</h3>
            <p className="text-white/80">Hourly Workspace Access</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Kimironko</h3>
            <p className="text-white/80">Prime Kigali Location</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;