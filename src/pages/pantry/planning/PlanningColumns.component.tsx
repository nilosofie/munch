import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Check, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePantry } from "../pantry.context";

import { useToast } from "@/components/ui/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Typography from "@/components/ui/typography";

import { PlanningType } from "@/types/collection";

import ToastMaster from "@/functions/toast-master.function";

import { DialogTrigger, Dialog } from "@/components/ui/dialog";

import AddToPlanningDialog from "./AddToPlanningDialog.component";

export type StockType = { id: string; item: string | null; portions: number };

export const PlanningColumns: ColumnDef<PlanningType>[] = [
  {
    accessorKey: "item_name",
    header: "Item",
    cell: ({ row }) => {
      return <div>{row.original.item_name}</div>;
    },
  },
  {
    accessorKey: "planning_portions",
    header: "Portions",
  },
  {
    accessorKey: "planning_description",
    header: "Description",
  },
  {
    // accessorKey: "planned_date",
    header: "Date",
    cell: ({ row }) => {
      const localDate =
        row.original.planned_date && new Date(row.original.planned_date);

      return (
        <Typography>{localDate && localDate.toLocaleDateString()}</Typography>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const og = row.original;

      const { markPlanningItemInactive } = usePantry();
      const { toast } = useToast();

      const handleConsumed = async () => {
        if (og.planning_id) {
          await markPlanningItemInactive(og.planning_id);
          toast({
            title: ToastMaster("munch"),
            description: `${og.item_name} has been MUNCHED!`,
            variant: "rainbow",
          });
        } else {
          toast({
            title: "Error",
            description: "There was an error consuming you meal",
            variant: "destructive",
          });
        }
      };

      const [dialogOpen] = useState(false);

      return (
        <div className="flex flex-row items-center justify-end">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={handleConsumed}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Check className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>MUNCH!</TooltipContent>
            </Tooltip>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Pencil className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Edit Item</TooltipContent>
                </Tooltip>
              </Button>
            </DialogTrigger>
            <AddToPlanningDialog
              buttonClick={dialogOpen}
              editItemId={og.planning_id ? og.planning_id : undefined}
            />
          </Dialog>
        </div>
      );
    },
  },
];
