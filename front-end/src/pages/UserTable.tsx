import { useEffect, useState } from "react";
import { useUserData, type UserData } from "../context/UserDataContext";

export default function UserTable() {
  const { users, setUsers } = useUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // فرض بر این که آخرین userID برای گرفتن داده‌ها استفاده میشه
        const lastUser = users[users.length - 1];
        if (!lastUser) return;

        const res = await fetch(
          `https://trade-planner-hmam.onrender.com/api/tradePlane/${lastUser.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch calculated data");
        const data: UserData[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, users]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!users.length)
    return <p className="text-white text-center">No user data</p>;

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        User Data Table
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="table-auto w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Month Level</th>
              <th className="px-4 py-2">First of Month Cap</th>
              <th className="px-4 py-2">Profit/Day</th>
              <th className="px-4 py-2">Profit/Day Rate</th>
              <th className="px-4 py-2">Profit/Month</th>
              <th className="px-4 py-2">Profit/Month Rate</th>
              <th className="px-4 py-2">Max Lot</th>
              <th className="px-4 py-2">Financial Symbol</th>
              <th className="px-4 py-2">Risk Management Pip</th>
              <th className="px-4 py-2">Working Days</th>
              <th className="px-4 py-2">User ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-indigo-50">
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.monthLevel}</td>
                <td className="px-4 py-2">{user.firstOfMonthCap}</td>
                <td className="px-4 py-2">{user.profitPerDay}</td>
                <td className="px-4 py-2">{user.profitPerDayRate}%</td>
                <td className="px-4 py-2">{user.profitPerMonth}</td>
                <td className="px-4 py-2">{user.profitPerMonthRate}%</td>
                <td className="px-4 py-2">{user.maxLot}</td>
                <td className="px-4 py-2">{user.financialSymbol}</td>
                <td className="px-4 py-2">{user.riskManagementPip}</td>
                <td className="px-4 py-2">{user.workingDaysInMonth}</td>
                <td className="px-4 py-2">{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
