import { useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown, MapPin, Calendar, Share2, Flag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockReportDetail = {
  id: "1",
  title: "Pothole on Main Street causing traffic issues",
  description: "There's a large pothole on Main Street near the traffic signal that's been causing significant traffic disruption and potential vehicle damage. The hole is approximately 3 feet wide and 6 inches deep. Multiple vehicles have been seen avoiding this area, creating bottlenecks during rush hours. The issue has been persistent for over a week now and seems to be getting worse with recent rainfall. Local residents and commuters are facing daily inconvenience, and there's a safety concern especially during night hours when visibility is low.",
  status: "acknowledged" as const,
  location: "Main Street, Downtown - Near City Mall",
  date: "2 days ago",
  upvotes: 23,
  downvotes: 2,
  category: "Road Issues",
  images: [
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  userVote: null as "up" | "down" | null,
  reportedBy: "Anonymous Citizen",
  priority: "High",
  estimatedResolution: "5-7 business days",
  updates: [
    {
      date: "2 days ago",
      status: "acknowledged",
      message: "Report has been acknowledged by the Municipal Corporation. Inspection scheduled.",
      authority: "City Municipal Corporation"
    },
    {
      date: "2 days ago", 
      status: "pending",
      message: "Report submitted successfully.",
      authority: "System"
    }
  ]
};

const statusConfig = {
  pending: { color: "bg-status-pending/10 text-status-pending border-status-pending/20", label: "Pending" },
  acknowledged: { color: "bg-status-acknowledged/10 text-status-acknowledged border-status-acknowledged/20", label: "Acknowledged" },
  resolved: { color: "bg-status-resolved/10 text-status-resolved border-status-resolved/20", label: "Resolved" },
  rejected: { color: "bg-status-rejected/10 text-status-rejected border-status-rejected/20", label: "Rejected" }
};

const ReportDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userVote, setUserVote] = useState<"up" | "down" | null>(mockReportDetail.userVote);
  const [votes, setVotes] = useState({ upvotes: mockReportDetail.upvotes, downvotes: mockReportDetail.downvotes });
  const [selectedImage, setSelectedImage] = useState(0);

  const handleVote = (type: "up" | "down") => {
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

  const statusStyle = statusConfig[mockReportDetail.status];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Report Details</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Share2 size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Flag size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Main Info Card */}
        <Card className="p-6 bg-card border-border/50 space-y-4">
          {/* Title & Status */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-card-foreground pr-4">
                {mockReportDetail.title}
              </h2>
              <Badge className={cn("text-xs font-medium border", statusStyle.color)}>
                {statusStyle.label}
              </Badge>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{mockReportDetail.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{mockReportDetail.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>Report #{mockReportDetail.id}</span>
              </div>
            </div>
          </div>

          {/* Category & Priority */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {mockReportDetail.category}
            </Badge>
            <Badge variant="outline" className="text-xs text-warning border-warning/20 bg-warning/10">
              {mockReportDetail.priority} Priority
            </Badge>
          </div>
        </Card>

        {/* Images */}
        {mockReportDetail.images && mockReportDetail.images.length > 0 && (
          <Card className="p-4 bg-card border-border/50 space-y-4">
            <h3 className="font-medium text-card-foreground">Photos</h3>
            <div className="space-y-3">
              {/* Main Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Image {selectedImage + 1} of {mockReportDetail.images.length}
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              {mockReportDetail.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {mockReportDetail.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center text-xs transition-all duration-200",
                        selectedImage === index 
                          ? "ring-2 ring-primary bg-primary/10" 
                          : "hover:bg-muted/80"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Description */}
        <Card className="p-6 bg-card border-border/50 space-y-4">
          <h3 className="font-medium text-card-foreground">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {mockReportDetail.description}
          </p>
        </Card>

        {/* Voting & Engagement */}
        <Card className="p-6 bg-card border-border/50 space-y-4">
          <h3 className="font-medium text-card-foreground">Community Feedback</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleVote("up")}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-upvote/10 active:scale-95",
                  userVote === "up" 
                    ? "bg-upvote/20 text-upvote border border-upvote/30" 
                    : "text-muted-foreground hover:text-upvote border border-border"
                )}
              >
                <ChevronUp size={18} />
                <span>Upvote ({votes.upvotes})</span>
              </button>
              
              <button
                onClick={() => handleVote("down")}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-downvote/10 active:scale-95",
                  userVote === "down" 
                    ? "bg-downvote/20 text-downvote border border-downvote/30" 
                    : "text-muted-foreground hover:text-downvote border border-border"
                )}
              >
                <ChevronDown size={18} />
                <span>Downvote ({votes.downvotes})</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Report Details */}
        <Card className="p-6 bg-card border-border/50 space-y-4">
          <h3 className="font-medium text-card-foreground">Report Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reported by</span>
              <span className="text-sm font-medium text-card-foreground">{mockReportDetail.reportedBy}</span>
            </div>
            
            <Separator className="bg-border/50" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Priority Level</span>
              <Badge variant="outline" className="text-xs text-warning border-warning/20 bg-warning/10">
                {mockReportDetail.priority}
              </Badge>
            </div>
            
            <Separator className="bg-border/50" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estimated Resolution</span>
              <span className="text-sm font-medium text-card-foreground">{mockReportDetail.estimatedResolution}</span>
            </div>
          </div>
        </Card>

        {/* Status Updates */}
        <Card className="p-6 bg-card border-border/50 space-y-4">
          <h3 className="font-medium text-card-foreground">Status Updates</h3>
          
          <div className="space-y-4">
            {mockReportDetail.updates.map((update, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2",
                    index === 0 ? "bg-primary border-primary" : "bg-muted border-border"
                  )} />
                  {index < mockReportDetail.updates.length - 1 && (
                    <div className="w-px h-12 bg-border mt-2" />
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
                      {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{update.message}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6 bg-primary/10">
                      <span className="text-xs text-primary">
                        {update.authority.split(' ').map(w => w[0]).join('').substring(0, 2)}
                      </span>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{update.authority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ReportDetail;