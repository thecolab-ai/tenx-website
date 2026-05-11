import cities from "../data/cities.json";
import competitors from "../data/competitors.json";
import roles from "../data/roles.json";

export type Role = (typeof roles)[number];
export type City = (typeof cities)[number];
export type Competitor = (typeof competitors)[number];

export const allRoles = roles;
export const allCities = cities;
export const allCompetitors = competitors;

export function getRole(slug: string): Role {
  const role = allRoles.find((item) => item.slug === slug);
  if (!role) {
    throw new Error(`Unknown role: ${slug}`);
  }
  return role;
}

export function getCity(slug: string): City {
  const city = allCities.find((item) => item.slug === slug);
  if (!city) {
    throw new Error(`Unknown city: ${slug}`);
  }
  return city;
}

export function getCompetitor(slug: string): Competitor {
  const competitor = allCompetitors.find((item) => item.slug === slug);
  if (!competitor) {
    throw new Error(`Unknown competitor: ${slug}`);
  }
  return competitor;
}

export function formatMoney(amount: number, currency = "NZD"): string {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function salaryRangeFor(role: Role, city?: City): string {
  const multiplier = city?.salaryMultiplier ?? 1;
  const currency = city?.currency ?? "NZD";
  const min = Math.round((role.salaryMin * multiplier) / 5000) * 5000;
  const max = Math.round((role.salaryMax * multiplier) / 5000) * 5000;
  return `${formatMoney(min, currency)}-${formatMoney(max, currency)}`;
}

export function contractRangeFor(role: Role, city?: City): string {
  const multiplier = city?.salaryMultiplier ?? 1;
  const currency = city?.currency ?? "NZD";
  const min = Math.round((role.contractMonthlyMin * multiplier) / 500) * 500;
  const max = Math.round((role.contractMonthlyMax * multiplier) / 500) * 500;
  return `${formatMoney(min, currency)}-${formatMoney(max, currency)} / month`;
}

export function readableStatus(city: City): string {
  return city.status === "open"
    ? "Open now"
    : "Opening to employers in June 2026";
}
