import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "CCTV Installation", href: "/services#installation" },
    { label: "Camera Repair", href: "/services#repair" },
    { label: "AMC Plans", href: "/services#amc" },
    { label: "DVR/NVR Setup", href: "/services#dvr-nvr" },
    { label: "Camera Upgrade", href: "/services#upgrade" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Book Service", href: "/book-service" },
    { label: "Track Request", href: "/track" },
    { label: "FAQs", href: "/faqs" },
    { label: "Support", href: "/support" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold">
                  SSK Solutionzs
                </span>
                <span className="text-xs text-sidebar-foreground/60">CCTV Experts</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-sm">
              Your trusted partner for professional CCTV installation, maintenance, and surveillance solutions. Securing your premises since 2015.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-sidebar-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm text-sidebar-foreground/70">+91 98765 43210</p>
                  <p className="text-sm text-sidebar-foreground/70">+91 87654 32109</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <p className="text-sm text-sidebar-foreground/70">info@ssksolutionzs.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <p className="text-sm text-sidebar-foreground/70">
                  123 Security Plaza, Tech Park<br />
                  Bangalore - 560001
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sidebar-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sidebar-foreground/60">
              © {new Date().getFullYear()} SSK Solutionzs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-sidebar-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-sidebar-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
