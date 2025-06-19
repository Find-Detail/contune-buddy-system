
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  UserPlus, 
  UserMinus, 
  Crown 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManageTeamMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: any;
}

export const ManageTeamMembersDialog = ({ open, onOpenChange, team }: ManageTeamMembersDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Mock available users (not in team)
  const availableUsers = [
    { id: "5", name: "Emma Watson", role: "Sales Rep", avatar: "/placeholder.svg" },
    { id: "6", name: "James Wilson", role: "Sales Rep", avatar: "/placeholder.svg" },
    { id: "7", name: "Oliver Smith", role: "Junior Sales Rep", avatar: "/placeholder.svg" },
    { id: "8", name: "Sophia Brown", role: "Sales Rep", avatar: "/placeholder.svg" }
  ];

  const handleAddMember = () => {
    if (selectedUser) {
      console.log("Adding member to team:", selectedUser);
      setSelectedUser("");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    console.log("Removing member from team:", memberId);
  };

  const filteredMembers = team?.members?.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Team Members</DialogTitle>
          <DialogDescription>
            Add or remove members from {team?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add New Member */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Add New Member</h4>
            <div className="flex gap-2">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select user to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name} - {user.role}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddMember} disabled={!selectedUser}>
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Current Members */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Current Members ({team?.memberCount || 0})</h4>
              <div className="relative w-48">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {member.name}
                        {member.role === "Team Lead" && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.role === "Team Lead" ? "default" : "secondary"}>
                      {member.role === "Team Lead" ? "Leader" : "Member"}
                    </Badge>
                    {member.role !== "Team Lead" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
