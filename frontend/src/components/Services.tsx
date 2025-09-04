import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Users, Building, Calendar } from "lucide-react";
import BookingModal from "@/components/BookingModal";

type Service = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  spaceKey: "Hot Desk" | "Dedicated Desk" | "Private Office" | "Meeting Room";
};

const Services = () => {
  const services: Service[] = [
    {
      icon: Laptop,
      title: "Hot Desk (Open Space)",
      description: "Shared seating available hourly, daily, or monthly. Perfect for freelancers and remote workers.",
      features: ["Flexible seating", "High-speed internet", "Professional environment"],
      price: "From 5,000 RWF/hour",
      image: "/src/assets/hot-desk.jpg",
      spaceKey: "Hot Desk",
    },
    {
      icon: Building,
      title: "Dedicated Desk",
      description: "Reserved desk in the open space with monthly membership. Your own workspace in a collaborative environment.",
      features: ["Reserved space", "Storage options", "Community access"],
      price: "90,000 RWF/month",
      image: "/src/assets/dedicated-desk.jpg",
      spaceKey: "Dedicated Desk",
    },
    {
      icon: Users,
      title: "Private Offices",
      description: "Fully furnished, lockable rooms for teams. Complete privacy with all amenities included.",
      features: ["Lockable office", "Team space", "Full privacy"],
      price: "120,000 RWF/month",
      image: "/src/assets/private-office.jpg",
      spaceKey: "Private Office",
    },
    {
      icon: Calendar,
      title: "Meeting Room",
      description: "Professional setup with projector and whiteboard. Available per hour or daily rental.",
      features: ["Projector included", "Whiteboard", "Professional setup"],
      price: "10,000 RWF/hour",
      image: "/src/assets/meeting-room.jpg",
      spaceKey: "Meeting Room",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Workspace Options</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect workspace solution that fits your needs and budget.
            From flexible hot desks to private offices, we have options for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

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
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <p className="text-lg font-bold text-primary mb-4">{service.price}</p>
                    {/* This renders the button AND handles opening the modal */}
                    <BookingModal triggerText="Book Now" defaultSpace={service.spaceKey} />
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
