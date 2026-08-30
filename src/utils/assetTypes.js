// Desteklenen varlik turleri ve bunlarin genelpara.com "altin"/"doviz"
// listelerindeki karsilik gelen kod adlari (rateCode). Bu kodlar
// marketDataService.js'in extractRate() yardimcisiyla dogrudan kullanilir.
//
// "GA" ve "GAG" kodlari genelpara.com'un altin listesinden dogrulandi:
// GA = Gram Altin (has/24 ayar, TL bazinda), GAG = Gram Gumus (TL bazinda).
// USD/EUR/GBP/CHF ise zaten CurrencyContext'in kullandigi doviz listesinden
// geliyor - ayni kur verisi burada da tekrar kullaniliyor.
export const ASSET_TYPES = [
  { code: "GA", unit: "gram", labelKey: "assets.types.GA" },
  { code: "GAG", unit: "gram", labelKey: "assets.types.GAG" },
  { code: "USD", unit: "unit", labelKey: "assets.types.USD" },
  { code: "EUR", unit: "unit", labelKey: "assets.types.EUR" },
  { code: "GBP", unit: "unit", labelKey: "assets.types.GBP" },
  { code: "CHF", unit: "unit", labelKey: "assets.types.CHF" },
];

export function getAssetTypeDef(code) {
  return ASSET_TYPES.find((item) => item.code === code) || null;
}
