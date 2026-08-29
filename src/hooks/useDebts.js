import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useLanguage } from "./useLanguage";
import {
  addDebt,
  deleteDebt,
  payDebt,
  subscribeToDebts,
} from "../services/debtService";
import { addTransaction } from "../services/transactionService";

export function useDebts() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToDebts(
      currentUser.uid,
      (data) => {
        setDebts(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [currentUser]);

  async function handleAddDebt(debt) {
    await addDebt(currentUser.uid, debt);
  }

  async function handleDeleteDebt(id) {
    await deleteDebt(id);
  }

  // Ödeme yapıldığında hem borcun kalan tutarını azaltır
  // hem de bunu bir gider işlemi olarak transactions koleksiyonuna kaydeder.
  // "debtPayment" sabit kategori anahtari - ekranda t("categories.debtPayment")
  // ile secili dile gore gosterilir (bkz. src/utils/categories.js).
  async function handlePayDebt(debt, paymentAmount) {
    await payDebt(debt.id, paymentAmount);
    await addTransaction(currentUser.uid, {
      type: "expense",
      category: "debtPayment",
      amount: paymentAmount,
      description: `${debt.name} - ${t("debts.paymentDescriptionSuffix")}`,
      date: new Date().toISOString().slice(0, 10),
      isRecurring: false,
      debtId: debt.id,
    });
  }

  return {
    debts,
    loading,
    addDebt: handleAddDebt,
    deleteDebt: handleDeleteDebt,
    payDebt: handlePayDebt,
  };
}
