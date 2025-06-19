
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, CheckSquare, DollarSign } from "lucide-react";

export const AnalyticsSection = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "156",
      change: "+12%",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Active Clients",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Open Tasks",
      value: "23",
      change: "-8%",
      icon: CheckSquare,
      color: "text-orange-600"
    },
    {
      title: "Revenue Pipeline",
      value: "$45,200",
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  const leadConversion = [
    { status: "New", count: 45, color: "bg-blue-500" },
    { status: "Contacted", count: 32, color: "bg-yellow-500" },
    { status: "Qualified", count: 28, color: "bg-orange-500" },
    { status: "Converted", count: 15, color: "bg-green-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Pipeline</CardTitle>
            <CardDescription>Track your leads through the sales funnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leadConversion.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stage.status}</span>
                  <Badge variant="secondary">{stage.count}</Badge>
                </div>
                <Progress value={(stage.count / 45) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">New lead from website contact form</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Task completed: Follow up with TechCorp</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Client meeting scheduled with InnovateLLC</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Proposal sent to Future Systems</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
