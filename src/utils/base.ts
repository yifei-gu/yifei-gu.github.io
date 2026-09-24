/** Astro `base` with a trailing slash, including the root site (`/`). */
export function siteBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}

/** Prefix an in-site path with Astro's `base`. External URLs are unchanged. */
export function withBase(path: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  return `${siteBase()}${path.replace(/^\/+/, '')}`;
}

export function isHomePath(): boolean {
  const path = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  return path === siteBase();
}
