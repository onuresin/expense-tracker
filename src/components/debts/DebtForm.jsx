import { useState } from "react";

export default function DebtForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !totalAmount || Number(totalAmount) <= 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ name, totalAmount: Number(totalAmount) });
      setName("");
      setTotalAmount("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
    >
      <div className="min-w-[150px] flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Borç adı
        </label>
        <input
          type="text"
          placeholder="Örn. Kredi Kartı - Bonus"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="w-40">
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Toplam tutar (₺)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gold-600 disabled:opacity-50"
      >
        Borç Ekle
      </button>
    </form>
  );
}
