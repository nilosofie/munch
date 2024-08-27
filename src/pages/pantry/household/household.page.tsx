import { useState } from "react";

// hooks
import { useAuth } from "@/context/auth.context";
import { useToast } from "@/components/ui/use-toast";

// ui components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";

// functions
import ToastMaster from "@/functions/toast-master.function";

function Household() {
  const { createHousehold } = useAuth();
  const { toast } = useToast();

  const defFormValues = {
    householdName: "",
  };
  const [formValues, setFormvalues] = useState(defFormValues);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await createHousehold(formValues.householdName);
    setLoading(false);
    toast({
      title: ToastMaster("createHousehold"),
      description: `${formValues.householdName} household has been created!`,
    });
    setFormvalues(defFormValues);
  };

  return (
    <div>
      <Typography variant="h1">Households</Typography>

      <Typography variant="p">
        You have no households linked to your account - please create one.
      </Typography>
      <br />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mx-auto"
            onClick={() => setFormvalues(defFormValues)}
          >
            Create Household
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new household</DialogTitle>
            <DialogDescription>
              What do you want to name your household?
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              type="input"
              placeholder="Household name"
              onChange={(event) => {
                const { value, name } = event.target;

                setFormvalues((prev) => ({ ...prev, [name]: value }));
              }}
              name="householdName"
              value={formValues.householdName}
            ></Input>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit} disabled={loading}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Household;
