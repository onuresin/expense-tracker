import { useAssets } from "../hooks/useAssets";
import AssetForm from "../components/assets/AssetForm";
import AssetList from "../components/assets/AssetList";
import { useLanguage } from "../hooks/useLanguage";

export default function AssetsPage() {
  const { assets, addAsset, deleteAsset } = useAssets();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-navy-950 dark:text-white">{t("assets.pageTitle")}</h1>
      <AssetForm onSubmit={addAsset} />
      <AssetList assets={assets} onDelete={deleteAsset} />
    </div>
  );
}
