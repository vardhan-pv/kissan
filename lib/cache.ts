// Offline cache keys
export const CACHE_KEYS = {
  CROPS: 'kisanai_crops_cache',
  WEATHER: 'kisanai_weather_cache',
  PRODUCTS: 'kisanai_products_cache',
  PRICES: 'kisanai_prices_cache',
  USER: 'kisanai_user',
  LANG: 'kisanai_lang',
  FARM_CROPS: 'kisanai_farm_crops',
  NOTIFICATIONS: 'kisanai_notifications',
  POINTS: 'kisanai_points',
};

export function saveToCache(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export function getFromCache<T>(key: string, maxAgeMs = 3 * 60 * 60 * 1000): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > maxAgeMs) return null;
    return data as T;
  } catch {
    return null;
  }
}

export function getFromCacheAnyAge<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return (parsed.data ?? parsed) as T;
  } catch {
    return null;
  }
}

export function isCacheStale(key: string, maxAgeMs = 3 * 60 * 60 * 1000): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return true;
    const { ts } = JSON.parse(raw);
    return Date.now() - ts > maxAgeMs;
  } catch {
    return true;
  }
}
