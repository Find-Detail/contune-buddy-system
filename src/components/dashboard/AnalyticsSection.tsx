
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, CheckSquare, DollarSign, ArrowUp, ArrowDown } from "lucide-react";

export const AnalyticsSection = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: Target,
      color: "bg-blue-500",
      description: "vs last month"
    },
    {
      title: "Active Clients",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: Users,
      color: "bg-green-500",
      description: "vs last month"
    },
    {
      title: "Open Tasks",
      value: "23",
      change: "-8%",
      changeType: "decrease",
      icon: CheckSquare,
      color: "bg-orange-500",
      description: "vs last month"
    },
    {
      title: "Revenue Pipeline",
      value: "$45,200",
      change: "+18%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-purple-500",
      description: "vs last month"
    }
  ];

  const leadConversion = [
    { status: "New", count: 45, color: "bg-blue-500", percentage: 100 },
    { status: "Contacted", count: 32, color: "bg-yellow-500", percentage: 71 },
    { status: "Qualified", count: 28, color: "bg-orange-500", percentage: 62 },
    { status: "Converted", count: 15, color: "bg-green-500", percentage: 33 }
  ];

  const activities = [
    {
      type: "lead",
      title: "New lead from website contact form",
      time: "2 minutes ago",
      color: "bg-green-500"
    },
    {
      type: "task",
      title: "Task completed: Follow up with TechCorp",
      time: "1 hour ago",
      color: "bg-blue-500"
    },
    {
      type: "meeting",
      title: "Client meeting scheduled with InnovateLLC",
      time: "3 hours ago",
      color: "bg-orange-500"
    },
    {
      type: "proposal",
      title: "Proposal sent to Future Systems",
      time: "1 day ago",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
                <span className="text-xs text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Lead Conversion Funnel
            </CardTitle>
            <CardDescription>Track your leads through the sales process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {leadConversion.map((stage, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{stage.status}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{stage.count}</Badge>
                    <span className="text-xs text-gray-500">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stage.color} transition-all duration-500`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${activity.color} mt-2 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
