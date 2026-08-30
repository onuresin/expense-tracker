// Alt (mobil) navigasyon bari icin elle cizilmis, minimalist stroke/fill ikonlar.
// Harici bir ikon kutuphanesi eklemek yerine BrandMark ile ayni "kendi SVG'ni ciz"
// yaklasimini koruyoruz - sadece 3 sabit ikon oldugu icin bu yeterli ve bundle
// boyutunu artirmiyor. Hepsi disaridan className alip boyutlanabiliyor
// (Tailwind h-5 w-5 gibi), renk currentColor uzerinden geliyor (aktif/pasif
// durum NavLink'in text-* siniflariyla kontrol ediliyor).

export function OverviewIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="12" width="3.4" height="8" rx="0.8" fill="currentColor" />
      <rect x="10.3" y="7" width="3.4" height="13" rx="0.8" fill="currentColor" />
      <rect x="16.6" y="4" width="3.4" height="16" rx="0.8" fill="currentColor" />
    </svg>
  );
}

export function TransactionsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M15 4v3h3" />
      <path d="M8 12h8M8 16h5" />
    </svg>
  );
}

export function DebtsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M6.5 14.5h4" />
    </svg>
  );
}

// Ust uste bindirilmis elips + gövde ile "bozuk para yigini" izlenimi veren
// basit bir sekil - varlıklar (altin/gumus/doviz) sayfasi icin.
export function AssetsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
      <path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" />
      <path d="M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" />
    </svg>
  );
}
