import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { EXPENSE_CATEGORIES } from "../../utils/categories";
import { getCategoryColorMap } from "../../utils/chartColors";
import { buildCategoryBreakdown, startOfMonth } from "../../utils/dateHelpers";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../hooks/useTheme";

export default function CategoryBreakdownChart({ transactions }) {
  const { theme } = useTheme();
  const data = useMemo(() => buildCategoryBreakdown(transactions, startOfMonth()), [transactions]);
  const colorMap = useMemo(() => getCategoryColorMap(EXPENSE_CATEGORIES, theme), [theme]);

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-400 shadow-sm dark:border-navy-800 dark:bg-navy-900">
        Bu ay için gider kaydı yok.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <h3 className="mb-4 text-sm font-semibold text-navy-950 dark:text-slate-100">
        Bu Ay Kategori Dağılımı
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" innerRadius={60} outerRadius={95} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={colorMap[entry.category] || "#94A3B8"} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
