// dataviz metodolojisiyle kontrast + renk körlüğü testinden geçmiş 8'li sabit palet.
// Sıra bilinçli olarak sabit tutuluyor (kategorik renklerde sıra değişmemeli).
export const CATEGORY_COLORS_LIGHT = [
  "#2a78d6",
  "#eb6834",
  "#1baf7a",
  "#eda100",
  "#e87ba4",
  "#008300",
  "#4a3aa7",
  "#e34948",
];

export const CATEGORY_COLORS_DARK = [
  "#3987e5",
  "#d95926",
  "#199e70",
  "#c98500",
  "#d55181",
  "#008300",
  "#9085e9",
  "#e66767",
];

export function getCategoryColorMap(categories, theme) {
  const palette = theme === "dark" ? CATEGORY_COLORS_DARK : CATEGORY_COLORS_LIGHT;
  const map = {};
  categories.forEach((category, index) => {
    map[category] = palette[index % palette.length];
  });
  return map;
}
