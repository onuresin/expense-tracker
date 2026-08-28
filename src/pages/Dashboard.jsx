import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransactions";
import { useDebts } from "../hooks/useDebts";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import DebtForm from "../components/debts/DebtForm";
import DebtList from "../components/debts/DebtList";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const {
    transactions,
    loading: transactionsLoading,
    addTransaction,
    deleteTransaction,
  } = useTransactions();
  const { debts, addDebt, deleteDebt, payDebt } = useDebts();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <p className="text-gray-700">
            Hoş geldin, <span className="font-medium">{currentUser.email}</span>
          </p>
          <button
            onClick={logout}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Toplam Gelir</p>
            <p className="mt-1 text-xl font-semibold text-green-600">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Toplam Gider</p>
            <p className="mt-1 text-xl font-semibold text-red-600">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Bakiye</p>
            <p className={`mt-1 text-xl font-semibold ${balance >= 0 ? "text-gray-800" : "text-red-600"}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TransactionForm onSubmit={addTransaction} />
          <div>
            <h2 className="mb-2 text-sm font-semibold text-gray-600">Borçlar / Kredi Kartları</h2>
            <DebtForm onSubmit={addDebt} />
            <div className="mt-3">
              <DebtList debts={debts} onPay={payDebt} onDelete={deleteDebt} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-gray-600">Son İşlemler</h2>
          {transactionsLoading ? (
            <p className="text-sm text-gray-400">Yükleniyor...</p>
          ) : (
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          )}
        </div>
      </div>
    </div>
  );
}
