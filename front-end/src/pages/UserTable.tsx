type UserData = {
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

const mockData: UserData[] = [
  {
    id: 1,
    fullName: "John Doe",
    monthLevel: "Beginner",
    firstOfMonthCap: 1000,
    profitPerDay: 50,
    profitPerDayRate: 5,
    profitPerMonth: 1000,
    profitPerMonthRate: 10,
    maxLot: 2,
    financialSymbol: "EUR/USD",
    riskManagementPip: 30,
    workingDaysInMonth: 20,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    monthLevel: "Intermediate",
    firstOfMonthCap: 2000,
    profitPerDay: 120,
    profitPerDayRate: 6,
    profitPerMonth: 2400,
    profitPerMonthRate: 12,
    maxLot: 3,
    financialSymbol: "GBP/USD",
    riskManagementPip: 25,
    workingDaysInMonth: 22,
  },
];

export default function UserTable() {
  return (
    <div className="p-6">
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
            {mockData.map((user) => (
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
