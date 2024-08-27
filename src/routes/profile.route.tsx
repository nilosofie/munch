import React, { useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/context/auth.context";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  upsertReceiveUpdates,
  fetchReceiveUpdates,
} from "@/functions/sb-email-updates.function";

type ProfileSectionPropTypes = {
  title: String;
  children?: ReactNode;
  description?: String;
};

const ProfileSection = ({
  title,
  children,
  description = undefined,
}: ProfileSectionPropTypes) => (
  <div>
    <Typography variant="h2">{title}</Typography>
    {description && <Typography variant="muted">{description}</Typography>}
    <div className="flex flex-col gap-3 my-3 mx-2 items-start">{children}</div>
  </div>
);

function Profile() {
  const { updateHousehold, changePassword, selectedHousehold, currentUser } =
    useAuth();

  const { toast } = useToast();

  const defFormValues = {
    householdName: "",
    updates: false,
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(defFormValues);

  const handleFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const { value, name } = event.target;

    console.log(value, name);

    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleUpdatesCheckbox = (event: boolean) =>
    setFormValues((prevFormValues) => ({ ...prevFormValues, updates: event }));

  const handleHouseholdNameSubmit = async () => {
    setLoading(true);

    const { error } = await updateHousehold(formValues.householdName);

    if (error) {
      toast({
        title: "Update Error",
        description: error.error_description || error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Household Name Updated" });
    }

    setLoading(false);
  };

  const handleUpdatesSubmit = async () => {
    setLoading(true);
    upsertReceiveUpdates(formValues.updates);
    toast({ title: "Email preferences has been updated" });
    setLoading(false);
  };

  const handlePasswordSubmit = async () => {
    setLoading(true);
    const { error } = await changePassword(formValues.password);

    if (error) {
      toast({
        title: "Password Error",
        description: error.error_description || error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Password Updated" });
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        password: "",
      }));
    }
    setLoading(false);
  };

  // fetch calls

  const fetchReceiveUpdatesLoc = async () => {
    if (currentUser) {
      const receiveUpdates = await fetchReceiveUpdates(currentUser?.id);

      console.log(receiveUpdates);
      setFormValues((prevFormvalues) => ({
        ...prevFormvalues,
        updates: receiveUpdates ? receiveUpdates : false,
      }));
    }
  };

  useEffect(() => {
    if (selectedHousehold) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        householdName: selectedHousehold.household || "",
      }));
    }
  }, [selectedHousehold]);

  useEffect(() => {
    fetchReceiveUpdatesLoc();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Typography variant="h1">User Profile</Typography>
      <Typography variant="lead">
        Welcome to your qwrk profile page, where keeping things fresh is as easy
        as managing your freezer inventory! Update your email preferences,
        household name, and password here to ensure your details are as crisp as
        your favorite veggies. Let's keep your qwrk experience lively, just like
        MUNCH! itself.
      </Typography>
      <div className="flex flex-col space-y-5">
        <ProfileSection title="Household Name" description="Current Household">
          <div>
            <Label htmlFor="household">Household Name</Label>
            <Input
              id="household"
              type="text"
              name="householdName"
              placeholder="Household name"
              value={formValues.householdName}
              onChange={handleFormValues}
            />
          </div>
          <div>
            <Button onClick={handleHouseholdNameSubmit} disabled={loading}>
              Update Household name
            </Button>
          </div>
        </ProfileSection>
        <ProfileSection
          title="Updates"
          description="Receive updates on new features"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              name="updates"
              checked={formValues.updates}
              onCheckedChange={handleUpdatesCheckbox}
            />
            <label
              htmlFor="updates"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept receiving email updates on feature releases
            </label>
          </div>
          <div>
            <Button onClick={handleUpdatesSubmit} disabled={loading}>
              Save Preference
            </Button>
          </div>
        </ProfileSection>
        <ProfileSection title="Password" description="Update user password">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Keep me a secret"
              value={formValues.password}
              onChange={handleFormValues}
            />
          </div>
          <div>
            <Button onClick={handlePasswordSubmit} disabled={loading}>
              Update Password
            </Button>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
}

export default Profile;
