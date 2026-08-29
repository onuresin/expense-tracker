import { useDebts } from "../hooks/useDebts";
import DebtForm from "../components/debts/DebtForm";
import DebtList from "../components/debts/DebtList";

export default function DebtsPage() {
  const { debts, addDebt, deleteDebt, payDebt } = useDebts();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-navy-950 dark:text-white">Borçlar / Kredi Kartları</h1>
      <DebtForm onSubmit={addDebt} />
      <DebtList debts={debts} onPay={payDebt} onDelete={deleteDebt} />
    </div>
  );
}
