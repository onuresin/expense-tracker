import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  addTransaction,
  deleteTransaction,
  subscribeToTransactions,
  updateTransaction,
} from "../services/transactionService";

export function useTransactions() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToTransactions(
      currentUser.uid,
      (data) => {
        setTransactions(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("İşlemler yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  async function handleAdd(transaction) {
    await addTransaction(currentUser.uid, transaction);
  }

  async function handleUpdate(id, updates) {
    await updateTransaction(id, updates);
  }

  async function handleDelete(id) {
    await deleteTransaction(id);
  }

  return {
    transactions,
    loading,
    error,
    addTransaction: handleAdd,
    updateTransaction: handleUpdate,
    deleteTransaction: handleDelete,
  };
}
