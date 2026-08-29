import { useEffect, useState } from "react";
import { fetchMarketRates, extractRate } from "../../services/marketDataService";

export default function MarketWidget() {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMarketRates()
      .then((data) => {
        if (cancelled) return;
        // İlk entegrasyonda gerçek alan adlarını doğrulamak için ham veriyi basıyoruz.
        console.log("[MarketWidget] ham veri:", data);
        setRates(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Döviz/altın verisi şu an alınamıyor.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const usd = rates ? extractRate(rates, ["USD"]) : null;
  const eur = rates ? extractRate(rates, ["EUR"]) : null;
  const gold = rates ? extractRate(rates, ["GRA", "gram-altin", "GRAM_ALTIN", "ALTIN"]) : null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-navy-800 dark:bg-navy-900">
      <h3 className="mb-4 text-sm font-semibold text-navy-950 dark:text-slate-100">Güncel Piyasa (₺)</h3>

      {loading && <p className="text-sm text-slate-400">Yükleniyor...</p>}
      {error && <p className="text-sm text-slate-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-3 gap-3 text-center">
          <RateTile label="USD" value={usd?.satis} />
          <RateTile label="EUR" value={eur?.satis} />
          <RateTile label="Gram Altın" value={gold?.satis} />
        </div>
      )}
    </div>
  );
}

function RateTile({ label, value }) {
  return (
    <div className="rounded-md bg-slate-50 p-3 dark:bg-navy-800">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy-950 dark:text-slate-100">
        {value ? `₺${Number(value).toLocaleString("tr-TR")}` : "—"}
      </p>
    </div>
  );
}
