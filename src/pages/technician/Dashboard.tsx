import { 
  ClipboardList, 
  Clock, 
  CheckCircle,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: ClipboardList, label: "Assigned Jobs", value: "8", color: "text-primary" },
  { icon: Clock, label: "In Progress", value: "3", color: "text-warning" },
  { icon: CheckCircle, label: "Completed Today", value: "5", color: "text-success" },
];

const todayJobs = [
  { 
    id: "SR002", 
    customer: "Priya Sharma", 
    phone: "+91 87654 32109",
    service: "Camera Repair", 
    address: "42, MG Road, Indiranagar, Bangalore - 560038",
    time: "10:00 AM",
    status: "In Progress",
    notes: "2 dome cameras not working, check power supply"
  },
  { 
    id: "SR005", 
    customer: "Sunil Verma", 
    phone: "+91 54321 09876",
    service: "Maintenance", 
    address: "Tech Park, HSR Layout, Bangalore - 560102",
    time: "2:00 PM",
    status: "Pending",
    notes: "Quarterly maintenance for 8 cameras"
  },
  { 
    id: "SR007", 
    customer: "Ravi Industries", 
    phone: "+91 43210 98765",
    service: "DVR Repair", 
    address: "Industrial Area, Peenya, Bangalore - 560058",
    time: "4:30 PM",
    status: "Pending",
    notes: "DVR not recording, possible HDD failure"
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Pending":
      return <Badge variant="outline" className="status-pending">{status}</Badge>;
    case "In Progress":
      return <Badge variant="outline" className="status-progress">{status}</Badge>;
    case "Completed":
      return <Badge variant="outline" className="status-completed">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function TechnicianDashboard() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Good Morning, Anil!</h1>
        <p className="text-muted-foreground">Here are your jobs for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto ${stat.color}`} />
              <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{job.id}</span>
                    {getStatusBadge(job.status)}
                  </div>
                  <h3 className="font-semibold text-foreground">{job.customer}</h3>
                  <p className="text-sm text-primary">{job.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{job.time}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{job.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${job.phone}`} className="hover:text-primary">{job.phone}</a>
                </div>
                <p className="text-muted-foreground bg-muted/50 rounded p-2 text-xs">
                  <strong>Notes:</strong> {job.notes}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                {job.status === "Pending" && (
                  <Button size="sm" className="btn-primary flex-1">
                    Start Job
                  </Button>
                )}
                {job.status === "In Progress" && (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Progress
                    </Button>
                    <Button size="sm" className="btn-primary flex-1">
                      Complete Job
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
