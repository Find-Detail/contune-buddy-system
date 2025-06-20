
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Users, Target, CheckSquare, TrendingUp, UserCheck, Users2, Facebook, Share2, Package } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Contune Dashboard</h1>
          <p className="text-muted-foreground">Manage your leads, clients, tasks, teams, and inventory efficiently</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
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
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users2 className="h-4 w-4" />
              Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsSection />
            <TeamSection />
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

          <TabsContent value="inventory" className="space-y-6">
            <InventorySection />
          </TabsContent>

          <TabsContent value="facebook" className="space-y-6">
            <FacebookLeadsSection />
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <LeadDistributionSection />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UsersSection />
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <TeamsManagementSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
