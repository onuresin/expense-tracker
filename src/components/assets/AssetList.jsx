import { useLanguage } from "../../hooks/useLanguage";
import { useCurrency } from "../../hooks/useCurrency";
import { extractRate } from "../../services/marketDataService";
import { getAssetTypeDef } from "../../utils/assetTypes";

export default function AssetList({ assets, onDelete }) {
  const { t } = useLanguage();
  const { formatAmount, rates } = useCurrency();

  if (assets.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm dark:border-navy-800 dark:bg-navy-900 dark:text-slate-400">
        {t("assets.empty")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {assets.map((asset) => {
        const typeDef = getAssetTypeDef(asset.type);
        // Kur bilgisi bir sekilde gelmemisse (henuz yuklenmedi ya da agdan
        // cekilemedi) yanlis/sifir bir deger gostermek yerine acikca
        // "kur alinamadi" diyoruz - DebtList'teki gibi burada da veri
        // eksikse kullaniciyi yanlis bilgiyle yaniltmiyoruz.
        const unitRate = Number(extractRate(rates, [asset.type])?.satis) || null;
        const currentValue = unitRate ? asset.quantity * unitRate : null;
        const quantityUnitLabel =
          typeDef?.unit === "gram" ? t("assets.gramSuffix") : t("assets.unitSuffix");

        return (
          <div
            key={asset.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
          >
            <div>
              <p className="font-medium text-navy-950 dark:text-white">
                {typeDef ? t(typeDef.labelKey) : asset.type}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {asset.quantity} {quantityUnitLabel}
                {asset.note ? ` · ${asset.note}` : ""}
              </p>
              <p className="mt-1 text-sm font-semibold text-gold-600 dark:text-gold-400">
                {currentValue !== null ? formatAmount(currentValue) : t("assets.rateUnavailable")}
              </p>
            </div>
            <button
              onClick={() => onDelete(asset.id)}
              className="text-xs text-slate-400 hover:text-expense-light dark:hover:text-expense-dark"
            >
              {t("common.delete")}
            </button>
          </div>
        );
      })}
    </div>
  );
}
