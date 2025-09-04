import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Users, Building, Calendar } from "lucide-react";

const Services = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Laptop,
      title: "Hot Desk (Open Space)",
      description: "Shared seating available hourly, daily, or monthly. Perfect for freelancers and remote workers.",
      features: ["Flexible seating", "High-speed internet", "Professional environment"],
      price: "From 5,000 RWF/hour"
    },
    {
      icon: Building,
      title: "Dedicated Desk",
      description: "Reserved desk in the open space with monthly membership. Your own workspace in a collaborative environment.",
      features: ["Reserved space", "Storage options", "Community access"],
      price: "90,000 RWF/month"
    },
    {
      icon: Users,
      title: "Private Offices",
      description: "Fully furnished, lockable rooms for teams. Complete privacy with all amenities included.",
      features: ["Lockable office", "Team space", "Full privacy"],
      price: "120,000 RWF/month"
    },
    {
      icon: Calendar,
      title: "Meeting Room",
      description: "Professional setup with projector and whiteboard. Available per hour or daily rental.",
      features: ["Projector included", "Whiteboard", "Professional setup"],
      price: "10,000 RWF/hour"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Workspace Options
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect workspace solution that fits your needs and budget. 
            From flexible hot desks to private offices, we have options for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary mb-4">{service.price}</p>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => scrollToSection('contact')}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;