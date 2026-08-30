import { useState } from "react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  RECURRING_FREQUENCIES,
} from "../../utils/categories";
import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";

export default function TransactionForm({ onSubmit }) {
  const { t } = useLanguage();
  const { currency, convertToTRY } = useCurrency();
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("monthly");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(newType === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        type,
        category,
        // Kullanici tutari secili para biriminde giriyor (formdaki etiket ve
        // yardimci metin de bunu gosteriyor); TL'ye cevirip oyle kaydediyoruz
        // - boylece uygulamanin geri kalani (raporlar, toplam bakiye) hep TL
        // uzerinden calismaya devam ediyor.
        amount: convertToTRY(Number(amount)),
        description,
        date,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
      });
      setAmount("");
      setDescription("");
      setIsRecurring(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            type === "income"
              ? "bg-income-light text-white dark:bg-income-dark dark:text-navy-950"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300"
          }`}
        >
          {t("transactions.income")}
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            type === "expense"
              ? "bg-expense-light text-white dark:bg-expense-dark dark:text-navy-950"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300"
          }`}
        >
          {t("transactions.expense")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            {t("transactions.amount")} ({currency})
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t("transactions.date")}</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("transactions.category")}</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {t(`categories.${c}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t("transactions.description")}</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="checkbox"
          id="isRecurring"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
        />
        <label htmlFor="isRecurring" className="text-sm text-slate-700 dark:text-slate-300">
          {t("transactions.recurringCheckbox")}
        </label>
        {isRecurring && (
          <select
            value={recurringFrequency}
            onChange={(e) => setRecurringFrequency(e.target.value)}
            className="ml-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-navy-950 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
          >
            {RECURRING_FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {t(f.labelKey)}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-gold-500 py-2 font-medium text-navy-950 transition hover:bg-gold-600 disabled:opacity-50"
      >
        {isSubmitting ? t("transactions.adding") : t("transactions.addButton")}
      </button>
    </form>
  );
}
