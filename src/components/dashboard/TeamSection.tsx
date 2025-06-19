
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
  TrendingUp, 
  Target, 
  CheckCircle, 
  Calendar,
  Award,
  Activity,
  DollarSign,
  Clock,
  UserPlus,
  Mail,
  Phone,
  BarChart3,
  PieChart,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart } from "recharts";

export const TeamSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedTeam, setSelectedTeam] = useState("all");

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@contune.com",
      role: "Senior Sales Rep",
      avatar: "/placeholder.svg",
      team: "Sales Team A",
      status: "active",
      joinDate: "2023-01-15",
      performance: {
        leadsGenerated: 45,
        leadsConverted: 12,
        conversionRate: 26.7,
        tasksCompleted: 34,
        tasksOverdue: 2,
        revenue: 125000,
        meetings: 28,
        calls: 89,
        emails: 156,
        avgResponseTime: "2.3h"
      },
      monthlyStats: [
        { month: "Jan", leads: 15, conversions: 4, revenue: 42000 },
        { month: "Feb", leads: 18, conversions: 5, revenue: 38000 },
        { month: "Mar", leads: 12, conversions: 3, revenue: 45000 }
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@contune.com",
      role: "Sales Manager",
      avatar: "/placeholder.svg",
      team: "Sales Team A",
      status: "active",
      joinDate: "2022-08-20",
      performance: {
        leadsGenerated: 38,
        leadsConverted: 15,
        conversionRate: 39.5,
        tasksCompleted: 41,
        tasksOverdue: 1,
        revenue: 185000,
        meetings: 35,
        calls: 67,
        emails: 203,
        avgResponseTime: "1.8h"
      },
      monthlyStats: [
        { month: "Jan", leads: 14, conversions: 6, revenue: 65000 },
        { month: "Feb", leads: 13, conversions: 5, revenue: 58000 },
        { month: "Mar", leads: 11, conversions: 4, revenue: 62000 }
      ]
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@contune.com",
      role: "Junior Sales Rep",
      avatar: "/placeholder.svg",
      team: "Sales Team B",
      status: "active",
      joinDate: "2023-06-10",
      performance: {
        leadsGenerated: 32,
        leadsConverted: 8,
        conversionRate: 25.0,
        tasksCompleted: 28,
        tasksOverdue: 4,
        revenue: 89000,
        meetings: 22,
        calls: 78,
        emails: 134,
        avgResponseTime: "3.1h"
      },
      monthlyStats: [
        { month: "Jan", leads: 12, conversions: 3, revenue: 28000 },
        { month: "Feb", leads: 10, conversions: 2, revenue: 31000 },
        { month: "Mar", leads: 10, conversions: 3, revenue: 30000 }
      ]
    },
    {
      id: 4,
      name: "Lisa Williams",
      email: "lisa@contune.com",
      role: "Account Manager",
      avatar: "/placeholder.svg",
      team: "Account Management",
      status: "active",
      joinDate: "2022-11-05",
      performance: {
        leadsGenerated: 28,
        leadsConverted: 18,
        conversionRate: 64.3,
        tasksCompleted: 39,
        tasksOverdue: 0,
        revenue: 245000,
        meetings: 42,
        calls: 56,
        emails: 189,
        avgResponseTime: "1.2h"
      },
      monthlyStats: [
        { month: "Jan", leads: 10, conversions: 7, revenue: 85000 },
        { month: "Feb", leads: 9, conversions: 6, revenue: 78000 },
        { month: "Mar", leads: 9, conversions: 5, revenue: 82000 }
      ]
    }
  ];

  const teams = [
    { id: "sales-a", name: "Sales Team A", members: 8, lead: "Sarah Johnson" },
    { id: "sales-b", name: "Sales Team B", members: 6, lead: "Mike Wilson" },
    { id: "account-mgmt", name: "Account Management", members: 4, lead: "Lisa Williams" },
    { id: "support", name: "Support Team", members: 5, lead: "David Brown" }
  ];

  // Team performance data
  const teamPerformanceData = [
    { team: "Sales A", leads: 83, conversions: 27, revenue: 310000, efficiency: 92 },
    { team: "Sales B", leads: 67, conversions: 18, revenue: 235000, efficiency: 85 },
    { team: "Account Mgmt", leads: 45, conversions: 31, revenue: 420000, efficiency: 98 },
    { team: "Support", leads: 23, conversions: 12, revenue: 145000, efficiency: 78 }
  ];

  const activityData = [
    { name: "Mon", calls: 24, emails: 45, meetings: 12 },
    { name: "Tue", calls: 28, emails: 52, meetings: 15 },
    { name: "Wed", calls: 22, emails: 38, meetings: 18 },
    { name: "Thu", calls: 31, emails: 48, meetings: 14 },
    { name: "Fri", calls: 26, emails: 41, meetings: 16 },
    { name: "Sat", calls: 12, emails: 23, meetings: 6 },
    { name: "Sun", calls: 8, emails: 18, memories: 3 }
  ];

  const conversionData = [
    { name: "Lead Generation", value: 143, color: "#3b82f6" },
    { name: "Qualified Leads", value: 89, color: "#10b981" },
    { name: "Proposals Sent", value: 54, color: "#f59e0b" },
    { name: "Closed Deals", value: 35, color: "#ef4444" }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === "all" || member.team.toLowerCase().includes(selectedTeam.toLowerCase());
    return matchesSearch && matchesTeam;
  });

  const calculateTeamStats = () => {
    const totalMembers = filteredMembers.length;
    const totalLeads = filteredMembers.reduce((sum, member) => sum + member.performance.leadsGenerated, 0);
    const totalConversions = filteredMembers.reduce((sum, member) => sum + member.performance.leadsConverted, 0);
    const totalRevenue = filteredMembers.reduce((sum, member) => sum + member.performance.revenue, 0);
    const avgConversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;

    return { totalMembers, totalLeads, totalConversions, totalRevenue, avgConversionRate };
  };

  const teamStats = calculateTeamStats();

  const getPerformanceColor = (rate: number) => {
    if (rate >= 35) return "text-green-600";
    if (rate >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const chartConfig = {
    calls: { label: "Calls", color: "#3b82f6" },
    emails: { label: "Emails", color: "#10b981" },
    meetings: { label: "Meetings", color: "#f59e0b" }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Performance</h2>
          <p className="text-muted-foreground">Comprehensive team analytics and reporting</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
          <Button className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
                <p className="text-xs text-muted-foreground">Active Members</p>
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
                <div className="text-2xl font-bold">{teamStats.totalLeads}</div>
                <p className="text-xs text-muted-foreground">Total Leads Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.avgConversionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Avg Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${(teamStats.totalRevenue / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
                <CardDescription>Revenue and conversion rates by team</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity Breakdown</CardTitle>
                <CardDescription>Calls, emails, and meetings this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="emails" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="meetings" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Team Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformanceData
                  .sort((a, b) => b.efficiency - a.efficiency)
                  .map((team, index) => (
                    <div key={team.team} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{team.team}</h4>
                          <p className="text-sm text-muted-foreground">
                            {team.conversions} conversions from {team.leads} leads
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{team.efficiency}% efficiency</div>
                        <div className="text-sm text-muted-foreground">
                          ${(team.revenue / 1000).toFixed(0)}K revenue
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="sales">Sales Teams</SelectItem>
                <SelectItem value="account">Account Management</SelectItem>
                <SelectItem value="support">Support Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <Badge variant="secondary" className="mt-1">{member.team}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className={`font-medium ${getPerformanceColor(member.performance.conversionRate)}`}>
                        {member.performance.conversionRate}%
                      </span>
                    </div>
                    <Progress value={member.performance.conversionRate} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <div className="text-sm font-medium">{member.performance.leadsGenerated}</div>
                        <div className="text-xs text-muted-foreground">Leads Generated</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">${(member.performance.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Individual Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                        <Badge variant={member.performance.conversionRate >= 30 ? "default" : "secondary"}>
                          {member.performance.conversionRate}% conversion
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">{member.performance.leadsGenerated}</div>
                          <div className="text-muted-foreground">Leads</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">{member.performance.tasksCompleted}</div>
                          <div className="text-muted-foreground">Tasks</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-purple-600">${(member.performance.revenue / 1000).toFixed(0)}K</div>
                          <div className="text-muted-foreground">Revenue</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Conversion Funnel</CardTitle>
                <CardDescription>Pipeline progression across all teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <RechartsPieChart data={conversionData}>
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {conversionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Time Period Selection */}
          <div className="flex gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Team Performance Trends</CardTitle>
                <CardDescription>Monthly performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={teamMembers[0].monthlyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="leads" 
                        stackId="2" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredMembers
                    .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
                    .slice(0, 3)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {member.performance.conversionRate}% conversion
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Avg Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <span className="text-sm">{member.name}</span>
                        <Badge variant="outline">{member.performance.avgResponseTime}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
