// genelpara.com ücretsiz, API-key gerektirmeyen döviz/altın servisi.
// Resmi/dokümante bir şema garantisi olmadığı için (üçüncü parti, sınırlı dokümantasyon),
// birkaç olası alan adını deniyoruz ve ham veriyi konsola basıyoruz ki
// ilk çalıştırmada gerçek şekli görüp gerekirse extractRate çağrılarını güncelleyelim.
const ENDPOINT = "https://api.genelpara.com/embed/para-birimleri.json";

export async function fetchMarketRates() {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error("Piyasa verisi alınamadı");
  }
  return response.json();
}

export function extractRate(data, candidateKeys) {
  for (const key of candidateKeys) {
    if (data && data[key]) return data[key];
  }
  return null;
}
