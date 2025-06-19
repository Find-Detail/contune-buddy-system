
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  Calendar, 
  User, 
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddTaskDialog } from "@/components/dialogs/AddTaskDialog";
import { toast } from "@/hooks/use-toast";

export const TasksSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with TechCorp regarding proposal",
      description: "Send detailed proposal and schedule presentation meeting",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-15",
      assignedTo: "John Doe",
      relatedTo: "TechCorp Inc (Lead)",
      estimatedHours: 4,
      tags: ["follow-up", "proposal"],
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      title: "Prepare contract for Global Solutions",
      description: "Draft and review contract terms for new project",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-01-18",
      assignedTo: "Sarah Smith",
      relatedTo: "Global Solutions Ltd (Client)",
      estimatedHours: 6,
      tags: ["contract", "legal"],
      createdAt: "2024-01-11"
    },
    {
      id: 3,
      title: "Client onboarding call with Innovation Hub",
      description: "Welcome call and project kickoff meeting",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-12",
      assignedTo: "Mike Johnson",
      relatedTo: "Innovation Hub (Client)",
      estimatedHours: 2,
      tags: ["onboarding", "meeting"],
      createdAt: "2024-01-09"
    },
    {
      id: 4,
      title: "Research competitor pricing",
      description: "Analyze market pricing for new product line",
      priority: "low",
      status: "completed",
      dueDate: "2024-01-10",
      assignedTo: "Lisa Williams",
      relatedTo: "Internal Research",
      estimatedHours: 8,
      tags: ["research", "analysis"],
      createdAt: "2024-01-08"
    },
    {
      id: 5,
      title: "Update CRM database with new leads",
      description: "Import and categorize leads from trade show",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-01-16",
      assignedTo: "John Doe",
      relatedTo: "Lead Management",
      estimatedHours: 3,
      tags: ["data-entry", "leads"],
      createdAt: "2024-01-12"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800 border-gray-200",
      medium: "bg-blue-100 text-blue-800 border-blue-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      urgent: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      in_progress: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      on_hold: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
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

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "Task Updated",
      description: "Task status has been updated successfully.",
    });
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        status: task.status === 'completed' ? 'pending' : 'completed' 
      } : task
    ));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task has been removed from your list.",
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: filteredTasks.length,
    completed: filteredTasks.filter(t => t.status === 'completed').length,
    overdue: filteredTasks.filter(t => isOverdue(t.dueDate, t.status)).length,
    inProgress: filteredTasks.filter(t => t.status === 'in_progress').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
          <p className="text-muted-foreground">Track and manage your team's tasks</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`hover:shadow-lg transition-all duration-200 border-l-4 ${
            task.status === 'completed' ? 'border-l-green-500 bg-green-50/30' : 
            isOverdue(task.dueDate, task.status) ? 'border-l-red-500' : 'border-l-blue-500'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox 
                    checked={task.status === 'completed'}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${
                        task.status === 'completed' ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {task.title}
                      </h3>
                      <Badge className={getPriorityColor(task.priority)} variant="outline">
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(task.status)} variant="outline">
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                      </Badge>
                      {isOverdue(task.dueDate, task.status) && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Overdue</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(task.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.estimatedHours}h estimated</span>
                      </div>
                      <span>Related: {task.relatedTo}</span>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleStatusChange(task.id, "in_progress")}>
                      <Clock className="mr-2 h-4 w-4" />
                      Mark In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(task.id, "completed")}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(task.id, "on_hold")}>
                      Put On Hold
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all" 
                ? "No tasks match your current filters." 
                : "No tasks found. Create your first task to get started."}
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Task
            </Button>
          </CardContent>
        </Card>
      )}

      <AddTaskDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onTaskAdded={() => {
          toast({
            title: "Success",
            description: "Task list refreshed",
          });
        }}
      />
    </div>
  );
};
