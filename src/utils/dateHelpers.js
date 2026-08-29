export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfWeek() {
  const d = startOfToday();
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Pazartesi'yi hafta başı say
  d.setDate(d.getDate() - diff);
  return d;
}

export function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function isWithinRange(dateString, start) {
  return new Date(dateString) >= start;
}

export function sumByPeriod(transactions, start) {
  return transactions
    .filter((t) => isWithinRange(t.date, start))
    .reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
}

const MONTH_LABELS = {
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

// Son `monthCount` ayin gelir/gider toplamlarini aylara gore gruplar (trend grafigi icin).
// `language` ay kisaltmalarinin hangi dilde gosterilecegini belirler ("tr" | "en").
export function buildMonthlyTrend(transactions, monthCount, language = "tr") {
  const now = new Date();
  const buckets = [];
  const monthLabels = MONTH_LABELS[language] || MONTH_LABELS.tr;

  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: `${monthLabels[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`,
      income: 0,
      expense: 0,
    });
  }

  const bucketByKey = Object.fromEntries(buckets.map((b) => [b.key, b]));

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = bucketByKey[key];
    if (!bucket) return;
    if (t.type === "income") bucket.income += t.amount;
    else bucket.expense += t.amount;
  });

  return buckets;
}

// Belirli bir başlangıç tarihinden itibaren gider kategorisi dağılımı (pasta grafiği için)
export function buildCategoryBreakdown(transactions, start) {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense" && isWithinRange(t.date, start))
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
  return Object.entries(totals).map(([category, value]) => ({ category, value }));
}
