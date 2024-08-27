import { useEffect, useState } from "react";
import { format } from "date-fns";

// hooks
import { useAuth } from "@/context/auth.context";
import { usePantry } from "../pantry.context";
import { useCredit } from "@/context/credit.context";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// ui
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import {
  generateSuggestion,
  fetchPlannedItem,
  fetchAvailableStock,
} from "../sbFunctions.pantry";

import { Button } from "@/components/ui/button";
// types
import { Link } from "react-router-dom";

import ToastMaster from "@/functions/toast-master.function";

function AddToPlanningDialog({
  buttonClick,
  editItemId = undefined,
}: {
  buttonClick: boolean;
  editItemId?: string | undefined;
}) {
  const { selectedHousehold } = useAuth();
  const {
    addPortionsToPlanning,
    markPlanningItemInactive,
    addPortionsToInventory,
    inventory,
  } = usePantry();
  const { consumeCredit } = useCredit();
  const { toast } = useToast();

  const defItem = {
    id: "",
    item: "",
    portions: 1,
    description: "",
    available_portions: 0,
    date: null,
  };

  const defEditItem = {
    id: null,
    itemId: null,
    portions: 0,
  };

  // Form values
  const [item, setItem] = useState<{
    id: string | null;
    item: string | null;
    portions: number | null;
    description: string | null;
    available_portions: number | null;
    date: string | null;
  }>(defItem);

  const [editItem, setEditItem] = useState<{
    id: null | string;
    itemId: null | string;
    portions: number;
  }>(defEditItem);

  const [loading, setLoading] = useState(false);

  // state for item selection - combobox
  const [itemSelectOpen, setItemSelectOpen] = useState(false);

  const inventoryMap = inventory.map((inventoryItem) => ({
    value: inventoryItem.id,
    label: `${inventoryItem.item}: ${inventoryItem.portions}`,
  }));

  // No credit to add to inventory
  const handleNoCreditToast = () => {
    toast({
      variant: "destructive",
      title: ToastMaster("noCredit"),
      description: "You don't have enough credit to perform the action.",
      action: (
        <ToastAction altText="Buy Credits">
          <Link to={"/buy"}>Buy Credits</Link>
        </ToastAction>
      ),
    });
  };

  // ON OPEN

  // if !editMode
  const handleSuggestion = async () => {
    setLoading(true);
    const getSuggestion = await generateSuggestion(selectedHousehold);
    setItem((prev) => ({ ...prev, ...getSuggestion }));
    setLoading(false);
  };

  // if editMode
  const fetchItem = async () => {
    if (editItemId) {
      setLoading(true);
      const plannedItem = await fetchPlannedItem(editItemId);

      if (plannedItem && plannedItem.item_id && plannedItem.planning_portions) {
        // setItemPortions(plannedItem.planning_portions);
        setEditItem({
          id: plannedItem.planning_id,
          itemId: plannedItem.item_id,
          portions: plannedItem.planning_portions,
        });

        const availableStock = await fetchAvailableStock(plannedItem.item_id);

        const availablePortions =
          availableStock && availableStock + plannedItem.planning_portions;

        setItem((prevItem) => ({
          ...prevItem,
          id: plannedItem.item_id,
          item: plannedItem.item_name,
          portions: plannedItem.planning_portions,
          description: plannedItem.planning_description,
          date: plannedItem.planned_date,
          available_portions: availablePortions,
        }));
      }
      setLoading(false);
    }
  };

  // called on submission
  const handleItemToAddSubmit = async () => {
    setLoading(true);

    if (item.id && item.portions) {
      addPortionsToPlanning(
        item.id,
        item.description ? item.description : undefined,
        item.portions,
        item.date
      ); // adds to planning, removes from stock
    }

    // editMode
    if (editItemId) {
      handleUpdate();
    }

    setItem(defItem);

    setLoading(false);
    toast({
      title: ToastMaster("planning"),
      description: `${item.portions}x ${item.item} was added to your planning`,
      variant: "rainbow",
    });
  };

  // called on submission - if  editMode
  const handleUpdate = async () => {
    if (editItem.id && editItem.itemId) {
      markPlanningItemInactive(editItem.id);
      addPortionsToInventory(editItem.itemId, editItem.portions);
    }
  };

  // used when another product is selected
  const handleSelect = (id: string) => {
    const selection = inventory.find(
      (inventoryItem) => inventoryItem.id === id
    );
    if (selection) {
      setItem((prev) => ({
        ...prev,
        portions: 1,
        id: selection.id,
        item: selection.item,
        available_portions: selection.portions,
      }));
    }
  };

  const handleSendBackToInventory = async () => {
    if (editItem.id && editItem.itemId) {
      await markPlanningItemInactive(editItem.id);
      addPortionsToInventory(editItem.itemId, editItem.portions);
      toast({
        title: ToastMaster("inventoryAdd"),
        description: ` ${item.item} has been sent back to your inventory`,
      });
    }
  };

  useEffect(() => {
    if (editItemId) {
      fetchItem();
    } else {
      // setItem(defItem);
      handleSuggestion();
    }
  }, [buttonClick]);

  return (
    <DialogContent>
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-auto" />

          <Skeleton className="h-8 w-auto" />
          <Skeleton className="h-16 w-auto" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      ) : (
        <>
          <DialogHeader>
            {/*
             */}
            <Popover open={itemSelectOpen} onOpenChange={setItemSelectOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  role="combobox"
                  aria-expanded={itemSelectOpen}
                  className="w-[200px] justify-between"
                >
                  {item?.item}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                      {inventoryMap.map((inventoryItem) => (
                        <CommandItem
                          key={inventoryItem.value}
                          value={inventoryItem.value}
                          onSelect={(currentValue) => {
                            handleSelect(currentValue);
                            setItemSelectOpen(false);
                          }}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          {inventoryItem.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <DialogDescription>
              Would you like to add {item.item} to your planning?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Input
              type="input"
              placeholder="Portions"
              onChange={(event) => {
                const { value } = event.target;

                if (value === "" || parseInt(value) < 1) {
                  setItem((prevItem) => ({
                    ...prevItem,
                    portions: 0,
                  }));
                } else if (
                  item.available_portions &&
                  parseInt(value) > item.available_portions
                ) {
                  setItem((prevItem) => ({
                    ...prevItem,
                    portions: item.available_portions,
                  }));
                } else
                  setItem((prevItem) => ({
                    ...prevItem,
                    portions: parseInt(value),
                  }));
              }}
              name="itemToAdd"
              value={String(item.portions)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.date ? (
                    format(item.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={item.date ? new Date(item.date) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setItem((prevItem) => ({
                        ...prevItem,
                        date: date.toISOString(), // Convert the selected date to a string or your preferred format
                      }));
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <Textarea
              placeholder="Meal notes"
              value={item.description ? item.description : undefined}
              onChange={(e) =>
                setItem((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <DialogFooter>
            <div className="flex flex-col-reverse sm:flex-row gap-2">
              <div className="mx-auto">
                {editItemId && (
                  <DialogClose>
                    <Button
                      variant={"outline"}
                      onClick={handleSendBackToInventory}
                    >
                      Move Back To Inventory
                    </Button>
                  </DialogClose>
                )}
              </div>
              <div className="mx-auto">
                <DialogClose asChild>
                  <Button
                    variant="rainbow"
                    type="submit"
                    onClick={() => {
                      consumeCredit(handleItemToAddSubmit, handleNoCreditToast);
                    }}
                    disabled={loading || !item.id}
                  >
                    {editItemId ? "Update" : "Add to planning"}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}

export default AddToPlanningDialog;
