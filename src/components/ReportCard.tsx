import { useState } from "react";
import { ChevronUp, ChevronDown, MapPin, Calendar, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Report {
  id: string;
  title: string;
  description: string;
  status: "pending" | "acknowledged" | "resolved" | "rejected";
  location: string;
  date: string;
  upvotes: number;
  downvotes: number;
  category: string;
  imageUrl?: string;
  userVote?: "up" | "down" | null;
}

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

const statusConfig = {
  pending: { color: "bg-status-pending text-status-pending", label: "Pending" },
  acknowledged: { color: "bg-status-acknowledged text-status-acknowledged", label: "Acknowledged" },
  resolved: { color: "bg-status-resolved text-status-resolved", label: "Resolved" },
  rejected: { color: "bg-status-rejected text-status-rejected", label: "Rejected" }
};

const ReportCard = ({ report, onClick }: ReportCardProps) => {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(report.userVote || null);
  const [votes, setVotes] = useState({ upvotes: report.upvotes, downvotes: report.downvotes });

  const handleVote = (type: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newVote = userVote === type ? null : type;
    const oldVote = userVote;
    
    setUserVote(newVote);
    
    // Update vote counts
    setVotes(prev => {
      let newUpvotes = prev.upvotes;
      let newDownvotes = prev.downvotes;
      
      // Remove old vote
      if (oldVote === "up") newUpvotes--;
      if (oldVote === "down") newDownvotes--;
      
      // Add new vote
      if (newVote === "up") newUpvotes++;
      if (newVote === "down") newDownvotes++;
      
      return { upvotes: newUpvotes, downvotes: newDownvotes };
    });
  };

  const statusStyle = statusConfig[report.status];

  return (
    <Card 
      className="p-4 bg-card hover:bg-card/80 transition-all duration-200 cursor-pointer border-border/50 hover:border-border active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-card-foreground line-clamp-2">{report.title}</h3>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{report.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{report.date}</span>
              </div>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs font-medium border-0",
              `bg-${statusStyle.color.split(' ')[0]}/10 text-${statusStyle.color.split(' ')[1]}`
            )}
          >
            {statusStyle.label}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>

        {/* Category & Actions */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {report.category}
          </Badge>
          
          <div className="flex items-center space-x-1">
            {/* Voting */}
            <button
              onClick={(e) => handleVote("up", e)}
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-md text-xs transition-all duration-200",
                "hover:bg-upvote/10 active:scale-95",
                userVote === "up" 
                  ? "bg-upvote/20 text-upvote" 
                  : "text-muted-foreground hover:text-upvote"
              )}
            >
              <ChevronUp size={14} />
              <span>{votes.upvotes}</span>
            </button>
            
            <button
              onClick={(e) => handleVote("down", e)}
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-md text-xs transition-all duration-200",
                "hover:bg-downvote/10 active:scale-95",
                userVote === "down" 
                  ? "bg-downvote/20 text-downvote" 
                  : "text-muted-foreground hover:text-downvote"
              )}
            >
              <ChevronDown size={14} />
              <span>{votes.downvotes}</span>
            </button>

            <div className="flex items-center space-x-1 px-2 py-1 text-xs text-muted-foreground">
              <Eye size={12} />
              <span>View</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportCard;