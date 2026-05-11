export function href(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const clean = path.startsWith("/") ? path.slice(1) : path;

  return `${base}${clean}`;
}
