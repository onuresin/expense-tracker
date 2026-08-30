import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { ASSET_TYPES, getAssetTypeDef } from "../../utils/assetTypes";

export default function AssetForm({ onSubmit }) {
  const { t } = useLanguage();
  const [type, setType] = useState(ASSET_TYPES[0].code);
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white";

  const selectedType = getAssetTypeDef(type);
  const quantityLabel =
    selectedType?.unit === "gram" ? t("assets.quantityLabelGram") : t("assets.quantityLabelUnit");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!type || !quantity || Number(quantity) <= 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ type, quantity: Number(quantity), note: note || "" });
      setQuantity("");
      setNote("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
    >
      <div className="w-48">
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("assets.typeLabel")}
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
          {ASSET_TYPES.map((item) => (
            <option key={item.code} value={item.code}>
              {t(item.labelKey)}
            </option>
          ))}
        </select>
      </div>
      <div className="w-36">
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {quantityLabel}
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="min-w-[150px] flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("assets.noteLabel")}
        </label>
        <input
          type="text"
          placeholder={t("assets.notePlaceholder")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gold-600 disabled:opacity-50"
      >
        {t("assets.addButton")}
      </button>
    </form>
  );
}
