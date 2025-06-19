
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddLeadDialog } from "@/components/dialogs/AddLeadDialog";
import { toast } from "@/hooks/use-toast";

export const LeadsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Smith",
      company: "TechCorp Inc",
      email: "john@techcorp.com",
      phone: "+1 (555) 123-4567",
      status: "new",
      heatScore: 85,
      source: "website",
      estimatedValue: 15000,
      priority: "high",
      lastContact: "2024-01-10",
      assignedTo: "Sarah Johnson"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "InnovateLLC",
      email: "sarah@innovate.com",
      phone: "+1 (555) 987-6543",
      status: "contacted",
      heatScore: 72,
      source: "referral",
      estimatedValue: 25000,
      priority: "medium",
      lastContact: "2024-01-12",
      assignedTo: "Mike Wilson"
    },
    {
      id: 3,
      name: "Mike Wilson",
      company: "Future Systems",
      email: "mike@futuresys.com",
      phone: "+1 (555) 456-7890",
      status: "qualified",
      heatScore: 91,
      source: "linkedin",
      estimatedValue: 40000,
      priority: "urgent",
      lastContact: "2024-01-15",
      assignedTo: "John Doe"
    },
    {
      id: 4,
      name: "Emma Davis",
      company: "StartupHub",
      email: "emma@startuphub.com",
      phone: "+1 (555) 321-0987",
      status: "proposal",
      heatScore: 88,
      source: "event",
      estimatedValue: 32000,
      priority: "high",
      lastContact: "2024-01-14",
      assignedTo: "Sarah Johnson"
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      qualified: "bg-orange-100 text-orange-800 border-orange-200",
      proposal: "bg-purple-100 text-purple-800 border-purple-200",
      converted: "bg-green-100 text-green-800 border-green-200",
      lost: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getHeatScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    toast({
      title: "Status Updated",
      description: "Lead status has been updated successfully.",
    });
  };

  const handleDeleteLead = (leadId: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    toast({
      title: "Lead Deleted",
      description: "Lead has been removed from your list.",
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
          <p className="text-muted-foreground">Track and nurture your potential customers</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredLeads.length}</div>
            <p className="text-xs text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pipeline Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(filteredLeads.reduce((sum, lead) => sum + lead.heatScore, 0) / filteredLeads.length || 0)}
            </div>
            <p className="text-xs text-muted-foreground">Avg Heat Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredLeads.filter(lead => lead.status === "qualified").length}
            </div>
            <p className="text-xs text-muted-foreground">Qualified</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="google">Google Ads</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{lead.name}</h3>
                    <Badge className={getStatusColor(lead.status)} variant="outline">
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                    <Badge className={getPriorityColor(lead.priority)} variant="outline">
                      {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                    </Badge>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${getHeatScoreColor(lead.heatScore)}`}>
                      <Star className="h-3 w-3" />
                      <span className="text-sm font-medium">{lead.heatScore}</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>Source: <span className="font-medium text-foreground">{lead.source}</span></span>
                    <span>Value: <span className="font-semibold text-green-600">${lead.estimatedValue.toLocaleString()}</span></span>
                    <span>Assigned: <span className="font-medium text-foreground">{lead.assignedTo}</span></span>
                    <span>Last Contact: <span className="font-medium text-foreground">{lead.lastContact}</span></span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Lead
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "contacted")}>
                      Mark as Contacted
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "qualified")}>
                      Mark as Qualified
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "proposal")}>
                      Send Proposal
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteLead(lead.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Lead
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || sourceFilter !== "all" 
                ? "No leads match your current filters." 
                : "No leads found. Add your first lead to get started."}
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Lead
            </Button>
          </CardContent>
        </Card>
      )}

      <AddLeadDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onLeadAdded={() => {
          // In a real app, you'd refresh the leads list here
          toast({
            title: "Success",
            description: "Lead list refreshed",
          });
        }}
      />
    </div>
  );
};
