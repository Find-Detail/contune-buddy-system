
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LeadsSection } from "@/components/dashboard/LeadsSection";
import { ClientsSection } from "@/components/dashboard/ClientsSection";
import { TasksSection } from "@/components/dashboard/TasksSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { TeamSection } from "@/components/dashboard/TeamSection";
import { UsersSection } from "@/components/dashboard/UsersSection";
import { TeamsManagementSection } from "@/components/dashboard/TeamsManagementSection";
import { FacebookLeadsSection } from "@/components/dashboard/FacebookLeadsSection";
import { LeadDistributionSection } from "@/components/dashboard/LeadDistributionSection";
import { InventorySection } from "@/components/dashboard/InventorySection";
import { 
  Users, 
  Target, 
  CheckSquare, 
  TrendingUp, 
  UserCheck, 
  Users2, 
  Facebook, 
  Share2, 
  Package,
  Bell,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabItems = [
    { id: "overview", label: "Overview", icon: TrendingUp, color: "bg-blue-500" },
    { id: "leads", label: "Leads", icon: Target, color: "bg-green-500", badge: "45" },
    { id: "clients", label: "Clients", icon: Users, color: "bg-purple-500" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, color: "bg-orange-500", badge: "12" },
    { id: "inventory", label: "Inventory", icon: Package, color: "bg-indigo-500" },
    { id: "facebook", label: "Facebook", icon: Facebook, color: "bg-blue-600" },
    { id: "distribution", label: "Distribution", icon: Share2, color: "bg-emerald-500" },
    { id: "users", label: "Users", icon: UserCheck, color: "bg-pink-500" },
    { id: "teams", label: "Teams", icon: Users2, color: "bg-cyan-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Contune Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Complete business management at your fingertips
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <Settings className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Modern Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border p-2">
            <TabsList className="grid w-full grid-cols-9 gap-2 bg-transparent">
              {tabItems.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="relative flex flex-col items-center gap-2 p-4 rounded-lg border-0 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 data-[state=active]:shadow-md transition-all duration-300"
                >
                  <div className={`w-8 h-8 ${tab.color} rounded-lg flex items-center justify-center transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    <tab.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{tab.label}</span>
                  {tab.badge && (
                    <Badge variant="secondary" className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {tab.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border min-h-[600px]">
            <TabsContent value="overview" className="p-8 space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Business Overview</h2>
                <p className="text-gray-600">Get a comprehensive view of your business performance</p>
              </div>
              <AnalyticsSection />
              <TeamSection />
            </TabsContent>

            <TabsContent value="leads" className="p-8">
              <LeadsSection />
            </TabsContent>

            <TabsContent value="clients" className="p-8">
              <ClientsSection />
            </TabsContent>

            <TabsContent value="tasks" className="p-8">
              <TasksSection />
            </TabsContent>

            <TabsContent value="inventory" className="p-8">
              <InventorySection />
            </TabsContent>

            <TabsContent value="facebook" className="p-8">
              <FacebookLeadsSection />
            </TabsContent>

            <TabsContent value="distribution" className="p-8">
              <LeadDistributionSection />
            </TabsContent>

            <TabsContent value="users" className="p-8">
              <UsersSection />
            </TabsContent>

            <TabsContent value="teams" className="p-8">
              <TeamsManagementSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
