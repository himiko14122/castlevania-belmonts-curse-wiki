import {
  BookOpen, Skull, Sparkles, Swords, Gem, Map, Users, Newspaper, Search, Tag,
  Home, Info,
  type LucideIcon,
} from 'lucide-react';

export const NAVIGATION_CONFIG = [
  { key: 'home', labelKey: 'nav_home', path: '/', icon: Home, showInHeader: false, showInSidebar: true, showInFooter: false, sitemap: true, priority: 1, changeFrequency: 'daily' },
  { key: 'guides', labelKey: 'nav_guides', path: '/guides', icon: BookOpen, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'bosses', labelKey: 'nav_bosses', path: '/bosses', icon: Skull, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'arcana', labelKey: 'nav_arcana', path: '/arcana', icon: Sparkles, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'weapons', labelKey: 'nav_weapons', path: '/weapons', icon: Swords, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'relics', labelKey: 'nav_relics', path: '/relics', icon: Gem, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'maps-locations', labelKey: 'nav_mapsLocations', path: '/maps-locations', icon: Map, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'characters', labelKey: 'nav_characters', path: '/characters', icon: Users, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'news-updates', labelKey: 'nav_newsUpdates', path: '/news-updates', icon: Newspaper, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'secrets-collectibles', labelKey: 'nav_secretsCollectibles', path: '/secrets-collectibles', icon: Search, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'weekly' },
  { key: 'editions-preorder', labelKey: 'nav_editionsPreorder', path: '/editions-preorder', icon: Tag, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'weekly' },
  { key: 'about', labelKey: 'nav_about', path: '/about', icon: Info, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'monthly' },
  { key: 'sitemap', labelKey: 'nav_sitemap', path: '/sitemap', icon: Info, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: false, priority: 0.5, changeFrequency: 'monthly' },
  { key: 'privacy-policy', labelKey: 'nav_privacyPolicy', path: '/privacy-policy', icon: Info, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.4, changeFrequency: 'yearly' },
  { key: 'terms-of-service', labelKey: 'nav_termsOfService', path: '/terms-of-service', icon: Info, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.4, changeFrequency: 'yearly' },
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => 'isContentType' in item && item.isContentType).map((item) => item.key);

export const CONTENT_TYPES_WITH_DEDICATED_PAGES = new Set(CONTENT_TYPES);

export type NavigationItem = (typeof NAVIGATION_CONFIG)[number];
export type ContentType = (typeof CONTENT_TYPES)[number];

export function isContentType(value: string): value is ContentType {
  return CONTENT_TYPES.includes(value as ContentType);
}

export function getNavigationItem(path: string) {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  return NAVIGATION_CONFIG.find((item) => item.path === normalized || item.key === path);
}

export const CONTENT_DIR_NAMES: Record<ContentType | string, string> = {
  'guides': 'guides',
  'bosses': 'bosses',
  'arcana': 'arcana',
  'weapons': 'weapons',
  'relics': 'relics',
  'maps-locations': 'maps-locations',
  'characters': 'characters',
  'news-updates': 'news-updates',
  'secrets-collectibles': 'secrets-collectibles',
  'editions-preorder': 'editions-preorder',
} as Record<ContentType, string>;

export function getContentDir(contentType: ContentType): string {
  return CONTENT_DIR_NAMES[contentType] || contentType;
}

export const GUIDE_CATEGORIES: Record<string, { emoji: string; order: number }> = {
  'guides':               { emoji: '📖', order: 1 },
  'bosses':               { emoji: '💀', order: 2 },
  'arcana':               { emoji: '🃏', order: 3 },
  'weapons':              { emoji: '⚔️', order: 4 },
  'relics':               { emoji: '💎', order: 5 },
  'maps-locations':       { emoji: '🗺️', order: 6 },
  'characters':           { emoji: '🧛', order: 7 },
  'news-updates':         { emoji: '📰', order: 8 },
  'secrets-collectibles': { emoji: '🔎', order: 9 },
  'editions-preorder':    { emoji: '🏷️', order: 10 },
};

export const CATEGORY_ORDER = Object.entries(GUIDE_CATEGORIES)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([key]) => key);

export const CATEGORY_AFFINITY: Record<string, string[]> = {
  'guides':               ['bosses', 'arcana', 'weapons'],
  'bosses':               ['guides', 'arcana', 'weapons'],
  'arcana':               ['bosses', 'weapons', 'relics'],
  'weapons':              ['arcana', 'relics', 'guides'],
  'relics':               ['arcana', 'weapons', 'secrets-collectibles'],
  'maps-locations':       ['secrets-collectibles', 'guides', 'relics'],
  'characters':           ['bosses', 'news-updates', 'guides'],
  'news-updates':         ['editions-preorder', 'characters', 'guides'],
  'secrets-collectibles': ['maps-locations', 'relics', 'guides'],
  'editions-preorder':    ['news-updates', 'relics', 'secrets-collectibles'],
};
