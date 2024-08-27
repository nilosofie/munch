import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Logo from "@/assets/munch_logo.png";

import React, { useState } from "react";

import { supabase } from "@/supabaseClient";

import { useToast } from "@/components/ui/use-toast";

import ToastMaster from "@/functions/toast-master.function";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { toast } = useToast();
  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    setLoading(true);
    const { error }: { error: any } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      toast({
        title: ToastMaster("login"),
        description: "Check your email for the login link!",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flexitems-center justify-center my-5">
          <img src={Logo} alt="Logo" className=" mx-auto" />
        </div>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Register using a magic link</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@qwrk.online"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
          variant={"rainbow"}
        >
          {loading ? "Loading..." : "Send Magic Link"}
        </Button>
      </CardFooter>
    </Card>
  );
}
