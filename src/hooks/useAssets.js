import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { addAsset, deleteAsset, subscribeToAssets } from "../services/assetService";

export function useAssets() {
  const { currentUser } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToAssets(
      currentUser.uid,
      (data) => {
        setAssets(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [currentUser]);

  async function handleAddAsset(asset) {
    await addAsset(currentUser.uid, asset);
  }

  async function handleDeleteAsset(id) {
    await deleteAsset(id);
  }

  return {
    assets,
    loading,
    addAsset: handleAddAsset,
    deleteAsset: handleDeleteAsset,
  };
}
