import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function DebtList({ debts, onPay, onDelete }) {
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
      <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
        Kayıtlı borç/kredi kartı yok.
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
          <div key={debt.id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{debt.name}</p>
                <p className="text-sm text-gray-500">
                  Kalan: {formatCurrency(debt.remainingAmount)} / {formatCurrency(debt.totalAmount)}
                </p>
              </div>
              <button
                onClick={() => onDelete(debt.id)}
                className="text-xs text-gray-400 hover:text-red-600"
              >
                Sil
              </button>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>

            {debt.remainingAmount > 0 && (
              <div className="mt-3 flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ödeme tutarı"
                  value={paymentInputs[debt.id] || ""}
                  onChange={(e) => handlePaymentChange(debt.id, e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={() => handlePaySubmit(debt)}
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Ödeme Yap
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
