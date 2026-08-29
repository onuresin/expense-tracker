import { useTransactions } from "../hooks/useTransactions";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";

export default function TransactionsPage() {
  const { transactions, loading, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-navy-950 dark:text-white">İşlemler</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TransactionForm onSubmit={addTransaction} />
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Tüm İşlemler</h2>
          {loading ? (
            <p className="text-sm text-slate-400">Yükleniyor...</p>
          ) : (
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          )}
        </div>
      </div>
    </div>
  );
}
