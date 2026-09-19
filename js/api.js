const API_BASE = 'https://nagerholidays.com/api/v3';
const DEFAULT_COUNTRY = 'KE';
const AVAILABLE_YEARS = [2024, 2025, 2026, 2027];

export async function fetchHolidays(year, countryCode = DEFAULT_COUNTRY) {
  const url = `${API_BASE}/PublicHolidays/${encodeURIComponent(year)}/${encodeURIComponent(countryCode)}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch holidays: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export function getAvailableYears() {
  return AVAILABLE_YEARS;
}

export const COUNTRY_CODE = DEFAULT_COUNTRY;
