import { routing, type Locale } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://castlevania-belmonts-curse.wiki';
export const SITE_NAME = "Castlevania: Belmont's Curse Wiki";
export const HERO_IMAGE = '/images/hero.webp';
export const LOGO_IMAGE = '/logo.svg';
export const TWITTER_HANDLE = '';
export const GA_TRACKING_ID = 'G-JCYDF6PLCL';
export const SLUG_PREFIX = "Castlevania-Belmont's-Curse-";

export const EXTERNAL_LINKS = {
  steam: 'https://store.steampowered.com/app/4231820/Castlevania_Belmonts_Curse/',
  website: 'https://www.konami.com/games/castlevania/belmonts_curse/us/en-us/',
  youtube: 'https://www.youtube.com/@Konami',
  discord: '',
  reddit: '',
  twitter: '',
} as const;

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localizedPath(locale: Locale | string, path = '/') {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  // localePrefix 'always': every locale gets a prefixed path. Only the bare
  // homepage root may stay unprefixed for the DEFAULT locale (mirrored to /
  // via mirror-en-to-root.mjs). Non-default locales must return /{locale}/
  // (trailingSlash: true) so homepage hreflang alternates / canonical / og:url
  // don't collapse to the root path (R8 hreflang bug).
  if (normalized === '/') {
    if (locale === routing.defaultLocale) return '/';
    return `/${locale}/`;
  }
  return `/${locale}${normalized}`;
}
