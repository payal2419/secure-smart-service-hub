import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: ClipboardList, label: "Total Requests", value: "156", change: "+12%", color: "text-primary" },
  { icon: Clock, label: "Pending", value: "23", change: "-5%", color: "text-warning" },
  { icon: CheckCircle, label: "Completed", value: "128", change: "+18%", color: "text-success" },
  { icon: Users, label: "Active Customers", value: "89", change: "+8%", color: "text-info" },
];

const recentRequests = [
  { id: "SR001", customer: "Rajesh Kumar", service: "CCTV Installation", status: "Pending", date: "2 hours ago" },
  { id: "SR002", customer: "Priya Sharma", service: "Camera Repair", status: "In Progress", date: "4 hours ago" },
  { id: "SR003", customer: "Mohammed Ali", service: "AMC Service", status: "Completed", date: "6 hours ago" },
  { id: "SR004", customer: "Anita Desai", service: "DVR Setup", status: "Pending", date: "8 hours ago" },
  { id: "SR005", customer: "Sunil Verma", service: "Maintenance", status: "In Progress", date: "1 day ago" },
];

const upcomingAMC = [
  { customer: "TechPark Ltd", expires: "5 days", cameras: 24 },
  { customer: "Royal Hotel", expires: "12 days", cameras: 48 },
  { customer: "City Mall", expires: "18 days", cameras: 96 },
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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-primary/10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-success font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Service Requests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                      <span className="text-xs font-mono text-muted-foreground">{request.id}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{request.customer}</p>
                      <p className="text-xs text-muted-foreground">{request.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-muted-foreground hidden md:block">{request.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AMC Expiring */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              AMC Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAMC.map((amc) => (
                <div
                  key={amc.customer}
                  className="flex items-center justify-between p-3 rounded-lg border border-warning/20 bg-warning/5"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{amc.customer}</p>
                    <p className="text-xs text-muted-foreground">{amc.cameras} cameras</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">{amc.expires}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Contracts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
