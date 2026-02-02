import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  UserPlus,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const requests = [
  { id: "SR001", customer: "Rajesh Kumar", phone: "+91 98765 43210", service: "CCTV Installation", address: "Koramangala, Bangalore", status: "Pending", date: "2024-01-15", technician: null },
  { id: "SR002", customer: "Priya Sharma", phone: "+91 87654 32109", service: "Camera Repair", address: "Indiranagar, Bangalore", status: "In Progress", date: "2024-01-14", technician: "Anil Kumar" },
  { id: "SR003", customer: "Mohammed Ali", phone: "+91 76543 21098", service: "AMC Service", address: "Whitefield, Bangalore", status: "Completed", date: "2024-01-13", technician: "Suresh M" },
  { id: "SR004", customer: "Anita Desai", phone: "+91 65432 10987", service: "DVR Setup", address: "Electronic City, Bangalore", status: "Pending", date: "2024-01-12", technician: null },
  { id: "SR005", customer: "Sunil Verma", phone: "+91 54321 09876", service: "Maintenance", address: "HSR Layout, Bangalore", status: "In Progress", date: "2024-01-11", technician: "Ravi P" },
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

export default function ServiceRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Service Requests</h1>
        <Button className="btn-primary gap-2">
          <UserPlus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Requests ({filteredRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Technician</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm">{req.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground text-sm">{req.customer}</p>
                        <p className="text-xs text-muted-foreground">{req.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground hidden md:table-cell">{req.service}</td>
                    <td className="py-3 px-4 text-sm hidden lg:table-cell">
                      {req.technician ? (
                        <span className="text-foreground">{req.technician}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not assigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(req.status)}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{req.date}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserPlus className="h-4 w-4" />
                            Assign Technician
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
