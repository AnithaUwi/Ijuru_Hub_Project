import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Car, Coffee, Users, Clock, MapPin } from "lucide-react";

const About = () => {
  const amenities = [
    { icon: Wifi, title: "High-speed Fiber Internet", description: "Reliable connectivity for all your work needs" },
    { icon: Users, title: "Front-desk Reception", description: "Professional support and assistance" },
    { icon: Coffee, title: "Water & Refreshments", description: "Stay hydrated and energized" },
    { icon: Car, title: "Parking Space", description: "Convenient and secure parking" },
    { icon: Clock, title: "Networking Events", description: "Regular workshops and community events" },
    { icon: MapPin, title: "Prime Location", description: "Easy accessibility in Kimironko" }
  ];

  const values = [
    {
      title: "Flexibility",
      description: "Adaptable workspace solutions that grow with your needs"
    },
    {
      title: "Community Network",
      description: "Building connections and fostering collaboration"
    },
    {
      title: "Professionalism",
      description: "Maintaining high standards in everything we do"
    },
    {
      title: "Accessibility",
      description: "Making quality workspace affordable for everyone"
    },
    {
      title: "Innovation",
      description: "Embracing new ideas and creative solutions"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            About IJURU HUB
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be the leading co-working space in Rwanda that hosts professionals driving business growth.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide accessible, flexible, and professional workspace solutions while building a vibrant community of innovators and professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-3 text-primary">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">World-Class Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{amenity.title}</h4>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-8 text-foreground">Why Choose IJURU HUB?</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-lg text-muted-foreground mb-4">
                      • Affordable and flexible working options
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                      • Professional environment with reliable facilities
                    </p>
                    <p className="text-lg text-muted-foreground">
                      • Vibrant community for networking and collaboration
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-muted-foreground mb-4">
                      • Convenient Kimironko location with easy access
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                      • Designed for growth - from freelancers to startups
                    </p>
                    <p className="text-lg text-muted-foreground">
                      • Where work meets community
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;