
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTeamDialog = ({ open, onOpenChange }: AddTeamDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leaderId: "",
    department: "",
    targets: ""
  });

  // Mock users for team leader selection
  const availableLeaders = [
    { id: "1", name: "Sarah Johnson", role: "Manager" },
    { id: "2", name: "David Brown", role: "Senior Sales Rep" },
    { id: "3", name: "Rachel Green", role: "Team Lead" },
    { id: "4", name: "Mike Wilson", role: "Senior Sales Rep" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating team:", formData);
    onOpenChange(false);
    setFormData({
      name: "",
      description: "",
      leaderId: "",
      department: "",
      targets: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Set up a new team with a leader and goals. You can add members after creation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Sales Team Alpha"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the team's focus and goals"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="leaderId">Team Leader</Label>
                <Select value={formData.leaderId} onValueChange={(value) => handleInputChange("leaderId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLeaders.map((leader) => (
                      <SelectItem key={leader.id} value={leader.id}>
                        {leader.name} - {leader.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targets">Revenue Target ($)</Label>
              <Input
                id="targets"
                type="number"
                value={formData.targets}
                onChange={(e) => handleInputChange("targets", e.target.value)}
                placeholder="500000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Team</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
