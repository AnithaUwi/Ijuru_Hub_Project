import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+250 798287944",
      description: "Call us during business hours",
      href: "tel:+250798287944",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@ijuruhub.rw",
      description: "We'll respond within 24 hours",
      href: "mailto:info@ijuruhub.rw",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "42 KG 40 St, Kimironko",
      description: "Kigali, Rwanda",
      href: "https://maps.google.com/?q=42%20KG%2040%20St,%20Kimironko%20Kigali%20Rwanda",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: "Mon–Fri: 8AM–8PM",
      description: "Sat–Sun: 9AM–5PM",
      href: undefined,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-background to-secondary/20"
      aria-labelledby="contact-heading"
    >
      {/* decorative halos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Contact
          </span>
          <h2 id="contact-heading" className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Get <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">In Touch</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Ready to join our community? Book a workspace or schedule a tour—let’s get you productive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
                  info.href ? (
                    <a
                      href={info.href}
                      target={info.title === "Address" ? "_blank" : undefined}
                      rel={info.title === "Address" ? "noopener noreferrer" : undefined}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                    >
                      {children}
                    </a>
                  ) : (
                    <div>{children}</div>
                  );

                return (
                  <Wrapper key={i}>
                    <Card className="border-border/60 bg-card/70 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20">
                            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{info.title}</h4>
                            <p className="text-primary font-medium leading-tight">{info.details}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Wrapper>
                );
              })}
            </div>

            {/* Operating Hours (detailed) */}
            <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Detailed Operating Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monday – Friday</span>
                  <span className="font-medium">8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sunday & Holidays</span>
                  <span className="font-medium">9:00 AM – 5:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-border/60 bg-card/70 backdrop-blur shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // hook up to your handler / API here
                  }}
                  className="space-y-6"
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-foreground">
                        First Name<span className="text-primary">*</span>
                      </label>
                      <Input id="firstName" name="firstName" placeholder="John" required autoComplete="given-name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-foreground">
                        Last Name<span className="text-primary">*</span>
                      </label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required autoComplete="family-name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        Email<span className="text-primary">*</span>
                      </label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <Input id="phone" name="phone" type="tel" placeholder="+250 XXX XXX XXX" autoComplete="tel" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-medium text-foreground">
                      Workspace Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="Hot Desk"
                    >
                      <option>Hot Desk</option>
                      <option>Dedicated Desk</option>
                      <option>Private Office</option>
                      <option>Meeting Room</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your workspace needs..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl bg-gradient-to-r from-primary to-primary/80 text-white">
            <CardContent className="p-10 md:p-12">
              <h3 className="text-3xl font-bold mb-3">Ready to Join Our Community?</h3>
              <p className="text-lg md:text-xl mb-8/">
                Experience the perfect blend of productivity and collaboration at IJURU HUB.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="px-8 py-3" onClick={() => {
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  Schedule a Tour
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
                  onClick={() => {
                    document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
