
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  Plus, 
  Edit,
  Trash2,
  Crown,
  Target,
  TrendingUp,
  Calendar,
  Settings,
  UserPlus,
  UserMinus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AddTeamDialog } from "@/components/dialogs/AddTeamDialog";
import { EditTeamDialog } from "@/components/dialogs/EditTeamDialog";
import { ManageTeamMembersDialog } from "@/components/dialogs/ManageTeamMembersDialog";

export const TeamsManagementSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const [manageMembersOpen, setManageMembersOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Mock teams data
  const teams = [
    {
      id: 1,
      name: "Sales Team Alpha",
      description: "Primary sales team focusing on enterprise clients",
      leaderId: 1,
      leaderName: "Sarah Johnson",
      leaderAvatar: "/placeholder.svg",
      memberCount: 8,
      createdDate: "2023-01-15",
      status: "active",
      performance: {
        leadsGenerated: 156,
        conversions: 42,
        conversionRate: 26.9,
        revenue: 485000,
        targets: 600000
      },
      members: [
        { id: 1, name: "Sarah Johnson", role: "Team Lead", avatar: "/placeholder.svg" },
        { id: 2, name: "John Doe", role: "Senior Sales Rep", avatar: "/placeholder.svg" },
        { id: 3, name: "Mike Wilson", role: "Sales Rep", avatar: "/placeholder.svg" },
        { id: 4, name: "Lisa Chen", role: "Sales Rep", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: 2,
      name: "Sales Team Beta",
      description: "Secondary sales team handling SMB clients",
      leaderId: 2,
      leaderName: "David Brown",
      leaderAvatar: "/placeholder.svg",
      memberCount: 6,
      createdDate: "2023-03-20",
      status: "active",
      performance: {
        leadsGenerated: 98,
        conversions: 28,
        conversionRate: 28.6,
        revenue: 245000,
        targets: 300000
      },
      members: [
        { id: 5, name: "David Brown", role: "Team Lead", avatar: "/placeholder.svg" },
        { id: 6, name: "Emma Davis", role: "Sales Rep", avatar: "/placeholder.svg" },
        { id: 7, name: "Alex Turner", role: "Sales Rep", avatar: "/placeholder.svg" }
      ]
    },
    {
      id: 3,
      name: "Support Team",
      description: "Customer support and success team",
      leaderId: 3,
      leaderName: "Rachel Green",
      leaderAvatar: "/placeholder.svg",
      memberCount: 5,
      createdDate: "2022-11-10",
      status: "active",
      performance: {
        leadsGenerated: 34,
        conversions: 12,
        conversionRate: 35.3,
        revenue: 85000,
        targets: 100000
      },
      members: [
        { id: 8, name: "Rachel Green", role: "Team Lead", avatar: "/placeholder.svg" },
        { id: 9, name: "Tom Wilson", role: "Support Rep", avatar: "/placeholder.svg" },
        { id: 10, name: "Nina Patel", role: "Support Rep", avatar: "/placeholder.svg" }
      ]
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leaderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setEditTeamOpen(true);
  };

  const handleManageMembers = (team) => {
    setSelectedTeam(team);
    setManageMembersOpen(true);
  };

  const handleDeleteTeam = (teamId) => {
    console.log("Delete team:", teamId);
  };

  const totalMembers = teams.reduce((sum, team) => sum + team.memberCount, 0);
  const totalRevenue = teams.reduce((sum, team) => sum + team.performance.revenue, 0);
  const avgConversionRate = teams.reduce((sum, team) => sum + team.performance.conversionRate, 0) / teams.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teams Management</h2>
          <p className="text-muted-foreground">Organize and manage your sales teams effectively</p>
        </div>
        <Button onClick={() => setAddTeamOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teams.length}</div>
                <p className="text-xs text-muted-foreground">Active Teams</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalMembers}</div>
                <p className="text-xs text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Avg Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="management">Team Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription className="mt-1">{team.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{team.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={team.leaderAvatar} alt={team.leaderName} />
                      <AvatarFallback>{team.leaderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{team.leaderName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Team Lead
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Progress</span>
                      <span>{((team.performance.revenue / team.performance.targets) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(team.performance.revenue / team.performance.targets) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{team.memberCount}</div>
                      <div className="text-muted-foreground">Members</div>
                    </div>
                    <div>
                      <div className="font-medium">{team.performance.conversionRate}%</div>
                      <div className="text-muted-foreground">Conversion</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleManageMembers(team)}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Members
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTeam(team)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
              <CardDescription>Compare performance metrics across all teams</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.leaderName}</div>
                      </TableCell>
                      <TableCell>{team.memberCount}</TableCell>
                      <TableCell>{team.performance.leadsGenerated}</TableCell>
                      <TableCell>{team.performance.conversions}</TableCell>
                      <TableCell>
                        <Badge variant={team.performance.conversionRate >= 30 ? "default" : "secondary"}>
                          {team.performance.conversionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>${(team.performance.revenue / 1000).toFixed(0)}K</TableCell>
                      <TableCell>${(team.performance.targets / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <Progress 
                          value={(team.performance.revenue / team.performance.targets) * 100} 
                          className="h-2 w-[100px]" 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team settings and member assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={team.leaderAvatar} alt={team.leaderName} />
                            <AvatarFallback className="text-xs">
                              {team.leaderName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{team.leaderName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{team.memberCount}</TableCell>
                      <TableCell>{team.createdDate}</TableCell>
                      <TableCell>
                        <Badge variant={team.status === "active" ? "default" : "secondary"}>
                          {team.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleManageMembers(team)}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTeam(team)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTeam(team.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddTeamDialog open={addTeamOpen} onOpenChange={setAddTeamOpen} />
      <EditTeamDialog 
        open={editTeamOpen} 
        onOpenChange={setEditTeamOpen}
        team={selectedTeam}
      />
      <ManageTeamMembersDialog
        open={manageMembersOpen}
        onOpenChange={setManageMembersOpen}
        team={selectedTeam}
      />
    </div>
  );
};
