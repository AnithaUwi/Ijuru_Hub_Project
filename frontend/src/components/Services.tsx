import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Users, Building, Calendar, Check } from "lucide-react";
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
      description:
        "Shared seating available hourly, daily, or monthly. Perfect for freelancers and remote workers.",
      features: ["Flexible seating", "High-speed internet", "Professional environment"],
      price: "From 5,000 RWF/hour",
      image: "/src/assets/hot-desk.jpg",
      spaceKey: "Hot Desk",
    },
    {
      icon: Building,
      title: "Dedicated Desk",
      description:
        "Reserved desk in the open space with monthly membership. Your own workspace in a collaborative environment.",
      features: ["Reserved space", "Storage options", "Community access"],
      price: "90,000 RWF/month",
      image: "/src/assets/dedicated-desk.jpg",
      spaceKey: "Dedicated Desk",
    },
    {
      icon: Users,
      title: "Private Offices",
      description:
        "Fully furnished, lockable rooms for teams. Complete privacy with all amenities included.",
      features: ["Lockable office", "Team space", "Full privacy"],
      price: "120,000 RWF/month",
      image: "/src/assets/private-office.jpg",
      spaceKey: "Private Office",
    },
    {
      icon: Calendar,
      title: "Meeting Room",
      description:
        "Professional setup with projector and whiteboard. Available per hour or daily rental.",
      features: ["Projector included", "Whiteboard", "Professional setup"],
      price: "10,000 RWF/hour",
      image: "/src/assets/meeting-room.jpg",
      spaceKey: "Meeting Room",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-background to-secondary/20"
      aria-labelledby="services-heading"
    >
      {/* decorative halos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Services
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Workspace <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Options</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose the perfect workspace for your needs—from flexible hot desks to private offices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 hover:-translate-y-1 hover:shadow-xl transition-all"
                aria-label={service.title}
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* gradient overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                </div>

                <CardHeader className="pb-3 text-center">
                  <div className="mx-auto -mt-8 mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20">
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col items-center gap-4 pb-6">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      {service.price}
                    </span>

                    {/* Triggers the modal and passes the space */}
                    <BookingModal
                      triggerText="Book Now"
                      defaultSpace={service.spaceKey}
                    />
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
