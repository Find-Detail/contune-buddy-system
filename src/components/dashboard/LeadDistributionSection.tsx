
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Settings, Users, BarChart3, Clock, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const LeadDistributionSection = () => {
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);

  // Mock data for distribution rules
  const [distributionRules] = useState([
    {
      id: "1",
      name: "VIP Leads - Priority Assignment",
      source: "all",
      distributionType: "weighted",
      priority: 1,
      isActive: true,
      conditions: { estimatedValue: ">= 50000" },
      assignedUsers: 2,
      leadsDistributed: 8,
      successRate: 95
    },
    {
      id: "2", 
      name: "Facebook Leads - Round Robin",
      source: "facebook",
      distributionType: "round_robin",
      priority: 2,
      isActive: true,
      conditions: {},
      assignedUsers: 5,
      leadsDistributed: 45,
      successRate: 88
    },
    {
      id: "3",
      name: "Website Leads - Team Based",
      source: "website",
      distributionType: "team_based", 
      priority: 3,
      isActive: true,
      conditions: { source: "website" },
      assignedUsers: 3,
      leadsDistributed: 22,
      successRate: 92
    }
  ]);

  // Mock data for recent distributions
  const [recentDistributions] = useState([
    {
      id: "1",
      leadName: "John Smith",
      company: "TechCorp Inc",
      assignedTo: "Sarah Johnson",
      rule: "VIP Leads - Priority Assignment",
      distributedAt: "2024-01-15T14:30:00Z",
      status: "contacted"
    },
    {
      id: "2", 
      leadName: "Emma Davis",
      company: "StartupHub",
      assignedTo: "Mike Wilson",
      rule: "Facebook Leads - Round Robin",
      distributedAt: "2024-01-15T13:45:00Z",
      status: "new"
    }
  ]);

  const handleRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Distribution Rule Created",
      description: "Lead distribution rule has been created successfully.",
    });
    setShowRuleDialog(false);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assignment Updated",
      description: "Rule assignments have been updated successfully.",
    });
    setShowAssignmentDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lead Distribution</h2>
          <p className="text-muted-foreground">Manage automated lead distribution rules and assignments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Distribution Rule</DialogTitle>
                <DialogDescription>
                  Set up automated rules for distributing leads to your team members.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRuleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ruleName">Rule Name</Label>
                      <Input id="ruleName" placeholder="Enter rule name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input id="priority" type="number" placeholder="1" min="1" max="10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="source">Lead Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lead source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sources</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="google">Google Ads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="distributionType">Distribution Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select distribution type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round_robin">Round Robin</SelectItem>
                          <SelectItem value="weighted">Weighted</SelectItem>
                          <SelectItem value="team_based">Team Based</SelectItem>
                          <SelectItem value="manual">Manual Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="conditions">Conditions (JSON)</Label>
                    <Textarea 
                      id="conditions" 
                      placeholder='{"estimatedValue": ">= 10000", "source": "facebook"}'
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="isActive" defaultChecked />
                    <Label htmlFor="isActive">Enable this rule</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowRuleDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Rule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <div className="text-2xl font-bold">3</div>
            </div>
            <p className="text-xs text-muted-foreground">Active Rules</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">75</div>
            </div>
            <p className="text-xs text-muted-foreground">Leads Distributed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div className="text-2xl font-bold">1.2min</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Distribution Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div className="text-2xl font-bold">92%</div>
            </div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Rules</CardTitle>
          <CardDescription>
            Manage your automated lead distribution rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distributionRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{rule.name}</h3>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">Priority {rule.priority}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <span>Source: <span className="font-medium text-foreground">{rule.source}</span></span>
                    <span>Type: <span className="font-medium text-foreground">{rule.distributionType.replace('_', ' ')}</span></span>
                    <span>Assigned: <span className="font-medium text-foreground">{rule.assignedUsers} users</span></span>
                    <span>Distributed: <span className="font-medium text-green-600">{rule.leadsDistributed}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{rule.successRate}%</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Distributions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Distributions</CardTitle>
          <CardDescription>
            Latest lead assignments made by your distribution rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDistributions.map((distribution) => (
              <div key={distribution.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium">{distribution.leadName}</h4>
                    <Badge variant="outline">{distribution.company}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Assigned to <span className="font-medium text-foreground">{distribution.assignedTo}</span> via {distribution.rule}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={distribution.status === 'contacted' ? 'default' : 'secondary'}>
                    {distribution.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(distribution.distributedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
