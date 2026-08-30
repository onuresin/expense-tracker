import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildMonthlyTrend } from "../../utils/dateHelpers";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";

const RANGE_OPTIONS = [3, 6, 12];

export default function TrendChart({ transactions }) {
  const [months, setMonths] = useState(6);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const { formatAmount } = useCurrency();
  const data = useMemo(
    () => buildMonthlyTrend(transactions, months, language),
    [transactions, months, language]
  );

  const incomeColor = theme === "dark" ? "#3987e5" : "#2a78d6";
  const expenseColor = theme === "dark" ? "#e66767" : "#e34948";
  const gridColor = theme === "dark" ? "#26374F" : "#e5e7eb";
  const textColor = theme === "dark" ? "#A8B3C7" : "#5B6472";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-navy-950 dark:text-slate-100">
          {t("dashboard.trendTitle")}
        </h3>
        <div className="flex gap-1">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setMonths(option)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                months === option
                  ? "bg-gold-500 text-navy-950"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300"
              }`}
            >
              {t("dashboard.monthRangeLabel").replace("{n}", option)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
          />
          <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            formatter={(value) => formatAmount(value)}
            contentStyle={{
              background: theme === "dark" ? "#111A2E" : "#ffffff",
              border: `1px solid ${gridColor}`,
              borderRadius: 8,
              color: theme === "dark" ? "#F5F5F4" : "#0B1220",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: textColor }} />
          <Bar dataKey="income" name={t("dashboard.incomeShort")} fill={incomeColor} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name={t("dashboard.expenseShort")} fill={expenseColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
