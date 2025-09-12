import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Car, Coffee, Users, Clock, MapPin, CheckCircle2 } from "lucide-react";

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
    { title: "Flexibility", description: "Adaptable workspace solutions that grow with your needs" },
    { title: "Community Network", description: "Building connections and fostering collaboration" },
    { title: "Professionalism", description: "Maintaining high standards in everything we do" },
    { title: "Accessibility", description: "Making quality workspace affordable for everyone" },
    { title: "Innovation", description: "Embracing new ideas and creative solutions" }
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24"
      aria-labelledby="about-heading"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            About
          </span>
          <h2
            id="about-heading"
            className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              IJURU HUB
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            Experience a professional, friendly workspace that empowers focus, collaboration, and growth.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 text-primary">Our Vision</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  To be the leading co-working space in Rwanda that hosts professionals driving business growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 text-primary">Our Mission</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  To provide accessible, flexible, and professional workspace solutions while building a vibrant
                  community of innovators and professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-center text-3xl font-bold mb-10">Our Core Values</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => (
              <Card
                key={i}
                className="group border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-gradient-to-r from-primary to-primary/50 opacity-70 group-hover:opacity-100" />
                  <h4 className="text-lg font-semibold text-foreground">{v.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-20">
          <h3 className="text-center text-3xl font-bold mb-10">World-Class Amenities</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a, i) => {
              const Icon = a.icon;
              return (
                <Card
                  key={i}
                  className="group border-border/60 bg-card/70 backdrop-blur hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20 group-hover:from-primary/25 group-hover:ring-primary/30 transition-colors">
                          <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold leading-tight">{a.title}</h4>
                        <p className="mt-1.5 text-sm text-muted-foreground">{a.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">Why Choose IJURU HUB?</h3>
          <Card className="mx-auto max-w-5xl border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm">
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-2">
                {[
                  "Affordable and flexible working options",
                  "Professional environment with reliable facilities",
                  "Vibrant community for networking and collaboration",
                  "Convenient Kimironko location with easy access",
                  "Designed for growth – from freelancers to startups",
                  "Where work meets community",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                    <p className="text-base text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
