import { SignUp } from "./sign-up.component";

import { SignIn } from "./sign-in.component";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Auth() {
  return (
    <div className="container  h-screen flex justify-center items-center">
      <Tabs defaultValue="log-in">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="log-in">Log In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="log-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="register">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
