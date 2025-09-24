import { useUserData } from "../context/UserDataContext";

export default function UserTable() {
  const { users } = useUserData();

  if (!users.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-white text-center text-xl font-semibold bg-white/10 px-8 py-6 rounded-2xl shadow-xl">
          No user data
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-cyan-950 drop-shadow-lg">
          User Data Table
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-white/30">
          <table className="min-w-full text-xs md:text-base text-left border-collapse">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Full Name
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Month Level
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold hidden md:table-cell">
                  First of Month Cap
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Profit/Day
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold hidden md:table-cell">
                  Profit/Day Rate
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Profit/Month
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold hidden md:table-cell">
                  Profit/Month Rate
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold hidden md:table-cell">
                  Max Lot
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Financial Symbol
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold hidden md:table-cell">
                  Risk Management Pip
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  Working Days
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 font-semibold">
                  User ID
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none hover:bg-indigo-100/40 transition-colors"
                >
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.fullName || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.monthLevel || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {user.firstOfMonthCap ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.profitPerDay ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {user.profitPerDayRate !== undefined ? (
                      `${user.profitPerDayRate}%`
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.profitPerMonth ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {user.profitPerMonthRate !== undefined ? (
                      `${user.profitPerMonthRate}%`
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {user.maxLot ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.financialSymbol || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {user.riskManagementPip ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.workingDaysInMonth ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
