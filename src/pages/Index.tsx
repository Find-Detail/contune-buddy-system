
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, CheckSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Lead Management",
      description: "Track and nurture your potential customers through the sales pipeline"
    },
    {
      icon: Users,
      title: "Client Relations",
      description: "Maintain strong relationships with existing clients and track their projects"
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Organize and assign tasks to keep your team productive and on track"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description: "Get insights into your sales performance and team productivity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Contune</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive buddy system for managing leads, clients, and tasks. 
            Streamline your business operations with our powerful CRM platform.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to get started?</CardTitle>
              <CardDescription>
                Join thousands of businesses who trust Contune to manage their customer relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/dashboard')} 
                size="lg"
                className="px-12 py-4 text-lg"
              >
                Launch Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
