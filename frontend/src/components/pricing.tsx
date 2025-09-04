import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Pricing = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pricingPlans = [
    {
      name: "Hourly",
      price: "5,000",
      period: "per hour",
      description: "Perfect for short sessions and meetings",
      features: [
        "Open workspace access",
        "High-speed internet",
        "Reception support",
        "Water & coffee"
      ],
      popular: false
    },
    {
      name: "Daily",
      price: "7,000",
      period: "per day",
      description: "Great for day-long productive sessions",
      features: [
        "Full day access",
        "High-speed internet",
        "Reception support",
        "Water & coffee",
        "Parking space"
      ],
      popular: false
    },
    {
      name: "Weekly",
      price: "30,000",
      period: "per week",
      description: "Ideal for short-term projects",
      features: [
        "7 days access",
        "High-speed internet",
        "Reception support",
        "Water & coffee",
        "Parking space",
        "Networking events"
      ],
      popular: true
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
        "Community access"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Flexible Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose a plan that works for your schedule and budget. 
            All plans include our core amenities and professional environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm mb-4">{plan.description}</CardDescription>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">RWF</span>
                  <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => scrollToSection('contact')}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dedicated Desks & Private Offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Dedicated Desk</CardTitle>
              <CardDescription className="text-center">Reserved desk in open space</CardDescription>
              <div className="text-center pt-4">
                <span className="text-4xl font-bold text-primary">90,000</span>
                <span className="text-sm text-muted-foreground ml-1">RWF/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                Get Dedicated Desk
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Private Office</CardTitle>
              <CardDescription className="text-center">Fully furnished lockable room</CardDescription>
              <div className="text-center pt-4">
                <span className="text-4xl font-bold text-primary">120,000</span>
                <span className="text-sm text-muted-foreground ml-1">RWF/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                Get Private Office
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;