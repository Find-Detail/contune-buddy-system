
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Calendar, User, AlertCircle } from "lucide-react";

export const TasksSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Follow up with TechCorp regarding proposal",
      description: "Send detailed proposal and schedule presentation meeting",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-15",
      assignedTo: "John Doe",
      relatedTo: "TechCorp Inc (Lead)"
    },
    {
      id: 2,
      title: "Prepare contract for Global Solutions",
      description: "Draft and review contract terms for new project",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-01-18",
      assignedTo: "Sarah Smith",
      relatedTo: "Global Solutions Ltd (Client)"
    },
    {
      id: 3,
      title: "Client onboarding call with Innovation Hub",
      description: "Welcome call and project kickoff meeting",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-12",
      assignedTo: "Mike Johnson",
      relatedTo: "Innovation Hub (Client)"
    },
    {
      id: 4,
      title: "Research competitor pricing",
      description: "Analyze market pricing for new product line",
      priority: "low",
      status: "completed",
      dueDate: "2024-01-10",
      assignedTo: "Lisa Williams",
      relatedTo: "Internal Research"
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-blue-100 text-blue-800",
      in_progress: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'completed';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Task Management</h2>
          <p className="text-muted-foreground">Track and manage your team's tasks</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox 
                    checked={task.status === 'completed'}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                      </Badge>
                      {isOverdue(task.dueDate, task.status) && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Overdue</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(task.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Assigned to: {task.assignedTo}</span>
                      </div>
                      <span>Related to: {task.relatedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
