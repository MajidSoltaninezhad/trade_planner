import { createContext, useContext } from "react";

export type UserData = {
  id: number;
  fullName: string;
  monthLevel: string;
  firstOfMonthCap: number;
  profitPerDay: number;
  profitPerDayRate: number;
  profitPerMonth: number;
  profitPerMonthRate: number;
  maxLot: number;
  financialSymbol: string;
  riskManagementPip: number;
  workingDaysInMonth: number;
};

export type UserDataContextType = {
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
};

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error("useUserData must be used within UserDataProvider");
  return context;
};
