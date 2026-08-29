// Kategoriler artik ekranda gosterilecek Turkce metin degil, sabit (dilden
// bagimsiz) anahtarlar olarak tutuluyor. Gorunen etiket, src/locales/*.js
// icindeki "categories.<anahtar>" karsiligindan geliyor (bkz. useLanguage().t).
// Boylece Firestore'da saklanan deger hep ayni kaliyor, sadece arayuz metni
// secili dile gore degisiyor.
export const INCOME_CATEGORIES = [
  "salary",
  "sideIncome",
  "investmentReturn",
  "gift",
  "otherIncome",
];

export const EXPENSE_CATEGORIES = [
  "groceries",
  "rent",
  "bills",
  "transport",
  "entertainment",
  "health",
  "debtPayment",
  "otherExpense",
];

export const RECURRING_FREQUENCIES = [
  { value: "weekly", labelKey: "recurring.weekly" },
  { value: "monthly", labelKey: "recurring.monthly" },
];
