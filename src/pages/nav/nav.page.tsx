import React, { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

import Logo from "@/assets/munch_logo.png";

import { PanelLeft, Home, User, BookUser } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { ModeToggle } from "./darkmode.component";

import { Logout } from "../sign-in/logout.component";
import Typography from "@/components/ui/typography";

import { supabase } from "@/supabaseClient";

import { useCredit } from "@/context/credit.context";
import { useToast } from "@/components/ui/use-toast";

import ToastMaster from "@/functions/toast-master.function";
function Nav() {
  const location = useLocation();

  const { toast } = useToast();

  const { freeCredits, paidCredits } = useCredit();

  const [feedback, setFeedback] = useState("");

  const handleFeedback = async () => {
    const { error } = await supabase
      .from("feedback")
      .insert([{ path: location.pathname, feedback: feedback }])
      .select();

    toast({
      title: ToastMaster("feedback"),
      description: "Feedback has been submitted",
      variant: "rainbow",
    });
    if (error) console.error(error);
  };

  const iconStyles = {
    main: "h-4 w-4 transition-all group-hover:scale-110",
    def: "h-5 w-5",
  };

  type NavItemsType = {
    to: string;
    main: boolean;
    name: string;
    icon: React.ReactNode;
  };

  const navItems: NavItemsType[] = [
    {
      to: "/",
      main: true,
      name: "MUNCH!",
      icon: <Home className={iconStyles.main} />,
    },
    {
      to: "/profile",
      main: false,
      name: "Profile",
      icon: <User className={iconStyles.def} />,
    },
    { to: "/help", main: false, name: "User Guide", icon: <BookUser /> },
  ];

  const convertNavLg = (items: NavItemsType[]): React.ReactNode[] => {
    return items.map((item) => {
      if (item.main) {
        return (
          <TooltipProvider key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return (
        <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={item.to}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    });
  };

  const convertNavSm = (items: NavItemsType[]): React.ReactNode[] => {
    return items.map((item) => {
      if (item.main) {
        return (
          <SheetTrigger asChild key={item.name}>
            <Link to={item.to}>
              <div className="flex flex-row items-center">
                <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                  {item.icon}
                </div>
                <div className="px-2">
                  <Typography variant="large">{item.name}</Typography>
                </div>
              </div>
            </Link>
          </SheetTrigger>
        );
      }

      return (
        <SheetTrigger asChild key={item.name}>
          <Link to={item.to}>
            <div className="flex flex-row items-center mx-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                {item.icon}
              </div>
              <div className="px-2">
                <Typography variant="large">{item.name}</Typography>
              </div>
            </div>
          </Link>
        </SheetTrigger>
      );
    });
  };

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {convertNavLg(navItems)}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <ModeToggle />
          <Logout />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="sm:max-w-xs flex flex-col justify-between"
            >
              <nav className="grid gap-6 text-lg font-medium">
                {convertNavSm(navItems)}
              </nav>
              <div className="my-2">
                <div className="flex flex-row items-center">
                  <ModeToggle />
                  <div className="px-4">
                    <Typography variant="p">Toggle theme</Typography>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row items-center">
                    <Logout />
                    <div className="px-4">
                      <Typography variant="p">Sign out</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex justify-end w-full gap-4 sm:gap-10 items-center">
            <div className="flex justify-end w-full gap-1 sm:gap-3 items-center">
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <div>
                  <Typography variant="muted">{`Free Credits: ${freeCredits}`}</Typography>
                </div>
                <div>
                  <Typography variant="muted">{`qwrk Credits: ${paidCredits}`}</Typography>
                </div>
              </div>
              <Button asChild variant={"outline"}>
                <Link to={"/buy"}>Buy</Link>
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"rainbow"}>Feedback</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Give Feedback</DialogTitle>
                  <DialogDescription>
                    We're all ears! Your feedback fuels our mission to craft the
                    perfect experience. Every suggestion, thought, and idea you
                    share helps us shape qwrk into something even more
                    delightful for you.
                  </DialogDescription>
                </DialogHeader>

                <Textarea
                  placeholder="Share your thoughts here... "
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={handleFeedback}
                      variant="rainbow"
                    >
                      Send Feedback
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <main className="w-full grid grid-cols-1 gap-0  p-4 sm:px-6 sm:py-0 max-w-5xl mx-auto">
          <div className="mt-2 sm:my-3 mx-auto sm:mx-1 flex items-center">
            <img className="h-1/2 sm:h-3/4 md:h-auto" src={Logo} alt="Logo" />
          </div>
          <div className="grid lg:min-w-[59rem] flex-1 auto-rows-max gap-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Nav;
