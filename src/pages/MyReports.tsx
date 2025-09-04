import { useState } from "react";
import { Filter, Calendar, TrendingUp } from "lucide-react";
import ReportCard, { Report } from "@/components/ReportCard";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

// Mock user reports
const mockUserReports: Report[] = [
  {
    id: "user-1",
    title: "Broken Traffic Signal",
    description: "Traffic signal at intersection not working properly, causing confusion during peak hours.",
    status: "acknowledged",
    location: "Main & Oak Street",
    date: "1 day ago",
    upvotes: 18,
    downvotes: 1,
    category: "Traffic",
    userVote: null
  },
  {
    id: "user-2",
    title: "Overflowing Garbage Bin",
    description: "Public garbage bin overflowing for days, attracting pests and creating unsanitary conditions.",
    status: "resolved",
    location: "Central Park",
    date: "5 days ago",
    upvotes: 12,
    downvotes: 0,
    category: "Waste Management",
    userVote: null
  },
  {
    id: "user-3",
    title: "Damaged Sidewalk",
    description: "Sidewalk has multiple cracks and uneven surfaces, posing safety risks for pedestrians.",
    status: "pending",
    location: "Elm Street",
    date: "2 weeks ago",
    upvotes: 7,
    downvotes: 2,
    category: "Road Issues",
    userVote: null
  }
];

const statusFilters = ["All", "Pending", "Acknowledged", "Resolved", "Rejected"];

const MyReports = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredReports, setFilteredReports] = useState(mockUserReports);

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    
    if (status === "All") {
      setFilteredReports(mockUserReports);
    } else {
      const filtered = mockUserReports.filter(
        report => report.status === status.toLowerCase()
      );
      setFilteredReports(filtered);
    }
  };

  const getStatusCounts = () => {
    return {
      total: mockUserReports.length,
      pending: mockUserReports.filter(r => r.status === "pending").length,
      acknowledged: mockUserReports.filter(r => r.status === "acknowledged").length,
      resolved: mockUserReports.filter(r => r.status === "resolved").length,
      rejected: mockUserReports.filter(r => r.status === "rejected").length
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Reports</h1>
              <p className="text-sm text-muted-foreground">
                Track your submitted civic issues
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card p-3 rounded-lg border border-border/50">
              <div className="text-lg font-semibold text-foreground">{counts.total}</div>
              <div className="text-xs text-muted-foreground">Total Reports</div>
            </div>
            <div className="bg-card p-3 rounded-lg border border-border/50">
              <div className="text-lg font-semibold text-status-resolved">{counts.resolved}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
            <div className="bg-card p-3 rounded-lg border border-border/50">
              <div className="text-lg font-semibold text-status-pending">{counts.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {statusFilters.map((status) => (
              <Badge
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                  selectedStatus === status 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"
                }`}
                onClick={() => handleStatusFilter(status)}
              >
                {status}
                {status !== "All" && (
                  <span className="ml-1">
                    ({status === "Pending" ? counts.pending : 
                      status === "Acknowledged" ? counts.acknowledged :
                      status === "Resolved" ? counts.resolved :
                      counts.rejected})
                  </span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Filter className="mx-auto mb-4" size={48} />
              <p className="text-lg font-medium">No reports found</p>
              <p className="text-sm">
                {selectedStatus === "All" 
                  ? "You haven't submitted any reports yet" 
                  : `No ${selectedStatus.toLowerCase()} reports`
                }
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">
                {selectedStatus === "All" ? "All Reports" : `${selectedStatus} Reports`}
              </h2>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <TrendingUp size={14} />
                <span>{filteredReports.length} reports</span>
              </div>
            </div>
            
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => navigate(`/report/${report.id}`)}
              />
            ))}
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyReports;