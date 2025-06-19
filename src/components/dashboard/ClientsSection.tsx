
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
  MapPin,
  Globe,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  TrendingUp
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
import { AddClientDialog } from "@/components/dialogs/AddClientDialog";
import { toast } from "@/hooks/use-toast";

export const ClientsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [industryFilter, setIndustryFilter] = useState("all");

  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: "Acme Corporation",
      industry: "Technology",
      contactPerson: "Jennifer Smith",
      email: "contact@acme.com",
      phone: "+1 (555) 111-2222",
      address: "123 Business Ave, Tech City, TC 12345",
      website: "https://acme.com",
      relationshipScore: 95,
      activeProjects: 3,
      totalRevenue: 125000,
      accountManager: "Sarah Johnson",
      lastContact: "2024-01-16"
    },
    {
      id: 2,
      companyName: "Global Solutions Ltd",
      industry: "Consulting",
      contactPerson: "Robert Brown",
      email: "info@globalsolutions.com",
      phone: "+1 (555) 333-4444",
      address: "456 Corporate Blvd, Metro City, MC 67890",
      website: "https://globalsolutions.com",
      relationshipScore: 88,
      activeProjects: 2,
      totalRevenue: 89000,
      accountManager: "Mike Wilson",
      lastContact: "2024-01-14"
    },
    {
      id: 3,
      companyName: "Innovation Hub",
      industry: "Startup",
      contactPerson: "Lisa Chen",
      email: "hello@innovationhub.com",
      phone: "+1 (555) 555-6666",
      address: "789 Startup St, Silicon Valley, SV 11111",
      website: "https://innovationhub.com",
      relationshipScore: 92,
      activeProjects: 4,
      totalRevenue: 156000,
      accountManager: "John Doe",
      lastContact: "2024-01-15"
    },
    {
      id: 4,
      companyName: "Healthcare Plus",
      industry: "Healthcare",
      contactPerson: "Dr. Amanda Wilson",
      email: "contact@healthcareplus.com",
      phone: "+1 (555) 777-8888",
      address: "321 Medical Center Dr, Health City, HC 54321",
      website: "https://healthcareplus.com",
      relationshipScore: 87,
      activeProjects: 1,
      totalRevenue: 78000,
      accountManager: "Lisa Williams",
      lastContact: "2024-01-13"
    }
  ]);

  const getRelationshipColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800",
      healthcare: "bg-green-100 text-green-800",
      finance: "bg-yellow-100 text-yellow-800",
      consulting: "bg-purple-100 text-purple-800",
      startup: "bg-pink-100 text-pink-800",
      retail: "bg-indigo-100 text-indigo-800",
      manufacturing: "bg-gray-100 text-gray-800"
    };
    return colors[industry.toLowerCase() as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
    toast({
      title: "Client Deleted",
      description: "Client has been removed from your list.",
    });
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "all" || client.industry.toLowerCase() === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const totalProjects = filteredClients.reduce((sum, client) => sum + client.activeProjects, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Client Management</h2>
          <p className="text-muted-foreground">Manage your existing client relationships</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredClients.length}</div>
            <p className="text-xs text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(filteredClients.reduce((sum, client) => sum + client.relationshipScore, 0) / filteredClients.length || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">Avg Relationship</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{client.companyName}</h3>
                    <Badge className={getIndustryColor(client.industry)} variant="outline">
                      {client.industry}
                    </Badge>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${getRelationshipColor(client.relationshipScore)}`}>
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-sm font-medium">{client.relationshipScore}%</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{client.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.address}</span>
                  </div>

                  {client.website && (
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {client.website}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>Projects: <span className="font-semibold text-blue-600">{client.activeProjects}</span></span>
                    <span>Revenue: <span className="font-semibold text-green-600">${client.totalRevenue.toLocaleString()}</span></span>
                    <span>Manager: <span className="font-medium text-foreground">{client.accountManager}</span></span>
                    <span>Last Contact: <span className="font-medium text-foreground">{client.lastContact}</span></span>
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
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              {searchTerm || industryFilter !== "all" 
                ? "No clients match your current filters." 
                : "No clients found. Add your first client to get started."}
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Client
            </Button>
          </CardContent>
        </Card>
      )}

      <AddClientDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onClientAdded={() => {
          toast({
            title: "Success",
            description: "Client list refreshed",
          });
        }}
      />
    </div>
  );
};
