import { 
  Camera, 
  Wrench, 
  FileCheck, 
  HardDrive, 
  RefreshCw, 
  Settings,
  CheckCircle,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "installation",
    icon: Camera,
    title: "CCTV Installation",
    description: "Professional installation of HD, IP, and analog cameras for all types of premises.",
    features: [
      "Site survey and consultation",
      "HD/IP/Analog camera installation",
      "Wiring and cable management",
      "DVR/NVR configuration",
      "Mobile app setup",
      "User training",
    ],
    price: "Starting from ₹8,999",
  },
  {
    id: "repair",
    icon: Wrench,
    title: "Camera Repair",
    description: "Quick diagnosis and repair of all CCTV camera brands and models.",
    features: [
      "All brand cameras supported",
      "On-site repair service",
      "Lens and sensor replacement",
      "DVR/NVR repair",
      "90-day repair warranty",
      "Express service available",
    ],
    price: "Starting from ₹499",
  },
  {
    id: "amc",
    icon: FileCheck,
    title: "AMC Plans",
    description: "Annual maintenance contracts with regular checkups and priority support.",
    features: [
      "Quarterly preventive maintenance",
      "Priority support (4-hour response)",
      "Free minor repairs",
      "Discounted replacement parts",
      "24/7 helpline access",
      "Performance reports",
    ],
    price: "Starting from ₹5,999/year",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Regular Maintenance",
    description: "Regular servicing, cleaning, and optimization of your surveillance system.",
    features: [
      "Camera cleaning & adjustment",
      "Cable and connector check",
      "Storage optimization",
      "Firmware updates",
      "Night vision calibration",
      "System health report",
    ],
    price: "Starting from ₹1,499",
  },
  {
    id: "dvr-nvr",
    icon: HardDrive,
    title: "DVR/NVR Setup",
    description: "Expert configuration of recording systems with cloud backup options.",
    features: [
      "DVR/NVR installation",
      "Hard disk configuration",
      "Cloud backup setup",
      "Remote viewing setup",
      "Multi-site configuration",
      "Backup automation",
    ],
    price: "Starting from ₹2,999",
  },
  {
    id: "upgrade",
    icon: RefreshCw,
    title: "Camera Upgrade",
    description: "Upgrade to latest HD/4K cameras with improved night vision and features.",
    features: [
      "HD to 4K upgrade",
      "Analog to IP migration",
      "Night vision enhancement",
      "Wide-angle conversion",
      "PTZ camera upgrade",
      "Smart camera features",
    ],
    price: "Starting from ₹4,999",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-gradient py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Comprehensive CCTV solutions for homes, offices, and commercial establishments. 
              Professional service backed by years of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-primary">
                      {service.price}
                    </span>
                    <Link to="/book-service">
                      <Button className="btn-primary gap-2">
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <service.icon className="h-24 w-24 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us for a personalized quote based on your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" className="gap-2">
                  Contact Us
                </Button>
              </Link>
              <Link to="/book-service">
                <Button className="btn-primary gap-2">
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
