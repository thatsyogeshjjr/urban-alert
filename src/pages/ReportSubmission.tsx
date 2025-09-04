import { useState } from "react";
import { Camera, MapPin, Upload, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Road Issues", "Lighting", "Waste Management", "Water & Drainage", 
  "Public Safety", "Traffic", "Parks & Recreation", "Other"
];

const ReportSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "Detecting location...",
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock location detection
  useState(() => {
    setTimeout(() => {
      setFormData(prev => ({ ...prev, location: "Current Location - Main Street, Downtown" }));
    }, 2000);
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 3 images per report.",
        variant: "destructive"
      });
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Report submitted successfully!",
      description: "Your report has been submitted and is now under review.",
    });
    
    navigate("/my-reports");
  };

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
            <h1 className="text-xl font-semibold text-foreground">Submit Report</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <Input
            placeholder="Brief description of the issue"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-input border-border"
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Category <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={formData.category === category ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  formData.category === category 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setFormData(prev => ({ ...prev, category }))}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Card className="p-3 bg-input border-border">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin size={16} className="text-primary" />
              <span className="text-foreground">{formData.location}</span>
            </div>
          </Card>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <Textarea
            placeholder="Provide detailed information about the issue..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[120px] bg-input border-border resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Photos (Optional)
          </label>
          
          {/* Upload Button */}
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="flex items-center space-x-2"
                asChild
              >
                <span>
                  <Camera size={16} />
                  <span>Take Photo</span>
                </span>
              </Button>
            </label>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="flex items-center space-x-2"
                asChild
              >
                <span>
                  <Upload size={16} />
                  <span>Upload</span>
                </span>
              </Button>
            </label>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      {file.name.substring(0, 10)}...
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            You can upload up to 3 photos. Images help authorities understand the issue better.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send size={16} />
              <span>Submit Report</span>
            </div>
          )}
        </Button>
      </form>

      <BottomNavigation />
    </div>
  );
};

export default ReportSubmission;