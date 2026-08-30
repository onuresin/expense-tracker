import { useEffect, useState } from "react";
import { fetchMarketRates, extractRate } from "../../services/marketDataService";
import { useLanguage } from "../../hooks/useLanguage";

export default function MarketWidget() {
  const { t } = useLanguage();
  const [rates, setRates] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMarketRates()
      .then((data) => {
        if (cancelled) return;
        setRates(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setHasError(true);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const usd = rates ? extractRate(rates, ["USD"]) : null;
  const eur = rates ? extractRate(rates, ["EUR"]) : null;
  // "22" = genelpara.com'un altın listesindeki 22 ayar altın kodu (bkz. marketDataService.js notu).
  const gold = rates ? extractRate(rates, ["22"]) : null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <h3 className="mb-4 text-sm font-semibold text-navy-950 dark:text-slate-100">{t("market.title")}</h3>

      {loading && <p className="text-sm text-slate-400">{t("common.loading")}</p>}
      {hasError && <p className="text-sm text-slate-400">{t("market.error")}</p>}

      {!loading && !hasError && (
        <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
          <RateTile label="USD" entry={usd} />
          <RateTile label="EUR" entry={eur} />
          <RateTile label={t("market.goldLabel")} entry={gold} />
        </div>
      )}
    </div>
  );
}

function RateTile({ label, entry }) {
  const value = entry?.satis;
  const change = entry ? Number(entry.degisim) : 0;
  const hasChange = entry && !Number.isNaN(change) && change !== 0;

  return (
    <div className="flex flex-col items-center rounded-md bg-slate-50 p-3 dark:bg-navy-800">
      {/* min-h: etiket bir veya iki satira dusse de (orn. "22 Ayar Gram Altin")
          altindaki fiyat satirlarinin tum kutularda ayni hizada baslamasini saglar. */}
      <p className="flex min-h-[2rem] items-center justify-center text-center text-xs text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-navy-950 dark:text-slate-100">
        {value ? `₺${Number(value).toLocaleString("tr-TR")}` : "—"}
      </p>
      {hasChange && (
        <p
          className={`mt-0.5 text-xs font-medium ${
            change > 0
              ? "text-income-light dark:text-income-dark"
              : "text-expense-light dark:text-expense-dark"
          }`}
        >
          {change > 0 ? "▲" : "▼"} {Math.abs(change).toLocaleString("tr-TR")}
          {entry.oran ? ` (%${Math.abs(Number(entry.oran)).toLocaleString("tr-TR")})` : ""}
        </p>
      )}
    </div>
  );
}
