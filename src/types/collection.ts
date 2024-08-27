import { Database } from "./supabase";

export type QwrkHouseholdType =
  Database["public"]["Tables"]["qwrk_households"]["Row"];

export type PantryInventoryStockType =
  Database["public"]["Tables"]["pantry_inventory_stock"]["Row"];

export type PantryInventoryItemType =
  Database["public"]["Tables"]["pantry_inventory_items"]["Row"];

export type PantryInventoryPlanningType =
  Database["public"]["Tables"]["pantry_inventory_planning"]["Row"];

export type InventoryType = {
  id: string;
  item: string | null;
  portions: number;
}[];

export type PlanningType = {
  item_id: string | null;
  item_name: string | null;
  planning_id: string | null;
  planning_portions: number | null;
  planning_description: string | null;
  planned_date: string | Date | null;
};
