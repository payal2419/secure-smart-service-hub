import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLeads, useUpdateLead, useDeleteLead, Lead } from "@/hooks/useLeads";
import { format } from "date-fns";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "New", label: "New" },
  { value: "In Progress", label: "In Progress" },
  { value: "Closed", label: "Closed" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "New":
      return <Badge className="bg-info text-info-foreground">{status}</Badge>;
    case "In Progress":
      return <Badge className="bg-warning text-warning-foreground">{status}</Badge>;
    case "Closed":
      return <Badge className="bg-success text-success-foreground">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AdminLeads() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const { data: leads, isLoading, error } = useLeads({
    status: statusFilter,
    search: search || undefined,
  });

  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.admin_notes || "");
    setIsDetailOpen(true);
  };

  const handleSaveLead = async () => {
    if (!selectedLead) return;

    try {
      await updateLead.mutateAsync({
        id: selectedLead.id,
        updates: {
          status: editStatus,
          admin_notes: editNotes || null,
        },
      });
      toast({
        title: "Lead Updated",
        description: "The lead has been updated successfully.",
      });
      setIsDetailOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update lead.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;

    try {
      await deleteLead.mutateAsync(leadToDelete);
      toast({
        title: "Lead Deleted",
        description: "The lead has been deleted.",
      });
      setIsDeleteOpen(false);
      setLeadToDelete(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete lead.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (id: string) => {
    setLeadToDelete(id);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground text-sm">
            Manage enquiries and service requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or mobile..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Leads {leads && `(${leads.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              Failed to load leads. Please try again.
            </div>
          ) : leads && leads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leads found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Mobile
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm hidden md:table-cell">
                      Service
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm hidden lg:table-cell">
                      Created
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">{lead.name}</div>
                        {lead.email && (
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-foreground">{lead.mobile}</td>
                      <td className="py-3 px-4 text-foreground hidden md:table-cell">
                        {lead.service_type || "-"}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                      <td className="py-3 px-4 text-muted-foreground text-sm hidden lg:table-cell">
                        {format(new Date(lead.created_at), "dd MMM yyyy, hh:mm a")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewLead(lead)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDelete(lead.id)}
                            title="Delete lead"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedLead.name}</p>
                    <p className="text-sm text-muted-foreground">Name</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedLead.mobile}</p>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                  </div>
                </div>
                {selectedLead.email && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedLead.email}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>
                )}
                {selectedLead.location && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedLead.location}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {format(new Date(selectedLead.created_at), "dd MMM yyyy, hh:mm a")}
                    </p>
                    <p className="text-sm text-muted-foreground">Created At</p>
                  </div>
                </div>
              </div>

              {selectedLead.service_type && (
                <div>
                  <Label className="text-muted-foreground">Service Type</Label>
                  <p className="font-medium text-foreground">{selectedLead.service_type}</p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <Label className="text-muted-foreground">Message</Label>
                  <p className="text-foreground whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLead} disabled={updateLead.isPending}>
              {updateLead.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLead}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLead.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
