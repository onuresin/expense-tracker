import { formatCurrency, formatDate } from "../../utils/formatCurrency";

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
        Henüz işlem eklenmedi.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            <th className="px-4 py-3">Tarih</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Açıklama</th>
            <th className="px-4 py-3 text-right">Tutar</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(t.date)}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {t.category}
                </span>
                {t.isRecurring && (
                  <span className="ml-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
                    Tekrarlayan
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-500">{t.description || "—"}</td>
              <td
                className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-xs text-gray-400 hover:text-red-600"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
