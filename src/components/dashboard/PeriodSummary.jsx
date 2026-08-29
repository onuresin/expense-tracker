import { formatCurrency } from "../../utils/formatCurrency";
import { startOfToday, startOfWeek, startOfMonth, sumByPeriod } from "../../utils/dateHelpers";

export default function PeriodSummary({ transactions }) {
  const periods = [
    { label: "Bugün", start: startOfToday() },
    { label: "Bu Hafta", start: startOfWeek() },
    { label: "Bu Ay", start: startOfMonth() },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {periods.map((period) => {
        const { income, expense } = sumByPeriod(transactions, period.start);
        const net = income - expense;
        return (
          <div
            key={period.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{period.label}</p>
            <p
              className={`mt-1 text-lg font-semibold ${
                net >= 0
                  ? "text-income-light dark:text-income-dark"
                  : "text-expense-light dark:text-expense-dark"
              }`}
            >
              {net >= 0 ? "+" : ""}
              {formatCurrency(net)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Gelir {formatCurrency(income)} · Gider {formatCurrency(expense)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
