
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, CheckSquare, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Smart Lead Management",
      description: "AI-powered lead scoring and automated nurturing pipelines",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Client Success Hub",
      description: "360° client view with relationship tracking and insights",
      color: "bg-green-500"
    },
    {
      icon: CheckSquare,
      title: "Intelligent Tasks",
      description: "Priority-based task management with team collaboration",
      color: "bg-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time insights and predictive performance metrics",
      color: "bg-orange-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", color: "text-blue-600" },
    { label: "Leads Processed", value: "2M+", color: "text-green-600" },
    { label: "Revenue Generated", value: "$50M+", color: "text-purple-600" },
    { label: "Success Rate", value: "98%", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            Next-Generation CRM Platform
          </Badge>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Contune</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionize your business operations with our AI-powered CRM platform. 
            Streamline leads, nurture clients, and boost productivity with intelligent automation.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6" />
              <Globe className="h-6 w-6" />
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle className="text-3xl font-bold mb-4">Ready to Transform Your Business?</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Join thousands of businesses who trust Contune to scale their operations and drive growth
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              variant="secondary"
              className="px-12 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-blue-100 text-sm mt-4">No credit card required • Setup in 5 minutes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
