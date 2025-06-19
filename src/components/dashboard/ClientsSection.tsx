
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, Building, MapPin } from "lucide-react";

export const ClientsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      companyName: "Acme Corporation",
      industry: "Technology",
      email: "contact@acme.com",
      phone: "+1 (555) 111-2222",
      address: "123 Business Ave, Tech City, TC 12345",
      relationshipScore: 95,
      activeProjects: 3,
      totalRevenue: 125000
    },
    {
      id: 2,
      companyName: "Global Solutions Ltd",
      industry: "Consulting",
      email: "info@globalsolutions.com",
      phone: "+1 (555) 333-4444",
      address: "456 Corporate Blvd, Metro City, MC 67890",
      relationshipScore: 88,
      activeProjects: 2,
      totalRevenue: 89000
    },
    {
      id: 3,
      companyName: "Innovation Hub",
      industry: "Startup",
      email: "hello@innovationhub.com",
      phone: "+1 (555) 555-6666",
      address: "789 Startup St, Silicon Valley, SV 11111",
      relationshipScore: 92,
      activeProjects: 4,
      totalRevenue: 156000
    }
  ];

  const getRelationshipColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Management</h2>
          <p className="text-muted-foreground">Manage your existing client relationships</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{client.companyName}</h3>
                    <Badge variant="outline">{client.industry}</Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">Relationship Score:</span>
                      <span className={`font-semibold ${getRelationshipColor(client.relationshipScore)}`}>
                        {client.relationshipScore}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Active Projects: <span className="font-semibold text-foreground">{client.activeProjects}</span></span>
                    <span>Total Revenue: <span className="font-semibold text-foreground">${client.totalRevenue.toLocaleString()}</span></span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
