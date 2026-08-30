// Firestore v9+ Modular SDK - varlik (altin/gumus/doviz nakit) servis katmani.
// Yapisi debtService.js ile birebir ayni desende: sadece kaydin sahibi
// gorup degistirebiliyor (bkz. Firestore guvenlik kurallari).
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "assets";

// Burada bilerek orderBy("createdAt", "desc") kullanmiyoruz: where + orderBy
// birlikte kullanildiginda Firestore ekstra bir "composite index" istiyor
// (debts/transactions'ta bu daha once elle kurulmustu). Kucuk, kisisel
// kullanim icin bu index derdine girmeden ayni sonucu, siralamayi
// istemci tarafinda (asagida) yaparak elde ediyoruz.
export function subscribeToAssets(userId, onData, onError) {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const assets = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      assets.sort((a, b) => {
        const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return bTime - aTime;
      });
      onData(assets);
    },
    onError
  );
}

export function addAsset(userId, asset) {
  return addDoc(collection(db, COLLECTION_NAME), {
    ...asset,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function deleteAsset(assetId) {
  return deleteDoc(doc(db, COLLECTION_NAME, assetId));
}
