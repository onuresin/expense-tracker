// Firestore v9+ Modular SDK - işlem (gelir/gider) servis katmanı
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "transactions";

// Kullanıcının işlemlerini gerçek zamanlı dinler (Firestore verisi değiştikçe otomatik günceller)
export function subscribeToTransactions(userId, onData, onError) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const transactions = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      onData(transactions);
    },
    onError
  );
}

export function addTransaction(userId, transaction) {
  return addDoc(collection(db, COLLECTION_NAME), {
    ...transaction,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function updateTransaction(transactionId, updates) {
  return updateDoc(doc(db, COLLECTION_NAME, transactionId), updates);
}

export function deleteTransaction(transactionId) {
  return deleteDoc(doc(db, COLLECTION_NAME, transactionId));
}
