import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { EXPENSE_CATEGORIES } from "../../utils/categories";
import { getCategoryColorMap } from "../../utils/chartColors";
import { buildCategoryBreakdown, startOfMonth } from "../../utils/dateHelpers";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

export default function CategoryBreakdownChart({ transactions }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const data = useMemo(() => buildCategoryBreakdown(transactions, startOfMonth()), [transactions]);
  const colorMap = useMemo(() => getCategoryColorMap(EXPENSE_CATEGORIES, theme), [theme]);

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-400 shadow-sm dark:border-navy-800 dark:bg-navy-900">
        {t("dashboard.noExpenseThisMonth")}
      </div>
    );
  }

  // Pie/Legend/Tooltip icin gorunen ismi (categoryLabel) secili dile cevirip
  // ekliyoruz; renk anahtari (Cell fill) hala sabit kategori kodunu kullaniyor.
  const localizedData = data.map((entry) => ({
    ...entry,
    categoryLabel: t(`categories.${entry.category}`),
  }));

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <h3 className="mb-4 text-sm font-semibold text-navy-950 dark:text-slate-100">
        {t("dashboard.categoryBreakdownTitle")}
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={localizedData}
            dataKey="value"
            nameKey="categoryLabel"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
          >
            {localizedData.map((entry) => (
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
