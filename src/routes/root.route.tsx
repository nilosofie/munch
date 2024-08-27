import { Auth } from "../pages/sign-in/auth.route";
import Nav from "@/pages/nav/nav.page";
import { useAuth } from "@/context/auth.context";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function Root() {
  const { currentUser } = useAuth();
  return (
    <div className="w-full">
      <TooltipProvider>
        {currentUser ? (
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Nav />
          </div>
        ) : (
          <Auth />
        )}
        <Toaster />
      </TooltipProvider>
    </div>
  );
}

export default Root;
