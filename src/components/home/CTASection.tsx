import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export function CTASection() {
  const whatsappNumber = "919876543210";
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in CCTV services. Please provide more information.");

  return (
    <section className="py-16 md:py-24 section-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Property?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Get a free consultation and quote for your CCTV needs. Our experts are ready to help you choose the right surveillance solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-service">
              <Button size="lg" className="btn-hero gap-2 px-8">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white gap-2 px-8">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Or call us directly at</span>
            <a href="tel:+919876543210" className="font-semibold text-white hover:underline">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
