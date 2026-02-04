import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Upload, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLead } from "@/hooks/useLeads";

const serviceTypes = [
  { value: "installation", label: "New CCTV Installation" },
  { value: "repair", label: "Camera Repair" },
  { value: "maintenance", label: "Maintenance Service" },
  { value: "amc", label: "AMC Plan" },
  { value: "dvr-nvr", label: "DVR/NVR Setup" },
  { value: "upgrade", label: "Camera Upgrade" },
  { value: "other", label: "Other" },
];

const timeSlots = [
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 3 PM)" },
  { value: "evening", label: "Evening (3 PM - 6 PM)" },
  { value: "flexible", label: "Flexible" },
];

export default function BookService() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [serviceType, setServiceType] = useState("");
  const createLead = useCreateLead();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files).slice(0, 5)); // Max 5 files
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;

    // Validate required fields
    if (!name?.trim() || !phone?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await createLead.mutateAsync({
        name: name.trim(),
        mobile: phone.trim(),
        email: email?.trim() || undefined,
        location: city ? `${address}, ${city}` : address,
        service_type: serviceType || undefined,
        message: description?.trim() || undefined,
      });

      toast({
        title: "Booking Submitted!",
        description: "We'll confirm your appointment within 2 hours.",
      });

      (e.target as HTMLFormElement).reset();
      setFiles([]);
      setServiceType("");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-gradient py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Book a Service
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Fill out the form below and our team will get back to you within 2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="card-elevated p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Service Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Service Type *</Label>
                    <Select value={serviceType} onValueChange={setServiceType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Describe Your Issue/Requirement *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Please describe your CCTV requirements or issues in detail..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="files">Upload Images/Videos (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="files"
                        name="files"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="files" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max 5 files (Images or Videos)
                        </p>
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {files.map((file, i) => (
                          <span key={i} className="inline-flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-xs">
                            <CheckCircle className="h-3 w-3 text-success" />
                            {file.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter your complete address including landmark..."
                      rows={2}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input id="pincode" name="pincode" placeholder="560001" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Preferred Schedule
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input id="date" name="date" type="date" required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Time Slot *</Label>
                    <Select name="timeSlot" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {slot.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full btn-primary gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : (
                    <>
                      Book Service
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
