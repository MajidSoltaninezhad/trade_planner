import { useState, type ReactNode } from "react";
import { type UserData, UserDataContext } from "./UserDataContext";

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserData[]>([]);

  return (
    <UserDataContext.Provider value={{ users, setUsers }}>
      {children}
    </UserDataContext.Provider>
  );
};
