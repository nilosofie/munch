import { useEffect, useState } from "react";

// hooks
import { useAuth } from "@/context/auth.context";
import { usePantry } from "../pantry.context";

// ui
import { PlanningColumns } from "./PlanningColumns.component";
import { PlanningDataTable } from "./PlanningDataTable.component";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Utensils } from "lucide-react";

import { HowToType, HowToAccordion } from "../how-to-accordion.component";
import AddToPlanningDialog from "./AddToPlanningDialog.component";

import { Button } from "@/components/ui/button";

function Planning() {
  const { selectedHousehold } = useAuth();
  const { planning, totalItemsInInventory } = usePantry();

  const disabledGenSug = totalItemsInInventory === 0;

  const [buttonClick, setButtonClick] = useState(false);

  const toggleButtonClick = () =>
    setButtonClick((prevButtonClick) => !prevButtonClick);

  const handleSuggestion = async () => {
    toggleButtonClick();
  };

  useEffect(() => {
    selectedHousehold;
  }, [selectedHousehold]);

  const howTo: HowToType[] = [
    {
      head: "Generate Suggestion:",
      body: 'Click on the "Generate Suggestion" button next to the "Meal Strategy" heading to summon a delightful suggestion from your Foundation Foods List. Let MUNCH! work its magic and serve up some culinary inspiration!',
      key: "generate-suggestion",
    },
    {
      head: "Portions:",
      body: `When planning your meal, you have the flexibility to select the number of portions you'd like to add to your strategy. Simply choose how many people you're planning to feed with that particular meal. It's a straightforward way to ensure your meal plan aligns perfectly with your appetite and guest list!`,
      key: "portions",
    },
    {
      head: "Meal Notes:",
      body: `Got something to say about your meal? Add your notes here! Whether it's the munching day, meal name, or items for your shopping list, jot it down. Every note adds a sprinkle of personality to your meal plan!`,
      key: "meal-notes",
    },
    {
      head: "Munch Button:",
      body: `Ready to devour that delicious dish? Click the checkmark next to the item in the table to signify that you've indulged in the meal. It's a munch-tastic way to keep track of what's been consumed!`,
      key: "munch-button",
    },
    {
      head: "Edit Items",
      body: `To refine your culinary plans, simply click the "Edit Item" button nestled in the row beside the dish you wish to tweak. Make your modifications—perhaps a pinch more of this or a dash less of that. Once you're satisfied with your adjustments, hit "Update" and let MUNCH! stir up your meal strategy to perfection. Easy peasy, lemon squeezy!`,
      key: "edit-items",
    },
    {
      head: "Back to Foundation Foods Button:",
      body: `Oops, plans changed? No worries! Hit the "Move Back to Inventory" button in "Edit Item" to return portions to your Foundation Foods. It's like hitting the rewind button on your meal strategy, ensuring everything stays fresh for future munching adventures!`,
      key: "back-to-foundation",
    },
  ];

  return (
    <div className="mx-auto py-2 flex flex-col w-full gap-4 max-w-3xl">
      <div className="flex flex-row  items-start justify-between ">
        <div className="w-5/6 lg:w-11/12">
          <Accordion type="multiple">
            <AccordionItem value="meal-strategy">
              <AccordionTrigger>
                <div className="mx-2">
                  <Typography variant="h3">Meal Strategy</Typography>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Typography variant="muted">
                  Welcome to the Meal Strategy section of MUNCH!, where meal
                  planning meets fun! Here's your guide to making the most out
                  of your inventory and getting those taste buds tingling with
                  our suggestions:
                </Typography>
                <HowToAccordion howToArray={howTo} />
                <Typography variant="muted">
                  So there you have it! With these simple steps, you'll be
                  mastering meal strategies like a culinary wizard in no time.
                  Let's munch away and make every meal a memorable one with
                  MUNCH!
                </Typography>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-3 lg:mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={handleSuggestion}
                disabled={disabledGenSug}
                variant="rainbow"
                size="icon"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Utensils className="h-[1.2rem] w-[1.2rem] " />
                  </TooltipTrigger>
                  <TooltipContent>Generate Suggestion</TooltipContent>
                </Tooltip>
              </Button>
            </DialogTrigger>
            <AddToPlanningDialog buttonClick={buttonClick} />
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        <PlanningDataTable columns={PlanningColumns} data={planning} />
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}

export default Planning;
