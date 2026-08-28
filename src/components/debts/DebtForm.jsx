import { useState } from "react";

export default function DebtForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-lg bg-white p-4 shadow-sm">
      <div className="min-w-[150px] flex-1">
        <label className="mb-1 block text-sm font-medium text-gray-700">Borç adı</label>
        <input
          type="text"
          placeholder="Örn. Kredi Kartı - Bonus"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="w-40">
        <label className="mb-1 block text-sm font-medium text-gray-700">Toplam tutar (₺)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
      >
        Borç Ekle
      </button>
    </form>
  );
}
