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
import Typography from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import Logo from "@/assets/munch_logo.png";

import React, { useState } from "react";

import { supabase } from "@/supabaseClient";

import { useToast } from "@/components/ui/use-toast";

import ToastMaster from "@/functions/toast-master.function";

export function SignIn() {
  const { toast } = useToast();

  const defFormValues = {
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(defFormValues);

  const handleFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleLoginWithEmailPassword = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (formValues.password === "") {
      toast({
        title: "No password provided",
        description:
          "Please use the magic link option if you forgot your password",
        variant: "destructive",
      });
    } else {
      setLoading(true);
      const { error }: { error: any } = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      if (error) {
        toast({
          title: "Login Error",
          description: error.error_description || error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: ToastMaster("login"),
          description: "Welcome back!",
        });
      }
      setLoading(false);
    }
  };

  const handleLoginWithMagicLink = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (formValues.email === "") {
      toast({
        title: "No email provided",
        description:
          "Please provide a valid email address where you would like to receive the magic link",
        variant: "destructive",
      });
    } else {
      setLoading(true);
      const { error }: { error: any } = await supabase.auth.signInWithOtp({
        email: formValues.email,
      });

      if (error) {
        toast({
          title: "Login Error",
          description: error.error_description || error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: ToastMaster("login"),
          description: "Check your email for the login link!",
        });
      }
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flexitems-center justify-center my-5">
          <img src={Logo} alt="Logo" className=" mx-auto" />
        </div>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          <Typography variant="muted">
            Sign in using your email and password
          </Typography>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@qwrk.online"
            required
            value={formValues.email}
            onChange={handleFormValues}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Keep me a secret"
            required
            value={formValues.password}
            onChange={handleFormValues}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button
            className="w-full"
            onClick={handleLoginWithEmailPassword}
            disabled={loading}
            variant={"default"}
          >
            {loading ? "Loading..." : "Log In"}
          </Button>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="basis-1/3">
              <Separator />
            </div>
            <div className="basis-1/3 flex justify-center">
              <Typography>OR</Typography>
            </div>
            <div className="basis-1/3">
              <Separator />
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleLoginWithMagicLink}
            disabled={loading}
            variant={"outline"}
          >
            {loading ? "Loading..." : "Send Magic Link"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
