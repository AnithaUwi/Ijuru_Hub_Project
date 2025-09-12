import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pricingPlans = [
    {
      name: "Hourly",
      price: "5,000",
      period: "per hour",
      description: "Perfect for short sessions and meetings",
      features: ["Open workspace access", "High-speed internet", "Reception support", "Water & coffee"],
      popular: false,
    },
    {
      name: "Daily",
      price: "7,000",
      period: "per day",
      description: "Great for day-long productive sessions",
      features: ["Full day access", "High-speed internet", "Reception support", "Water & coffee", "Parking space"],
      popular: false,
    },
    {
      name: "Weekly",
      price: "30,000",
      period: "per week",
      description: "Ideal for short-term projects",
      features: ["7 days access", "High-speed internet", "Reception support", "Water & coffee", "Parking space", "Networking events"],
      popular: true,
    },
    {
      name: "Monthly Hot Desk",
      price: "60,000",
      period: "per month",
      description: "Flexible monthly membership",
      features: [
        "Unlimited access",
        "High-speed internet",
        "Reception support",
        "Water & coffee",
        "Parking space",
        "Networking events",
        "Community access",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden py-24 bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Flexible <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose a plan that fits your rhythm and budget. Every plan includes our core amenities and a professional, friendly environment.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {pricingPlans.map((plan, i) => (
            <Card
              key={i}
              className={[
                "relative bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-border/60",
                "hover:-translate-y-1 hover:shadow-xl transition-all",
                plan.popular ? "ring-2 ring-primary shadow-lg" : "",
              ].join(" ")}
              aria-label={`${plan.name} plan`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-3 text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-extrabold leading-none text-primary">{plan.price}</span>
                    <span className="mb-1 text-xs text-muted-foreground tracking-wide">RWF</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.period}</p>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                      <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => scrollToSection("contact")}
                  aria-label={`Choose ${plan.name}`}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dedicated Desks & Private Offices */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background/30 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Dedicated Desk</CardTitle>
              <CardDescription>Reserved desk in open space</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-extrabold text-primary">90,000</span>
                <span className="ml-1 text-sm text-muted-foreground">RWF/month</span>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Button className="w-full" variant="outline" onClick={() => scrollToSection("contact")}>
                Get Dedicated Desk
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background/30 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Private Office</CardTitle>
              <CardDescription>Fully furnished lockable room</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-extrabold text-primary">120,000</span>
                <span className="ml-1 text-sm text-muted-foreground">RWF/month</span>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Button className="w-full" variant="outline" onClick={() => scrollToSection("contact")}>
                Get Private Office
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="px-8"
            aria-label="Talk to us about a custom plan"
          >
            Need a custom plan? Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
