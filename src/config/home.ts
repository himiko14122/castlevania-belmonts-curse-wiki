import {
  BookOpen, Skull, Sparkles, Swords, Gem, Map, Users, Newspaper, Search, Tag,
  Moon, Flame, Layers, Crosshair,
  type LucideIcon,
} from 'lucide-react';

export interface StatConfig {
  val: string;
  labelKey: string;
}

export interface ModuleCardConfig {
  key: string;
  labelKey: string;
  titleKey: string;
  descKey: string;
  href: string;
  stats: StatConfig[];
  icon: LucideIcon;
  ctaKey?: string;
}

export interface GameFeatureConfig {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

export interface StartHereStepConfig {
  titleKey: string;
  descKey: string;
  href: string;
}

export interface HeroCtaConfig {
  labelKey: string;
  href: string;
  style: 'primary' | 'secondary';
}

// All hrefs point to categories defined in keywords.json.categories (10 content
// types; all content/en/{category}/ directories exist). Verified by
// check_wiki_building_home_hrefs.py.
export const HOME_CONFIG = {
  hero: {
    // Official KONAMI announcement trailer — verified: oembed embeddable, no
    // age-restriction, title "Castlevania: Belmont's Curse Announcement Trailer (ESRB)".
    videoId: '3k9Yy-o6tpo',
    badgeKeys: [
      'home_hero_badge_release',
      'home_hero_badge_entry',
      'home_hero_badge_weapons',
      'home_hero_badge_arcana',
      'home_hero_badge_fps',
      'home_hero_badge_fanmade',
    ],
    ctas: [
      { labelKey: 'home_hero_cta_guides', href: '/guides', style: 'primary' as const },
      { labelKey: 'home_hero_cta_bosses', href: '/bosses', style: 'secondary' as const },
      { labelKey: 'home_hero_cta_arcana', href: '/arcana', style: 'secondary' as const },
    ],
  },

  moduleCards: [
    { key: 'guides', labelKey: 'home_module_guides_label', titleKey: 'home_module_guides_title', descKey: 'home_module_guides_desc', href: '/guides', stats: [{ val: '__guideCount', labelKey: 'home_module_guides_stat1' }, { val: '5', labelKey: 'home_module_guides_stat2' }], icon: BookOpen, ctaKey: 'home_module_guides_cta' },
    { key: 'bosses', labelKey: 'home_module_bosses_label', titleKey: 'home_module_bosses_title', descKey: 'home_module_bosses_desc', href: '/bosses', stats: [{ val: '6+', labelKey: 'home_module_bosses_stat1' }, { val: 'Confirmed', labelKey: 'home_module_bosses_stat2' }], icon: Skull, ctaKey: 'home_module_bosses_cta' },
    { key: 'arcana', labelKey: 'home_module_arcana_label', titleKey: 'home_module_arcana_title', descKey: 'home_module_arcana_desc', href: '/arcana', stats: [{ val: 'Tarot', labelKey: 'home_module_arcana_stat1' }, { val: 'Spells', labelKey: 'home_module_arcana_stat2' }], icon: Sparkles, ctaKey: 'home_module_arcana_cta' },
    { key: 'weapons', labelKey: 'home_module_weapons_label', titleKey: 'home_module_weapons_title', descKey: 'home_module_weapons_desc', href: '/weapons', stats: [{ val: '7', labelKey: 'home_module_weapons_stat1' }, { val: 'Categories', labelKey: 'home_module_weapons_stat2' }], icon: Swords, ctaKey: 'home_module_weapons_cta' },
    { key: 'relics', labelKey: 'home_module_relics_label', titleKey: 'home_module_relics_title', descKey: 'home_module_relics_desc', href: '/relics', stats: [{ val: 'Off/Def', labelKey: 'home_module_relics_stat1' }, { val: 'Builds', labelKey: 'home_module_relics_stat2' }], icon: Gem, ctaKey: 'home_module_relics_cta' },
    { key: 'maps-locations', labelKey: 'home_module_maps-locations_label', titleKey: 'home_module_maps-locations_title', descKey: 'home_module_maps-locations_desc', href: '/maps-locations', stats: [{ val: 'Paris', labelKey: 'home_module_maps-locations_stat1' }, { val: 'Castle', labelKey: 'home_module_maps-locations_stat2' }], icon: Map, ctaKey: 'home_module_maps-locations_cta' },
    { key: 'characters', labelKey: 'home_module_characters_label', titleKey: 'home_module_characters_title', descKey: 'home_module_characters_desc', href: '/characters', stats: [{ val: 'Rose', labelKey: 'home_module_characters_stat1' }, { val: 'Belmonts', labelKey: 'home_module_characters_stat2' }], icon: Users, ctaKey: 'home_module_characters_cta' },
    { key: 'news-updates', labelKey: 'home_module_news-updates_label', titleKey: 'home_module_news-updates_title', descKey: 'home_module_news-updates_desc', href: '/news-updates', stats: [{ val: 'Oct 15', labelKey: 'home_module_news-updates_stat1' }, { val: '2026', labelKey: 'home_module_news-updates_stat2' }], icon: Newspaper, ctaKey: 'home_module_news-updates_cta' },
    { key: 'secrets-collectibles', labelKey: 'home_module_secrets-collectibles_label', titleKey: 'home_module_secrets-collectibles_title', descKey: 'home_module_secrets-collectibles_desc', href: '/secrets-collectibles', stats: [{ val: 'Hidden', labelKey: 'home_module_secrets-collectibles_stat1' }, { val: 'Rooms', labelKey: 'home_module_secrets-collectibles_stat2' }], icon: Search, ctaKey: 'home_module_secrets-collectibles_cta' },
    { key: 'editions-preorder', labelKey: 'home_module_editions-preorder_label', titleKey: 'home_module_editions-preorder_title', descKey: 'home_module_editions-preorder_desc', href: '/editions-preorder', stats: [{ val: '2', labelKey: 'home_module_editions-preorder_stat1' }, { val: 'Editions', labelKey: 'home_module_editions-preorder_stat2' }], icon: Tag, ctaKey: 'home_module_editions-preorder_cta' },
  ] as ModuleCardConfig[],

  gameFeatures: [
    { titleKey: 'home_feature_arcana', descKey: 'home_feature_arcana_desc', icon: Moon },
    { titleKey: 'home_feature_whip', descKey: 'home_feature_whip_desc', icon: Flame },
    { titleKey: 'home_feature_loadouts', descKey: 'home_feature_loadouts_desc', icon: Layers },
    { titleKey: 'home_feature_paris', descKey: 'home_feature_paris_desc', icon: Crosshair },
  ] as GameFeatureConfig[],

  startHereSteps: [
    { titleKey: 'home_start_1_title', descKey: 'home_start_1_desc', href: '/guides' },
    { titleKey: 'home_start_2_title', descKey: 'home_start_2_desc', href: '/bosses' },
    { titleKey: 'home_start_3_title', descKey: 'home_start_3_desc', href: '/arcana' },
    { titleKey: 'home_start_4_title', descKey: 'home_start_4_desc', href: '/weapons' },
    { titleKey: 'home_start_5_title', descKey: 'home_start_5_desc', href: '/maps-locations' },
  ] as StartHereStepConfig[],

  gameOverview: {
    infoItems: ['developer', 'publisher', 'genre', 'platform', 'release', 'seriesEntry', 'mode'],
    cta: {
      guideLabelKey: 'home_about_cta',
      guideHref: '/guides',
      externalLabelKey: 'home_cta_steam',
      externalLinkKey: 'steam',
    },
  },

  faq: {
    keys: ['arcana', 'weapons', 'bosses', 'release', 'platforms', 'canon'],
  },

  bottomCta: {
    guideHref: '/guides',
    guideLabelKey: 'home_cta_guide',
    externalLinkKey: 'steam',
    externalLabelKey: 'home_cta_steam',
  },
};
