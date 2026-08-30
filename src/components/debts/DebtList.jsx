import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";

export default function DebtList({ debts, onPay, onDelete }) {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const [paymentInputs, setPaymentInputs] = useState({});

  function handlePaymentChange(debtId, value) {
    setPaymentInputs((prev) => ({ ...prev, [debtId]: value }));
  }

  async function handlePaySubmit(debt) {
    const amount = Number(paymentInputs[debt.id]);
    if (!amount || amount <= 0) return;
    await onPay(debt, amount);
    setPaymentInputs((prev) => ({ ...prev, [debt.id]: "" }));
  }

  if (debts.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm dark:border-navy-800 dark:bg-navy-900 dark:text-slate-400">
        {t("debts.empty")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {debts.map((debt) => {
        const progress = debt.totalAmount
          ? Math.min(100, ((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100)
          : 0;
        return (
          <div
            key={debt.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-950 dark:text-white">{debt.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("debts.remainingLabel")}: {formatAmount(debt.remainingAmount)} / {formatAmount(debt.totalAmount)}
                </p>
              </div>
              <button
                onClick={() => onDelete(debt.id)}
                className="text-xs text-slate-400 hover:text-expense-light dark:hover:text-expense-dark"
              >
                {t("common.delete")}
              </button>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-800">
              <div className="h-full bg-gold-500 transition-all" style={{ width: `${progress}%` }} />
            </div>

            {debt.remainingAmount > 0 && (
              <div className="mt-3 flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={t("debts.paymentPlaceholder")}
                  value={paymentInputs[debt.id] || ""}
                  onChange={(e) => handlePaymentChange(debt.id, e.target.value)}
                  className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-navy-950 focus:border-gold-500 focus:outline-none dark:border-navy-700 dark:bg-navy-800 dark:text-white"
                />
                <button
                  onClick={() => handlePaySubmit(debt)}
                  className="rounded-md bg-income-light px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 dark:bg-income-dark dark:text-navy-950"
                >
                  {t("debts.payButton")}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
