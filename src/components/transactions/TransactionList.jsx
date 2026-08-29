import { formatCurrency, formatDate } from "../../utils/formatCurrency";
import { useLanguage } from "../../hooks/useLanguage";

export default function TransactionList({ transactions, onDelete }) {
  const { t, language } = useLanguage();

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm dark:border-navy-800 dark:bg-navy-900 dark:text-slate-400">
        {t("transactions.empty")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500 dark:bg-navy-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">{t("transactions.date")}</th>
            <th className="px-4 py-3">{t("transactions.category")}</th>
            <th className="px-4 py-3">{t("transactions.descriptionColumn")}</th>
            <th className="px-4 py-3 text-right">{t("transactions.amount")}</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
          {transactions.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-300">
                {formatDate(item.date, language)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-navy-800 dark:text-slate-300">
                  {t(`categories.${item.category}`)}
                </span>
                {item.isRecurring && (
                  <span className="ml-1 rounded-full bg-gold-500/10 px-2 py-1 text-xs text-gold-600 dark:text-gold-400">
                    {t("transactions.recurringBadge")}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{item.description || "—"}</td>
              <td
                className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                  item.type === "income"
                    ? "text-income-light dark:text-income-dark"
                    : "text-expense-light dark:text-expense-dark"
                }`}
              >
                {item.type === "income" ? "+" : "-"}
                {formatCurrency(item.amount)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-xs text-slate-400 hover:text-expense-light dark:hover:text-expense-dark"
                >
                  {t("common.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
