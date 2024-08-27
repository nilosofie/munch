import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import { usePantry } from "../pantry.context";
import { useCredit } from "@/context/credit.context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";

// export type InventoryType = {
//   id: string;
//   portions: number;
//   item: string;
// };

import ToastMaster from "@/functions/toast-master.function";

export type StockType = { id: string; item: string | null; portions: number };

export const InventoryColumns: ColumnDef<StockType>[] = [
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "portions",
    header: "Portions",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const og = row.original;

      const disabled = og.portions === 0 ? true : false;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dialogVar, setDialogVar] = useState<
        "add" | "remove" | "planning" | "def" | "removeItem"
      >("def");

      return (
        <div className="flex flex-row items-center justify-end">
          <Dialog>
            <DialogTrigger>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setDialogVar("add")}
              >
                <span className="sr-only">Add portions</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Plus className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Add portions to item</TooltipContent>
                </Tooltip>
              </Button>
            </DialogTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MoreHorizontal className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>Actions</TooltipContent>
                  </Tooltip>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem onClick={() => setDialogVar("removeItem")}>
                    Remove Item
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => setDialogVar("remove")}
                    disabled={disabled}
                  >
                    Remove Portions
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogVariant
              itemId={og.id}
              currentPortions={og.portions}
              variant={dialogVar}
            />
          </Dialog>
        </div>
      );
    },
  },
];

type DialogVariantType = {
  itemId: string;
  currentPortions: number;
  variant: "add" | "remove" | "planning" | "def" | "removeItem";
};

// eslint-disable-next-line react-refresh/only-export-components
const DialogVariant = ({
  itemId,
  currentPortions,
  variant = "def",
}: DialogVariantType) => {
  const retVar = {
    add: <DialogAddPortions itemId={itemId} />,
    remove: (
      <DialogRemovePortions itemId={itemId} currentPortions={currentPortions} />
    ),
    planning: (
      <DialogAddToPlanning itemId={itemId} currentPortions={currentPortions} />
    ),
    def: <DialogContent>error</DialogContent>,
    removeItem: (
      <DialogRemoveItem itemId={itemId} currentPortions={currentPortions} />
    ),
  };

  return retVar[variant];
};

type DialogType = {
  itemId: string;
  currentPortions?: number;
};
// eslint-disable-next-line react-refresh/only-export-components
const DialogAddPortions = ({ itemId }: DialogType) => {
  const { addPortionsToInventory } = usePantry();
  const { toast } = useToast();

  const [portions, setPortions] = useState(1);

  const handleSubmit = () => {
    addPortionsToInventory(itemId, portions);
    toast({
      title: ToastMaster("inventoryAdd"),
      description: `${portions} portions added to your inventory`,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add to Inventory</DialogTitle>
        <DialogDescription>
          How many portions would you like to add to your inventory?
        </DialogDescription>
      </DialogHeader>
      <div>
        <Input
          type="input"
          placeholder="Portions"
          onChange={(e) => {
            const { value } = e.target;
            if (value === "" || parseInt(value) < 0) {
              setPortions(0);
            } else setPortions(parseInt(value));

            //setPortions(parseInt(value))
          }}
          name="portionsToAdd"
          value={portions}
        ></Input>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const DialogRemovePortions = ({ itemId, currentPortions = 0 }: DialogType) => {
  const { addPortionsToInventory } = usePantry();
  const { toast } = useToast();

  const [portions, setPortions] = useState(1);

  const handleSubmit = () => {
    if (portions > currentPortions) {
      toast({
        title: "Not so fast...",
        description:
          "You're attempting to remove more portions than currently in your inventory",
      });
    } else {
      addPortionsToInventory(itemId, -portions);
      toast({
        title: ToastMaster("inventoryRemove"),
        description: `${portions} portions removed from your inventory`,
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remove from Inventory</DialogTitle>
        <DialogDescription>
          How many portions would you like to remove from your inventory?
        </DialogDescription>
      </DialogHeader>
      <div>
        <Input
          type="input"
          placeholder="Portions"
          onChange={(e) => {
            const { value } = e.target;
            if (value === "" || parseInt(value) < 0) {
              setPortions(0);
            } else setPortions(parseInt(value));

            //setPortions(parseInt(value))
          }}
          name="portionsToAdd"
          value={portions}
        ></Input>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSubmit}>
            Remove
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const DialogAddToPlanning = ({ itemId, currentPortions = 0 }: DialogType) => {
  const { addPortionsToPlanning } = usePantry();
  const { consumeCredit } = useCredit();

  const { toast } = useToast();

  const [values, setValues] = useState({
    portions: 1,
    description: "",
  });

  const handleSubmit = () => {
    if (values.portions > currentPortions) {
      toast({
        title: "Hmmmmm... I think not",
        description:
          "You're attempting add more portions to planning than available in inventory",
      });
    } else {
      addPortionsToPlanning(itemId, values.description, values.portions);
      toast({
        title: ToastMaster("planning"),
        description: `${values.portions} portions added to your planning`,
      });
    }
  };

  const handleNoCreditToast = () => {
    toast({
      variant: "destructive",
      title: "Eeeesh",
      description: ToastMaster("noCredit"),
      action: (
        <ToastAction altText="Buy Credits">
          <Link to={"/buy"}>Buy Credits</Link>
        </ToastAction>
      ),
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Item to planning</DialogTitle>
        <DialogDescription>
          How many portions would you like to add to your planning?
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        <Input
          type="input"
          placeholder="Portions"
          onChange={(e) => {
            const { value } = e.target;
            if (value === "" || parseInt(value) < 0) {
              setValues((prev) => ({ ...prev, portions: 0 }));
            } else if (parseInt(value) > currentPortions) {
              setValues((prev) => ({ ...prev, portions: currentPortions }));
            } else
              setValues((prev) => ({ ...prev, portions: parseInt(value) }));

            //setPortions(parseInt(value))
          }}
          name="portionsToAdd"
          value={values.portions}
        />
        <Textarea
          placeholder="Meal notes"
          value={values.description}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="submit"
            onClick={() => consumeCredit(handleSubmit, handleNoCreditToast)}
          >
            Add
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const DialogRemoveItem = ({ itemId, currentPortions = 0 }: DialogType) => {
  const { removeInventoryType } = usePantry();
  const { toast } = useToast();

  const portionsInStockText =
    currentPortions > 0 &&
    `You still have ${currentPortions} portions in stock`;

  const handleSubmit = () => {
    removeInventoryType(itemId);
    toast({
      title: ToastMaster("inventoryRemove"),
      description: `Item removed from your inventory`,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remove item from Inventory</DialogTitle>
        <DialogDescription>
          Are you sure you would like to remove this item from your inventory?
          {portionsInStockText}
        </DialogDescription>
      </DialogHeader>
      <DialogContent>Yada?</DialogContent>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Nope!</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSubmit} variant="destructive">
            Remove
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
