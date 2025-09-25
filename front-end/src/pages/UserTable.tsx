import { useUserData } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";

// ✨ تابع کمکی برای فرمت عدد
const formatNumber = (
  value: number | null | undefined,
  withPercent = false
) => {
  if (value === null || value === undefined)
    return <span className="text-gray-400 italic">-</span>;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return withPercent ? `${formatted}%` : formatted;
};

export default function UserTable() {
  const { users } = useUserData();
  const navigate = useNavigate();

  if (!users.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-center text-xl font-semibold bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-200">
          No user data
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* 📌 دکمه برگشت به فرم */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            ← Back to Form
          </button>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 drop-shadow-lg">
          User Data Table
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-gray-200">
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
                  key={user.user_id}
                  className="border-b last:border-none hover:bg-indigo-100/40 transition-colors"
                >
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.full_name || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.month_level || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {formatNumber(user.first_of_month_cap)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {formatNumber(user.profit_per_day)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {formatNumber(user.profit_per_day_rate, true)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {formatNumber(user.profit_per_month)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {formatNumber(user.profit_per_month_rate, true)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {formatNumber(user.max_lot)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {user.financial_symbol || (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell">
                    {formatNumber(user.risk_management_pip)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {formatNumber(user.working_days_in_month)}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3">{user.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
