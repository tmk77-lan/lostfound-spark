import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      navigate("/");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">FindIt</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/lost-items"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/lost-items") ? "text-primary" : "text-foreground"
              }`}
            >
              Lost Items
            </Link>
            <Link
              to="/found-items"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/found-items") ? "text-primary" : "text-foreground"
              }`}
            >
              Found Items
            </Link>
            {user && (
              <>
                <Link
                  to="/report-lost"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/report-lost") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Report Lost
                </Link>
                <Link
                  to="/report-found"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/report-found") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Report Found
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
