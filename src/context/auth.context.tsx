import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";

import { supabase } from "@/supabaseClient";

import { QwrkHouseholdType } from "@/types/collection";

type CurrentUserType = {
  id: string;
  email: string;
};

type AuthContextType = {
  currentUser: CurrentUserType | null;
  selectedHousehold: QwrkHouseholdType;
  households: QwrkHouseholdType[];
  logout: () => Promise<void>;
  changePassword: (password: string) => Promise<any>;
  createHousehold: (householdName: string) => Promise<void>;
  updateHousehold: (householdName: string) => Promise<any>;
};

// create context

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export

export function useAuth() {
  return useContext(AuthContext);
}

// auth provider

type AuthProviderProps = {
  children: ReactNode; // Define type for children prop
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [authSession, setAuthSession] = useState<any>();
  const [households, setHousholds] = useState<QwrkHouseholdType[]>([]);
  const [selectedHousehold, setSelectedHousehold] = useState<QwrkHouseholdType>(
    {} as QwrkHouseholdType
  );

  const [loading, setLoading] = useState<boolean>(true);

  async function logout(): Promise<void> {
    return await supabase.auth.signOut().then(() => {
      setCurrentUser(null);
    });
  }

  async function changePassword(password: string): Promise<any> {
    return await supabase.auth.updateUser({
      password: password,
    });
  }

  async function fetchHousehold() {
    if (currentUser) {
      await supabase
        .from("qwrk_households")
        .select("*")
        .eq("created_by", currentUser.id)
        .then(({ data }) => data && setHousholds(data));
    }
  }

  async function createHousehold(householdName: string) {
    const { error } = await supabase
      .from("qwrk_households")
      .insert([{ household: householdName }])
      .select();

    error && console.error(error);

    fetchHousehold();
  }

  async function updateHousehold(householdName: string) {
    const { error } = await supabase
      .from("qwrk_households")
      .update({ household: householdName })
      .eq("id", selectedHousehold.id)
      .select();

    error && console.error(error);

    fetchHousehold();

    return { error };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
    });
  }, []);

  useEffect(() => {
    authSession;
    if (authSession) {
      authSession.user;
      setCurrentUser({
        id: authSession.user.id,
        email: authSession.user.email,
      });
    } else setLoading(false);
  }, [authSession]);

  useEffect(() => {
    fetchHousehold();
  }, [currentUser]);

  useEffect(() => {
    if (households) {
      setSelectedHousehold(households[0]);
    }
    // else createHousehold();

    setLoading(false);
  }, [households]);

  const value = {
    currentUser,
    selectedHousehold,
    households,
    logout,
    changePassword,
    createHousehold,
    updateHousehold,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
