export function formatCurrency(amount) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(amount || 0);
}

// `language`: tarihin hangi yerel bicimde gosterilecegini belirler ("tr" | "en").
// Para birimi her zaman TRY olarak kaliyor (uygulama TL uzerinden calisiyor);
// sadece tarihteki gun/ay/yil sirasi ve ayrac dile gore degisiyor.
export function formatDate(dateString, language = "tr") {
  const locale = language === "en" ? "en-US" : "tr-TR";
  return new Date(dateString).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
