import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";

import { supabase } from "@/supabaseClient";

import { useAuth } from "./auth.context";

type CreditContextType = {
  freeCredits: number;
  paidCredits: number;
  addCredits: (amount: number) => Promise<void>;
  consumeCredit: (
    actionSuccess?: any,
    actionFail?: any,
    amount?: number
  ) => Promise<void>;
};

// create context

const CreditContext = createContext<CreditContextType>({} as CreditContextType);

// export

export function useCredit() {
  return useContext(CreditContext);
}

// auth provider

type CreditProviderProps = {
  children: ReactNode; // Define type for children prop
};

export function CreditProvider({ children }: CreditProviderProps) {
  const { selectedHousehold, currentUser } = useAuth();

  const [freeCredits, setFreeCredits] = useState(0);
  const [paidCredits, setPaidCredits] = useState(0);

  const addCredits = async (amount: number) => {
    const { error } = await supabase
      .from("qwrk_credits")
      .insert([{ transaction: amount, household_id: selectedHousehold.id }])
      .select();

    if (error) console.error(error.message);

    await fetchFreeCredits();
    await fetchPaidCredits();
  };

  const consumeCredit = async (
    actionSuccess: any = () => {},
    actionFail: any = () => {},
    amount = 1
  ) => {
    if (amount <= freeCredits || amount <= paidCredits) {
      const { error } = await supabase
        .from("qwrk_credits")
        .insert([
          {
            transaction: -amount,
            household_id: selectedHousehold.id,
            is_free: freeCredits < 1 ? false : true,
          },
        ])
        .select();

      if (error) console.error(error.message);
      await fetchFreeCredits();
      await fetchPaidCredits();
      actionSuccess();
    } else actionFail();
  };

  const fetchFreeCredits = async () => {
    const monthlyFreeCredits = 15;

    if (selectedHousehold) {
      const { data: qwrk_credits, error } = await supabase
        .from("qwrk_monthly_free_credits")
        .select("*")
        .eq("household_id", selectedHousehold.id);

      if (error) console.error(error.message);

      const calculateCredit = qwrk_credits?.reduce((acc, item) => {
        if (item.transaction) {
          return (acc += item.transaction);
        } else return acc;
      }, monthlyFreeCredits);

      setFreeCredits(calculateCredit ? calculateCredit : 0);
    }
  };

  const fetchPaidCredits = async () => {
    if (currentUser) {
      const { data: qwrk_credits, error } = await supabase
        .from("qwrk_paid_credits")
        .select("*")
        .eq("user", currentUser?.id);

      if (error) {
        console.error(error.message);
      }

      const calculateCredit = qwrk_credits?.reduce((acc, item) => {
        if (item.transaction) {
          return (acc += item.transaction);
        } else return acc;
      }, 0);
      setPaidCredits(calculateCredit ? calculateCredit : 0);
    }
  };

  useEffect(() => {
    fetchFreeCredits();
    fetchPaidCredits();
  }, [currentUser, selectedHousehold]);

  const value = {
    freeCredits,
    paidCredits,
    addCredits,
    consumeCredit,
  };

  return (
    <CreditContext.Provider value={value}>{children}</CreditContext.Provider>
  );
}
