import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Quickly find lost items or report what you've found",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with others to reunite lost items with owners",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is protected and shared only when needed",
    },
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Help someone's day by returning their lost belongings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar user={user} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Lost Something?
                  <span className="block bg-gradient-hero bg-clip-text text-transparent">
                    We'll Help You Find It
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Join our community platform to report lost items, find what you're missing,
                  or help reunite others with their belongings.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/lost-items")}
                  className="bg-gradient-hero shadow-medium hover:shadow-strong transition-all"
                >
                  Browse Lost Items
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/found-items")}
                >
                  Browse Found Items
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-strong">
                <img
                  src={heroImage}
                  alt="Community helping each other find lost items"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How FindIt Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it simple to reunite lost items with their owners
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-all"
              >
                <div className="p-3 rounded-full bg-primary-light">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Join our community today and help reunite lost items with their owners
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {user ? (
                <>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate("/report-lost")}
                    className="bg-secondary hover:bg-secondary/90 shadow-medium"
                  >
                    Report Lost Item
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/report-found")}
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Report Found Item
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/auth")}
                  className="bg-secondary hover:bg-secondary/90 shadow-medium"
                >
                  Get Started Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
