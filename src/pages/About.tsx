import { Shield, Users, Award, Target, CheckCircle } from "lucide-react";

const team = [
  {
    name: "Suresh Kumar",
    role: "Founder & CEO",
    bio: "15+ years experience in security systems",
  },
  {
    name: "Anil Singh",
    role: "Technical Head",
    bio: "Certified CCTV installation expert",
  },
  {
    name: "Priya Menon",
    role: "Operations Manager",
    bio: "Ensures smooth service delivery",
  },
];

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Your safety and security is our top priority in every installation.",
  },
  {
    icon: Target,
    title: "Quality Focused",
    description: "We use only the best equipment and follow industry standards.",
  },
  {
    icon: Users,
    title: "Customer Centric",
    description: "We build lasting relationships through exceptional service.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Continuous improvement and staying updated with latest technology.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-gradient py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About SSK Solutionzs
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Your trusted partner for professional CCTV and surveillance solutions since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                8+ Years of Securing What Matters Most
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SSK Solutionzs was founded in 2015 with a simple mission: to provide 
                  reliable, professional CCTV solutions that give our customers peace of mind.
                </p>
                <p>
                  What started as a small team of passionate security experts has grown into 
                  a trusted name in the industry, serving over 5,000 satisfied customers 
                  across residential, commercial, and industrial sectors.
                </p>
                <p>
                  Today, we're proud to be one of the leading CCTV service providers, 
                  known for our technical expertise, customer-first approach, and 
                  commitment to quality.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-elevated p-6 text-center">
                <p className="font-heading text-4xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground mt-1">Installations</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <p className="font-heading text-4xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <p className="font-heading text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Team Members</p>
              </div>
              <div className="card-elevated p-6 text-center">
                <p className="font-heading text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
              Our Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Meet the Experts
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="card-elevated p-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-2xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
              Certifications & Partnerships
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["ISO Certified", "Hikvision Partner", "Dahua Authorized", "CP Plus Dealer"].map((cert) => (
                <div key={cert} className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
