import { useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import ReportCard, { Report } from "@/components/ReportCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockReports: Report[] = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and potential vehicle damage. Located near the traffic signal.",
    status: "acknowledged",
    location: "Main Street, Downtown",
    date: "2 days ago",
    upvotes: 23,
    downvotes: 2,
    category: "Road Issues",
    userVote: null
  },
  {
    id: "2",
    title: "Broken Street Light",
    description: "Street light has been out for over a week, making the area unsafe during night hours.",
    status: "pending",
    location: "Park Avenue",
    date: "1 week ago",
    upvotes: 15,
    downvotes: 1,
    category: "Lighting",
    userVote: "up"
  },
  {
    id: "3",
    title: "Illegal Garbage Dumping",
    description: "Construction waste dumped illegally in the vacant lot. Creating health hazards for residents.",
    status: "resolved",
    location: "Elm Street",
    date: "3 days ago",
    upvotes: 31,
    downvotes: 0,
    category: "Waste Management",
    userVote: null
  },
  {
    id: "4",
    title: "Water Leakage",
    description: "Continuous water leakage from the main pipe causing road flooding and water wastage.",
    status: "pending",
    location: "Oak Avenue",
    date: "5 hours ago",
    upvotes: 8,
    downvotes: 0,
    category: "Water & Drainage",
    userVote: null
  }
];

const categories = ["All", "Road Issues", "Lighting", "Waste Management", "Water & Drainage"];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredReports, setFilteredReports] = useState(mockReports);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterReports(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterReports(searchQuery, category);
  };

  const filterReports = (query: string, category: string) => {
    let filtered = mockReports;
    
    if (category !== "All") {
      filtered = filtered.filter(report => report.category === category);
    }
    
    if (query) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.description.toLowerCase().includes(query.toLowerCase()) ||
        report.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredReports(filtered);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Civic Reports</h1>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>Your Local Area</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
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
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={() => navigate(`/report/${report.id}`)}
            />
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;