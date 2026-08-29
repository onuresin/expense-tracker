// genelpara.com ücretsiz, API-key gerektirmeyen döviz/altın servisi.
// "doviz" listesi USD/EUR gibi kurları veriyor. "altin" listesi ise gram altın
// (has/24 ayar) değil, kuyumcu tipi 14/18/22 ayar altın fiyatlarını sayısal
// kodlarla veriyor ("14", "18", "22") - isim alanı yok. Üç değerin saflık oranına
// göre geri hesaplanan karşılıkları birbirine çok yakın çıktığı için bu yorum
// doğrulandı. Bu yüzden UI'da "Gram Altın" yerine "22 Ayar Altın" olarak
// gösteriyoruz (22 ayar, has'a en yakın ve en çok işlem gören tür).
const DOVIZ_ENDPOINT = "https://api.genelpara.com/json/?list=doviz&sembol=all";
const ALTIN_ENDPOINT = "https://api.genelpara.com/json/?list=altin&sembol=all";

async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Piyasa verisi alınamadı");
  }
  const payload = await response.json();
  return payload?.data || {};
}

export async function fetchMarketRates() {
  const [doviz, altin] = await Promise.all([fetchList(DOVIZ_ENDPOINT), fetchList(ALTIN_ENDPOINT)]);
  return { ...doviz, ...altin };
}

export function extractRate(data, candidateKeys) {
  for (const key of candidateKeys) {
    if (data && data[key]) return data[key];
  }
  return null;
}
