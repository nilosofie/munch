import { supabase } from "@/supabaseClient";

import {
  QwrkHouseholdType,
  PantryInventoryStockType,
  InventoryType,
} from "@/types/collection";

// Inventory Items

// move to transaction
export async function addToItems(
  itemToAdd: string,
  selectedHousehold: QwrkHouseholdType,
  portionsToAdd: number
) {
  const { data, error } = await supabase.rpc("create_pantry_inventory_item", {
    item: itemToAdd,
    household: selectedHousehold.id,
    quantity: portionsToAdd,
  });

  if (error) {
    console.error(error.message);
  } else return data;
}

export async function removeFromItems(itemId: string) {
  const { error } = await supabase
    .from("pantry_inventory_items")
    .update({ is_active: false })
    .eq("id", itemId)
    .select();

  error && console.error(error);
}

// Inventory

// Add portion transaction
export async function addToInventory(id: string, portions: number = 1) {
  const { error } = await supabase
    .from("pantry_inventory_stock")
    .insert([{ inventory_item_id: id, transaction_amount: portions }])
    .select();

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

// fetch stock for household

async function fetchInventoryFromSb(household: QwrkHouseholdType) {
  if (household) {
    const itemsWithStock = await supabase
      .from("pantry_inventory_items")
      .select(`id, item_name,  pantry_inventory_stock (*)`)
      .eq("household_id", household.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    const { data: inventoryItems } = itemsWithStock;

    return inventoryItems ? inventoryItems : [];
  } else return [];
}

// calculate all transactions for stock items

function calculateStock(stockItems: PantryInventoryStockType[]) {
  const retAmount = stockItems.reduce(
    (accumulator, item) => (accumulator += item.transaction_amount),
    0
  );

  return retAmount;
}

export async function fetchInventory(household: QwrkHouseholdType) {
  if (!household) {
    return [];
  } else {
    const rawStock = await fetchInventoryFromSb(household);

    const stockMap: InventoryType = rawStock.map((stockItem) => {
      const stockInventory = calculateStock(stockItem.pantry_inventory_stock);

      return {
        id: stockItem.id,
        item: stockItem.item_name,
        portions: stockInventory,
      };
    });

    return stockMap;
  }
}

export async function fetchAvailableStock(stockItemId: string) {
  const { data, error } = await supabase
    .from("pantry_inventory_items")
    .select(`pantry_inventory_stock (*)`)
    .eq("id", stockItemId);

  if (error) {
    console.error(error.message);
    return null;
  } else {
    return calculateStock(data[0].pantry_inventory_stock);
  }
}

// ------------------------

// planning

export async function addToPlanning(
  id: string,
  description: string = "",
  portions: number = 1
) {
  const { error } = await supabase
    .from("pantry_inventory_planning")
    .insert([
      { inventory_item_id: id, transaction_amount: portions, description },
    ])
    .select();

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

// planning_transaction
// adds vallues to pantry_inventory_planning
// removes stock from pantry_inventory_stock
export async function planningTransaction(
  id: string,
  description: string = "",
  portions: number = 1,
  date: string | null = null
) {
  const { data, error } = await supabase.rpc("planning_transaction_v6", {
    inventory_item_id: id,
    description: description,
    portions,
    date,
  });

  if (error) {
    console.error(error.message);
  } else return data;
}

export async function removeFromPlanning(id: string) {
  const { error } = await supabase
    .from("pantry_inventory_planning")
    .update({ is_active: false })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function fetchPlanningFromSb(household: QwrkHouseholdType) {
  if (household) {
    const { data: planningItemsData } = await supabase
      .from("pantry_inventory_planning_full_view")
      .select("*")
      .eq("household_id", household.id)
      .order("planned_date");

    return planningItemsData ? planningItemsData : [];
  } else return [];
}

export async function fetchPlanning(household: QwrkHouseholdType) {
  if (!household) {
    return [];
  } else {
    const rawPlanning = await fetchPlanningFromSb(household);

    return rawPlanning;
  }
}

export async function generateSuggestion(household: QwrkHouseholdType) {
  const inventory = fetchInventory(household);
  let stockArr: {
    id: string;
    item: string | null;
    available_portions: number;
  }[] = [];

  (await inventory).forEach((invItem) => {
    const { id, item, portions } = invItem;

    for (let i = 0; i < portions; i++) {
      stockArr.push({ id, item, available_portions: portions });
    }
  });

  const rand = Math.floor(Math.random() * stockArr.length);

  return stockArr[rand];
}

export async function fetchPlannedItem(itemId: string) {
  const { data: planningItemData } = await supabase
    .from("pantry_inventory_planning_full_view")
    .select("*")
    .eq("planning_id", itemId);

  return planningItemData ? planningItemData[0] : null;
}
