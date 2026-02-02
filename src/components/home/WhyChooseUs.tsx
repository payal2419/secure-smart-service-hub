import { CheckCircle, Users, Zap, ShieldCheck, Clock, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Technicians",
    description: "Our team consists of factory-trained and certified CCTV installation experts.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Same-day service for emergencies with guaranteed response within 4 hours.",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "We work with all major brands and latest surveillance technology.",
  },
  {
    icon: ThumbsUp,
    title: "Quality Assurance",
    description: "All installations come with warranty and satisfaction guarantee.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 customer support via phone, WhatsApp, and email.",
  },
  {
    icon: CheckCircle,
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden charges. Free quotes available.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Trusted Security Partner
            </h2>
            <p className="text-muted-foreground mb-8">
              With over 8 years of experience in the surveillance industry, SSK Solutionzs 
              has established itself as a leading provider of CCTV solutions. We combine 
              technical expertise with exceptional customer service.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary mb-6">
                  <ShieldCheck className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  100% Secure
                </h3>
                <p className="text-muted-foreground">
                  Your safety is our priority
                </p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-xl p-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">5000+</p>
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-xl p-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
