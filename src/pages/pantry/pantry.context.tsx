import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/context/auth.context";

import {
  addToInventory,
  addToItems,
  fetchInventory,
  fetchPlanning,
  planningTransaction,
  removeFromItems,
  removeFromPlanning,
} from "./sbFunctions.pantry";

import { InventoryType, PlanningType } from "@/types/collection";

type PantryContextType = {
  inventory: InventoryType;
  addPortionsToInventory: (id: string, amount?: number) => Promise<void>;
  planning: PlanningType[];
  addPortionsToPlanning: (
    id: string,
    description?: string,
    amount?: number,
    planned_date?: string | null
  ) => Promise<void>;
  markPlanningItemInactive: (id: string) => Promise<void>;
  addInventoryType: (itemName: string, itemCount?: number) => Promise<void>;
  removeInventoryType: (itemId: string) => Promise<void>;
  totalItemsInInventory: number;
  pantryLoading: boolean;
};

// inventory
// fetchStock
// addStock

// create context

const PantryContext = createContext<PantryContextType>({} as PantryContextType);

// export

// eslint-disable-next-line react-refresh/only-export-components
export function usePantry() {
  return useContext(PantryContext);
}

// auth provider

type PantryProviderProps = {
  children: ReactNode; // Define type for children prop
};

export function PantryProvider({ children }: PantryProviderProps) {
  const { selectedHousehold } = useAuth();

  const [inventory, setInventory] = useState<InventoryType>([]);
  const [planning, setPlanning] = useState<PlanningType[]>([]);
  const [totalItemsInInventory, setTotalItemsInInventory] = useState(0);
  const [pantryLoading, setPantryLoading] = useState<boolean>(false);

  const addInventoryType = async (itemName: string, itemCount: number = 0) => {
    await addToItems(itemName, selectedHousehold, itemCount).then(async () => {
      await updateInventory();
    });
  };

  const removeInventoryType = async (itemId: string) => {
    removeFromItems(itemId).then(async () => {
      await updateInventory();
      await updatePlanning();
    });
  };

  const clearInventory = () => setInventory([]);

  const updateInventory = async () => {
    setPantryLoading(true);
    clearInventory();
    const stockMap = await fetchInventory(selectedHousehold);

    const amount = stockMap.reduce((acc, item) => (acc += item.portions), 0);

    setTotalItemsInInventory(amount);

    setInventory(stockMap);
    setPantryLoading(false);
  };

  const addPortionsToInventory = async (id: string, amount: number = 1) => {
    await addToInventory(id, amount);
    await updateInventory();
    await updatePlanning();
  };

  const clearPlanning = () => setPlanning([]);

  const updatePlanning = async () => {
    setPantryLoading(true);
    clearPlanning();
    const planningMap = await fetchPlanning(selectedHousehold);

    setPlanning(planningMap);
    setPantryLoading(false);
  };

  const addPortionsToPlanning = async (
    id: string,
    description: string = "",
    amount: number = 1,
    planned_date: string | null = null
  ) => {
    await planningTransaction(id, description, amount, planned_date);
    await updateInventory();
    await updatePlanning();
  };

  const markPlanningItemInactive = async (id: string) => {
    await removeFromPlanning(id);
    await updateInventory();
    await updatePlanning();
  };

  useEffect(() => {
    updateInventory();
    updatePlanning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHousehold]);

  const value = {
    inventory,
    addPortionsToInventory,
    planning,
    addPortionsToPlanning,
    markPlanningItemInactive,
    addInventoryType,
    removeInventoryType,
    totalItemsInInventory,
    pantryLoading,
  };

  return (
    <PantryContext.Provider value={value}>
      {/* {loading ? null : children} */}
      {children}
    </PantryContext.Provider>
  );
}
