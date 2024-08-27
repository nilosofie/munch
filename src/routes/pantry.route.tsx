import Inventory from "@/pages/pantry/inventory/InventoryTable.page";
import Planning from "@/pages/pantry/planning/PlanningTable.page";

import Household from "@/pages/pantry/household/household.page";

import { PantryProvider } from "@/pages/pantry/pantry.context";
import { useAuth } from "@/context/auth.context";

import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";

function Pantry() {
  const { households, selectedHousehold } = useAuth();

  return (
    <PantryProvider>
      <div>
        {households[0] ? (
          <div>
            <div className="flex justify-center sm:justify-start sm:mx-2 md:mx-10">
              <Typography variant="h2">{`${selectedHousehold?.household} household`}</Typography>
            </div>
            <Planning />
            <Separator />
            <Inventory />
          </div>
        ) : (
          <Household />
        )}
      </div>
    </PantryProvider>
  );
}

export default Pantry;
