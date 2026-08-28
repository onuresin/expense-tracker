// Firestore v9+ Modular SDK - borç/kredi kartı servis katmanı
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "debts";

export function subscribeToDebts(userId, onData, onError) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const debts = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      onData(debts);
    },
    onError
  );
}

export function addDebt(userId, debt) {
  return addDoc(collection(db, COLLECTION_NAME), {
    ...debt,
    remainingAmount: debt.totalAmount,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function deleteDebt(debtId) {
  return deleteDoc(doc(db, COLLECTION_NAME, debtId));
}

// increment() Firestore'un atomik sayaç işlemi - aynı anda iki ödeme yapılsa bile
// kalan tutar yarış durumuna (race condition) girmeden doğru azalır.
export function payDebt(debtId, paymentAmount) {
  return updateDoc(doc(db, COLLECTION_NAME, debtId), {
    remainingAmount: increment(-paymentAmount),
  });
}
