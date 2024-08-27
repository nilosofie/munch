import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth.context";

export function Logout() {
  const { logout } = useAuth();

  return (
    <Button variant="ghost" size="icon" onClick={logout}>
      <LogOut className="h-[1.2rem] w-[1.2rem] " />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
