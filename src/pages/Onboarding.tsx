import { useState } from "react";
import { Phone, FileCheck, ArrowRight, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens making their communities better"
    },
    {
      icon: Zap,
      title: "Quick Reports",
      description: "Report issues in seconds with our streamlined process"
    },
    {
      icon: Shield,
      title: "Secure & Anonymous",
      description: "Your privacy is protected while making a difference"
    }
  ];

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(2);
    
    toast({
      title: "OTP sent successfully",
      description: "Please check your phone for the verification code.",
    });
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    toast({
      title: "Welcome to Civic Reports!",
      description: "Your account has been created successfully.",
    });
    
    navigate("/");
  };

  const handleDigilockerLogin = async () => {
    setIsLoading(true);
    // Simulate Digilocker integration
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    
    toast({
      title: "Welcome to Civic Reports!",
      description: "Successfully authenticated with Digilocker.",
    });
    
    navigate("/");
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-8">
              <Users className="text-primary-foreground" size={32} />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                Civic Reports
              </h1>
              <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                Make your community better by reporting local issues and tracking their resolution
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 py-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-4 bg-card/50 border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 pb-8 space-y-4">
          <Button
            onClick={() => setCurrentStep(1)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2" size={18} />
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center px-6">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Sign Up</h2>
            <p className="text-muted-foreground">
              Choose your preferred method to create an account
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone Number Option */}
            <Card className="p-6 bg-card border-border">
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone Number</h3>
                    <p className="text-sm text-muted-foreground">Quick verification via SMS</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </Card>

            {/* Digilocker Option */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileCheck className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Digilocker</h3>
                    <p className="text-sm text-muted-foreground">Secure government verification</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleDigilockerLogin}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Continue with Digilocker"}
                </Button>
              </div>
            </Card>
          </div>

          <Button
            variant="ghost"
            onClick={() => setCurrentStep(0)}
            className="w-full"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center px-6">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Verify Phone</h2>
            <p className="text-muted-foreground">
              Enter the 6-digit code sent to<br />
              <span className="font-medium">+91 {phoneNumber}</span>
            </p>
          </div>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-input border-border text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <Button variant="ghost" size="sm">
              Resend OTP
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(1)}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Onboarding;