
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, Building } from "lucide-react";
import { AddLeadDialog } from "@/components/dialogs/AddLeadDialog";

export const LeadsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const leads = [
    {
      id: 1,
      name: "John Smith",
      company: "TechCorp Inc",
      email: "john@techcorp.com",
      phone: "+1 (555) 123-4567",
      status: "new",
      heatScore: 85,
      source: "website",
      estimatedValue: 15000
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
      estimatedValue: 25000
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
      estimatedValue: 40000
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-orange-100 text-orange-800",
      converted: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getHeatScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Leads Management</h2>
          <p className="text-muted-foreground">Track and manage your potential customers</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">Heat Score:</span>
                      <span className={`font-semibold ${getHeatScoreColor(lead.heatScore)}`}>
                        {lead.heatScore}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.company}</span>
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
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Source: {lead.source}</span>
                      <span>Est. Value: ${lead.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
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

      <AddLeadDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};
