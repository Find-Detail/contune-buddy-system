
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Facebook, Plus, Settings, Users, Share2, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const FacebookLeadsSection = () => {
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [showRuleDialog, setShowRuleDialog] = useState(false);

  // Mock data for Facebook integrations
  const [integrations] = useState([
    {
      id: "1",
      pageId: "123456789",
      pageName: "Tech Solutions Inc",
      isActive: true,
      leadsReceived: 45,
      lastSync: "2024-01-15T10:30:00Z"
    }
  ]);

  // Mock data for distribution rules
  const [distributionRules] = useState([
    {
      id: "1",
      name: "Facebook Leads - Round Robin",
      source: "facebook",
      distributionType: "round_robin",
      isActive: true,
      assignedUsers: 4,
      leadsDistributed: 32
    },
    {
      id: "2",
      name: "High Value Leads - Weighted",
      source: "facebook",
      distributionType: "weighted",
      isActive: true,
      assignedUsers: 2,
      leadsDistributed: 15
    }
  ]);

  const handleIntegrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Integration Added",
      description: "Facebook page has been successfully integrated.",
    });
    setShowIntegrationDialog(false);
  };

  const handleRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Distribution Rule Created",
      description: "Lead distribution rule has been created successfully.",
    });
    setShowRuleDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Facebook Lead Integration</h2>
          <p className="text-muted-foreground">Manage Facebook lead ads and distribution rules</p>
        </div>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Distribution Rules
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Facebook Page Integrations</h3>
            <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Facebook Page Integration</DialogTitle>
                  <DialogDescription>
                    Connect your Facebook page to automatically receive leads from Facebook Lead Ads.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleIntegrationSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pageId">Facebook Page ID</Label>
                      <Input id="pageId" placeholder="Enter your Facebook Page ID" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pageName">Page Name</Label>
                      <Input id="pageName" placeholder="Enter page name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="accessToken">Access Token</Label>
                      <Input id="accessToken" type="password" placeholder="Enter Facebook access token" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="webhookToken">Webhook Verify Token</Label>
                      <Input id="webhookToken" placeholder="Enter webhook verify token" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowIntegrationDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Integration</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Facebook className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{integration.pageName}</CardTitle>
                        <CardDescription>Page ID: {integration.pageId}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.isActive ? "default" : "secondary"}>
                        {integration.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Leads Received</p>
                      <p className="text-2xl font-bold text-green-600">{integration.leadsReceived}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Sync</p>
                      <p className="font-medium">{new Date(integration.lastSync).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Lead Distribution Rules</h3>
            <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Distribution Rule</DialogTitle>
                  <DialogDescription>
                    Set up rules for automatically distributing leads to your team members.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRuleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ruleName">Rule Name</Label>
                      <Input id="ruleName" placeholder="Enter rule name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="source">Lead Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lead source" />
                        </SelectTrigger>
                        <SelectContent>
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
                          <SelectItem value="manual">Manual Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input id="priority" type="number" placeholder="1" min="1" max="10" />
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

          <div className="grid gap-4">
            {distributionRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <CardDescription>
                        Source: {rule.source} | Type: {rule.distributionType.replace('_', ' ')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{rule.assignedUsers} assigned users</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Leads distributed: </span>
                      <span className="font-semibold text-green-600">{rule.leadsDistributed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">Total FB Leads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">Distribution Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">2.3min</div>
                <p className="text-xs text-muted-foreground">Avg Response Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">$45,200</div>
                <p className="text-xs text-muted-foreground">FB Lead Value</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lead Distribution Performance</CardTitle>
              <CardDescription>
                Track how effectively your distribution rules are working
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Facebook Leads - Round Robin</p>
                    <p className="text-sm text-muted-foreground">32 leads distributed this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">98%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">High Value Leads - Weighted</p>
                    <p className="text-sm text-muted-foreground">15 leads distributed this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">100%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
