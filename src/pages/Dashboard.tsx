
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadsSection } from "@/components/dashboard/LeadsSection";
import { ClientsSection } from "@/components/dashboard/ClientsSection";
import { TasksSection } from "@/components/dashboard/TasksSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { Users, Target, CheckSquare, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Contune Dashboard</h1>
          <p className="text-muted-foreground">Manage your leads, clients, and tasks efficiently</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsSection />
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <LeadsSection />
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <ClientsSection />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <TasksSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
