import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Wrench, 
  FileCheck, 
  HardDrive, 
  RefreshCw, 
  Settings,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Professional installation of HD, IP, and analog cameras for all types of premises.",
    href: "/services#installation",
  },
  {
    icon: Wrench,
    title: "Camera Repair",
    description: "Quick diagnosis and repair of all CCTV camera brands and models.",
    href: "/services#repair",
  },
  {
    icon: FileCheck,
    title: "AMC Plans",
    description: "Annual maintenance contracts with regular checkups and priority support.",
    href: "/services#amc",
  },
  {
    icon: Settings,
    title: "Maintenance",
    description: "Regular servicing, cleaning, and optimization of your surveillance system.",
    href: "/services#maintenance",
  },
  {
    icon: HardDrive,
    title: "DVR/NVR Setup",
    description: "Expert configuration of recording systems with cloud backup options.",
    href: "/services#dvr-nvr",
  },
  {
    icon: RefreshCw,
    title: "Camera Upgrade",
    description: "Upgrade to latest HD/4K cameras with improved night vision and features.",
    href: "/services#upgrade",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete CCTV Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From installation to maintenance, we provide end-to-end surveillance solutions 
            tailored to your security needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="card-interactive p-6 group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" variant="outline" className="gap-2">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
