import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  initialCapital: number;
  targetCapital: number;
  dailyMaxLossAmount: number;
  workingDays: number;
};

export default function HomeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      workingDays: 20,
      targetCapital: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        initial_capital: data.initialCapital,
        target_capital: data.targetCapital,
        daily_max_loss_limit: data.dailyMaxLossAmount,
        working_days_in_month: data.workingDays,
      };

      const response = await fetch(
        "https://trade-planner-hmam.onrender.com/api/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      console.log("API response:", result);

      alert("✅ Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error sending data:", error);
      alert("❌ Error submitting form. Try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 md:p-14 border border-white/20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-indigo-900">
          Trade Planner
        </h2>
        <p className="text-center text-sm md:text-base text-indigo-700/70 mb-8">
          Fill the planner to calculate your targets and limits
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              placeholder="Enter Your First Name"
              className="input input-bordered w-full h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              placeholder="Enter Your Last Name"
              className="input input-bordered w-full h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Initial Capital */}
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">
              Initial Capital
            </label>
            <input
              {...register("initialCapital", {
                valueAsNumber: true,
                required: "Initial Capital is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              placeholder="100"
              className="input input-bordered w-full h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
            />
            {errors.initialCapital && (
              <p className="text-red-500 text-sm mt-1">
                {errors.initialCapital.message}
              </p>
            )}
          </div>

          {/* Target Capital */}
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">
              Target Capital
            </label>
            <input
              {...register("targetCapital", {
                valueAsNumber: true,
                min: { value: 0, message: "Cannot be negative" },
              })}
              type="number"
              placeholder="500"
              className="input input-bordered w-full h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
            />
            {errors.targetCapital && (
              <p className="text-red-500 text-sm mt-1">
                {errors.targetCapital.message}
              </p>
            )}
          </div>

          {/* Risk / Daily Max Loss */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-indigo-800 mb-2">
                Daily Max Loss
              </label>
              <input
                {...register("dailyMaxLossAmount", {
                  valueAsNumber: true,
                  required: "Daily Max Loss is required",
                  min: { value: 0, message: "Cannot be negative" },
                })}
                type="number"
                placeholder="5"
                className="input input-bordered w-full h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
              />
              {errors.dailyMaxLossAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dailyMaxLossAmount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-800 mb-2">
                Working Days In Month
              </label>
              <div className="flex gap-3">
                <input
                  {...register("workingDays", {
                    valueAsNumber: true,
                    required: "Working Days is required",
                    min: { value: 1, message: "Must be at least 1" },
                    max: { value: 22, message: "Cannot exceed 22" },
                  })}
                  type="number"
                  placeholder="20"
                  defaultValue={20}
                  className="input input-bordered flex-1 h-12 px-4 rounded-lg shadow-sm focus:shadow-md focus:outline-none"
                />
              </div>
              {errors.workingDays && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.workingDays.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
