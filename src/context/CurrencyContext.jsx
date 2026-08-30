import { useEffect, useMemo, useState } from "react";
import { CurrencyContext } from "./currency-context";
import { useLanguage } from "../hooks/useLanguage";
import { fetchMarketRates, extractRate } from "../services/marketDataService";

const STORAGE_KEY = "expense-tracker-currency";

// Uygulamadaki TUM veriler (islemler, borclar) her zaman TL cinsinden
// Firestore'a kaydediliyor - bu "taban para birimi". Burada yapilan sey
// gercek bir cok-para-birimli sistem degil; sadece EKRANDA gosterim icin
// TL tutarlarini secilen para birimine CEVIRIYORUZ (genelpara.com'un anlik
// kurlarini kullanarak). Yani "100 TL'lik bir gider" veritabaninda hep
// 100 TL olarak kalir, sadece kullanici USD secince ekranda "~$3.05" gibi
// gorunur. Bu, Upwork gibi yabanci bir kitleye sunum yaparken pratik bir
// cozum - gercek bir musteri projesinde farkli para birimlerinde islem
// girisi istenirse mimari o zaman genisletilir.
const CANDIDATE_CURRENCIES = ["USD", "EUR", "GBP", "CHF"];

function getStoredCurrency() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored || "TRY";
}

export function CurrencyProvider({ children }) {
  const { language } = useLanguage();
  const [preferredCurrency, setPreferredCurrency] = useState(getStoredCurrency);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, preferredCurrency);
  }, [preferredCurrency]);

  // Kurlar yuklenene kadar (veya cekilemezse) sadece TL sunuyoruz - boylece
  // hicbir zaman kursuz/yanlis bir cevirim gostermeyiz.
  const availableCurrencies = useMemo(() => {
    if (!rates) return ["TRY"];
    const supported = CANDIDATE_CURRENCIES.filter((code) => extractRate(rates, [code])?.satis);
    return ["TRY", ...supported];
  }, [rates]);

  // Daha once secilmis para birimi bu oturumda (kur cekilemedigi ya da
  // listede olmadigi icin) gecerli degilse, state'i zorla degistirmek
  // yerine sadece GORUNTULEME icin guvenli sekilde TL'ye dusuyoruz. Kullanici
  // tekrar bir para birimi secene kadar tercihi (preferredCurrency) oldugu
  // gibi saklaniyor.
  const currency = availableCurrencies.includes(preferredCurrency) ? preferredCurrency : "TRY";

  // Kullanici acilir listeden dogrudan bir para birimi seciyor. Listede
  // olmayan bir kod gelirse (olmamasi gerekir ama savunma amacli) yok sayilir.
  function selectCurrency(code) {
    if (availableCurrencies.includes(code)) {
      setPreferredCurrency(code);
    }
  }

  // TL cinsinden bir tutari secili para birimine cevirip Intl ile bicimlendirir.
  function formatAmount(amountInTry) {
    const safeAmount = amountInTry || 0;
    const locale = language === "en" ? "en-US" : "tr-TR";

    if (currency === "TRY") {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
      }).format(safeAmount);
    }

    const rate = extractRate(rates, [currency])?.satis;
    if (!rate) {
      // Kur bir sekilde yoksa (ag hatasi vs.) yanlis deger gostermek yerine
      // guvenli sekilde TL'ye don.
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
      }).format(safeAmount);
    }

    const converted = safeAmount / Number(rate);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(converted);
  }

  // formatAmount'in tersi: kullanicinin SECILI PARA BIRIMINDE girdigi bir
  // tutari (orn. EUR secilesken formda "100" yazmasi) TL'ye cevirir - boylece
  // Firestore'da her zaman TL saklama kuralini bozmadan, kullanici istedigi
  // gibi hangi para biriminde goruyorsa o birimde veri girebiliyor. Kur o an
  // alinamiyorsa (guvenli varsayilan) girilen sayiyi degistirmeden TL kabul
  // ediyoruz - ayni formatAmount'taki fallback mantigi.
  function convertToTRY(amountInSelectedCurrency) {
    const safeAmount = amountInSelectedCurrency || 0;
    if (currency === "TRY") return safeAmount;
    const rate = extractRate(rates, [currency])?.satis;
    if (!rate) return safeAmount;
    return safeAmount * Number(rate);
  }

  const value = {
    currency,
    availableCurrencies,
    selectCurrency,
    formatAmount,
    convertToTRY,
    // Ham kur verisi - AssetList gibi TL disinda bir "birim fiyati" (orn.
    // gram altin) hesaplamasi gereken yerler icin de disari aciyoruz, boylece
    // ikinci bir genelpara.com cagrisi yapmalarina gerek kalmiyor.
    rates,
    ratesLoading: loading,
    ratesError: hasError,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
