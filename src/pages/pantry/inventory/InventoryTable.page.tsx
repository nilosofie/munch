import { useEffect, useState } from "react";

// hooks
import { useAuth } from "@/context/auth.context";
import { usePantry } from "../pantry.context";
import { useToast } from "@/components/ui/use-toast";

// ui
import { InventoryColumns } from "./InventoryColumns.component";
import { InventoryDataTable } from "./InventoryDataTable.component";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Beef } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HowToType, HowToAccordion } from "../how-to-accordion.component";

// types
import { Button } from "@/components/ui/button";

import ToastMaster from "@/functions/toast-master.function";

function Inventory() {
  const { selectedHousehold } = useAuth();
  const { inventory, addInventoryType } = usePantry();
  const { toast } = useToast();

  const defItemToAdd = {
    item: "",
    portions: 0,
  };

  const [itemToAdd, setItemToAdd] = useState(defItemToAdd);
  const [loading, setLoading] = useState(false);

  const handleItemToAddSubmit = async () => {
    setLoading(true);

    await addInventoryType(itemToAdd.item, itemToAdd.portions);

    setLoading(false);
    toast({
      title: ToastMaster("inventoryAdd"),
      description: `${itemToAdd.portions} x ${itemToAdd.item} was added to your items`,
    });

    setItemToAdd(defItemToAdd);
  };

  const howTo: HowToType[] = [
    {
      head: "What are Foundation Foods?",
      body: `Foundation Foods represent all the culinary gems nestled within your home, ready to take center stage in your meal planning. Each item on this list is a potential hero ingredient around which you can craft delightful meals.`,
      key: "what-is-foundation-foods",
    },
    {
      head: "Adding Items:",
      body: `Ready to expand your culinary arsenal? Simply click on the fridge button located to the right of the "Foundation Foods" heading. This is your gateway to adding new items to your Foundation Foods list. Let the culinary adventures begin!`,
      key: "adding-items",
    },
    {
      head: "Portions:",
      body: `Portions are the magic ingredient that determines how many people you can tantalize with a particular item. For instance, if you possess 5 packs, each capable of serving 2 people, you'll boast a total of 10 portions. It's the secret sauce to ensuring everyone leaves the table satisfied!`,
      key: "portions",
    },
    {
      head: "Adding Portions:",
      body: `As your culinary collection grows, so do the possibilities! Use the plus mark next to the item in the table to add additional portions. It's like expanding your inventory list for a culinary extravaganza!`,
      key: "add-portions",
    },
    {
      head: "Actions:",
      body: `Ah, the power of actions! Located beside the "Add Items" button, the ellipsis (...) opens up a world of culinary possibilities:
      `,
      key: "actions",
    },
    {
      head: `- Remove Item:`,
      body: `Bid farewell to ingredients that no longer spark joy. This option gracefully removes the item from your Foundation Foods list, making room for new culinary conquests.`,
      key: `remove-item`,
    },
    {
      head: `- Remove Portions:`,
      body: `Need to downsize? Select this option to subtract a specific number of portions from the item. It's like trimming excess fat from your meal plan!`,
      key: `remove-porions`,
    },
  ];

  useEffect(() => {
    selectedHousehold;
  }, [selectedHousehold]);

  // useEffect(() => {
  //   console.log(inventory);
  // }, [inventory]);

  return (
    <div className="mx-auto py-2 flex flex-col w-full gap-4 max-w-3xl">
      <Dialog>
        <div className="flex flex-row items-start justify-between ">
          <div className="w-5/6 lg:w-11/12">
            <Accordion type="multiple">
              <AccordionItem value="meal-strategy">
                <AccordionTrigger>
                  <div className="mx-2">
                    <Typography variant="h3">Foundation Foods</Typography>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Typography variant="muted">
                    Welcome to your culinary playground, where every ingredient
                    is a potential hero! The Foundation Foods list is your
                    treasure trove of ingredients waiting to be transformed into
                    delicious meals. Here's how to make the most out of it:
                  </Typography>
                  <HowToAccordion howToArray={howTo} />
                  <Typography variant="muted">
                    With these simple steps, you're all set to curate a culinary
                    masterpiece with qwrk's Foundation Foods. Let the cooking
                    adventures begin!
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-3 lg:mt-5">
            <DialogTrigger asChild>
              <Button onClick={() => setItemToAdd(defItemToAdd)} size="icon">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Beef className="h-[1.2rem] w-[1.2rem] " />
                  </TooltipTrigger>
                  <TooltipContent>Add item to Foundation Foods</TooltipContent>
                </Tooltip>
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <div className="w-full">
          <InventoryDataTable columns={InventoryColumns} data={inventory} />
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new item</DialogTitle>
            <DialogDescription>
              What item would you like to add?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 flex-col">
            <Input
              type="input"
              placeholder="Inventory Item"
              onChange={(e) =>
                setItemToAdd((prevVal) => ({
                  ...prevVal,
                  [e.target.name]: e.target.value,
                }))
              }
              name="item"
              value={itemToAdd.item}
            />
            <Input
              type="input"
              placeholder="Portions"
              onChange={(e) =>
                setItemToAdd((prevVal) => {
                  const { name, value } = e.target;

                  if (value === "" || parseInt(value) < 0) {
                    return {
                      ...prevVal,
                      [name]: 0,
                    };
                  }

                  return {
                    ...prevVal,
                    [name]: parseInt(value),
                  };
                })
              }
              name="portions"
              value={itemToAdd.portions}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleItemToAddSubmit}
                disabled={loading}
              >
                Add Item
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Inventory;
