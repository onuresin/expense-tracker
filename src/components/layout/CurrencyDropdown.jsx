import { useEffect, useRef, useState } from "react";
import { useCurrency } from "../../hooks/useCurrency";
import { useLanguage } from "../../hooks/useLanguage";

// Sidebar (masaustu) ve MobileHeader (mobil) menusunde ayni sekilde
// kullanilan, kendi acik/kapali durumunu yoneten para birimi secici.
// Onceden tek tikla siradaki para birimine "cycle" eden bir butondu; kac
// para birimi destekleniyorsa (genelpara.com'dan gelen kur sayisina gore
// 2-5 arasi degisebiliyor) o kadar tikla gezmek pratik degildi. Simdi
// tiklaninca acilan bir liste sunuyor, istenen doğrudan secilebiliyor.
export default function CurrencyDropdown() {
  const { currency, availableCurrencies, selectCurrency } = useCurrency();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("sidebar.currencyLabel")}
        className="flex w-full items-center justify-between rounded-md bg-navy-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:text-white"
      >
        <span>{t("sidebar.currencyLabel")}</span>
        <span className="flex items-center gap-1 font-semibold">
          {currency}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-3 w-3 stroke-current transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M5 7.5L10 12.5L15 7.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Sadece 1'den fazla secenek varsa (kurlar yuklenmeden TRY tek basina
          gelir) listeyi acmaya deger - o yuzden availableCurrencies.length
          1 iken de buton gorunur ama acildiginda tek satir "TRY" gosterir,
          kafa karistirmaz. */}
      {open && (
        <div className="mt-1 space-y-0.5 rounded-md bg-navy-900 p-1">
          {availableCurrencies.map((code) => (
            <button
              key={code}
              onClick={() => {
                selectCurrency(code);
                setOpen(false);
              }}
              className={`block w-full rounded px-2 py-1.5 text-left text-xs font-medium transition ${
                code === currency
                  ? "bg-navy-800 text-gold-400"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
