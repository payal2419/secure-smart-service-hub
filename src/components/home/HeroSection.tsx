import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Award, Headphones } from "lucide-react";

const stats = [
  { icon: Shield, value: "5000+", label: "Installations" },
  { icon: Clock, value: "24/7", label: "Support" },
  { icon: Award, value: "8+", label: "Years Experience" },
  { icon: Headphones, value: "98%", label: "Client Satisfaction" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden section-gradient py-20 md:py-28 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Trusted by 5000+ Customers</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Professional CCTV
              <br />
              <span className="text-white/90">Security Solutions</span>
            </h1>
            
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Complete surveillance solutions for homes, offices, and commercial spaces. 
              Expert installation, maintenance, and 24/7 support to keep your premises secure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/book-service">
                <Button size="lg" className="btn-hero gap-2 px-8">
                  Book Service
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="btn-hero-outline gap-2 px-8">
                  <Play className="h-4 w-4" />
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="hidden lg:block animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-effect rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-colors"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-heading text-2xl font-bold text-foreground">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <stat.icon className="h-6 w-6 text-white mb-2" />
              <span className="font-heading text-xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
