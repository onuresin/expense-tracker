import { useId } from "react";

// Basit, tek renkli (altın) bir marka simgesi - yükselen finansal grafiği temsil eden
// üç çubuk. Harici bir dosya/font gerektirmez, SVG olduğu için her boyutta net görünür.
// Sidebar ve mobil başlıkta aynı anda (biri gizli de olsa ikisi de DOM'da) render
// edildiği için gradient id'sini useId() ile benzersiz yapıyoruz - aksi halde iki
// örnek aynı "brandGradient" id'sini paylaşıp çakışabilirdi.
export default function BrandMark({ size = 36 }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill={`url(#${gradientId})`} />
      <rect x="9" y="19" width="4" height="9" rx="1" fill="#0B1220" />
      <rect x="16" y="14" width="4" height="14" rx="1" fill="#0B1220" />
      <rect x="23" y="8" width="4" height="20" rx="1" fill="#0B1220" />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#A6841F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
