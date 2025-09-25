import { createContext, useContext } from "react";

export type UserData = {
  user_id: number;
  full_name: string;
  month_level: string;
  first_of_month_cap: number;
  last_of_month_cap: number;
  profit_per_day: number;
  profit_per_day_rate: number;
  profit_per_month: number;
  profit_per_month_rate: number;
  max_lot: number | null;
  financial_symbol: string | null;
  risk_management_pip: number | null;
  working_days_in_month: number;
};

export type UserDataContextType = {
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error("useUserData must be used within UserDataProvider");
  return context;
};
