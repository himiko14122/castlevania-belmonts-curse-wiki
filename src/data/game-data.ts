// Game-specific data for Castlevania: Belmont's Curse
// All entries use ONLY officially confirmed facts (KONAMI / Steam / Wikipedia,
// see knowledge/projects/castlevania-belmonts-curse/). No invented stats —
// the game launches October 15, 2026 and numeric tuning does not exist yet.

/* ──────────────── Color Maps ──────────────── */
export const TIER_COLOR_MAP: Record<string, string> = {
  S: 'var(--color-tier-s)',
  A: 'var(--color-tier-a)',
  B: 'var(--color-tier-b)',
  C: 'var(--color-tier-c)',
};
export const TIER_COLOR_DEFAULT = 'var(--color-tier-c)';

export function tierColor(tier: string): string {
  return TIER_COLOR_MAP[tier] ?? TIER_COLOR_DEFAULT;
}

/* ──────────────── Boss Roster (Table 1 → /bosses) ──────────────── */
// Six bosses confirmed by name ahead of launch (KONAMI official page +
// Wikipedia). Status values: Confirmed / New / Returning.
export interface BossEntry {
  id: string;
  nameKey: string;
  natureKey: string;
  styleKey: string;
  statusKey: string;
}

export const BOSSES: BossEntry[] = [
  { id: 'death', nameKey: 'boss_death_name', natureKey: 'boss_death_nature', styleKey: 'boss_death_style', statusKey: 'home_boss_status_returning' },
  { id: 'medusa', nameKey: 'boss_medusa_name', natureKey: 'boss_medusa_nature', styleKey: 'boss_medusa_style', statusKey: 'home_boss_status_confirmed' },
  { id: 'carmilla', nameKey: 'boss_carmilla_name', natureKey: 'boss_carmilla_nature', styleKey: 'boss_carmilla_style', statusKey: 'home_boss_status_confirmed' },
  { id: 'joan-of-arc', nameKey: 'boss_joan_name', natureKey: 'boss_joan_nature', styleKey: 'boss_joan_style', statusKey: 'home_boss_status_new' },
  { id: 'the-fallen', nameKey: 'boss_fallen_name', natureKey: 'boss_fallen_nature', styleKey: 'boss_fallen_style', statusKey: 'home_boss_status_new' },
  { id: 'isaac', nameKey: 'boss_isaac_name', natureKey: 'boss_isaac_nature', styleKey: 'boss_isaac_style', statusKey: 'home_boss_status_returning' },
];

export const BOSS_STATUS_COLORS: Record<string, string> = {
  new: 'var(--color-tier-s)',
  confirmed: 'var(--color-tier-a)',
  returning: 'var(--color-tier-b)',
};

/* ──────────────── Arcana Deck Loop (Cards 1 → /arcana) ──────────────── */
// The signature tarot system: every defeated boss is sealed into Rose's deck.
export interface ArcanaEntry {
  id: string;
  nameKey: string;
  doesKey: string;
  whyKey: string;
  badgeKey: string;
}

export const ARCANA: ArcanaEntry[] = [
  { id: 'seal', nameKey: 'arc_seal_name', doesKey: 'arc_seal_does', whyKey: 'arc_seal_why', badgeKey: 'arc_seal_badge' },
  { id: 'cast', nameKey: 'arc_cast_name', doesKey: 'arc_cast_does', whyKey: 'arc_cast_why', badgeKey: 'arc_cast_badge' },
  { id: 'special-actions', nameKey: 'arc_actions_name', doesKey: 'arc_actions_does', whyKey: 'arc_actions_why', badgeKey: 'arc_actions_badge' },
  { id: 'builds', nameKey: 'arc_builds_name', doesKey: 'arc_builds_does', whyKey: 'arc_builds_why', badgeKey: 'arc_builds_badge' },
];

/* ──────────────── Arsenal Facts (Table 2 → /weapons) ──────────────── */
// Confirmed weapon-system facts. Seven weapon categories are official; the
// full category names are undisclosed pre-launch — no invented line-up.
export interface WeaponEntry {
  id: string;
  nameKey: string;
  detailKey: string;
  badgeKey: string;
}

export const WEAPONS: WeaponEntry[] = [
  { id: 'vampire-killer', nameKey: 'weapon_vampireKiller_name', detailKey: 'weapon_vampireKiller_detail', badgeKey: 'weapon_vampireKiller_badge' },
  { id: 'seven-categories', nameKey: 'weapon_sevenCategories_name', detailKey: 'weapon_sevenCategories_detail', badgeKey: 'weapon_sevenCategories_badge' },
  { id: 'arcana-combos', nameKey: 'weapon_arcanaCombos_name', detailKey: 'weapon_arcanaCombos_detail', badgeKey: 'weapon_arcanaCombos_badge' },
  { id: 'gear-upgrades', nameKey: 'weapon_gearUpgrades_name', detailKey: 'weapon_gearUpgrades_detail', badgeKey: 'weapon_gearUpgrades_badge' },
];

/* ──────────────── Platforms & Editions (Cards 2 → /editions-preorder) ── */
// Edition contents and platform matrix from the Steam store page and the
// KONAMI official site (both verified September 2026).
export interface EditionEntry {
  id: string;
  nameKey: string;
  subtitleKey: string;
  f0LabelKey: string;
  f0ValueKey: string;
  f1LabelKey: string;
  f1ValueKey: string;
  badgeKey: string;
}

export const EDITIONS: EditionEntry[] = [
  {
    id: 'standard',
    nameKey: 'edition_standard_name',
    subtitleKey: 'edition_standard_subtitle',
    f0LabelKey: 'edition_standard_f0_label',
    f0ValueKey: 'edition_standard_f0_value',
    f1LabelKey: 'edition_standard_f1_label',
    f1ValueKey: 'edition_standard_f1_value',
    badgeKey: 'edition_standard_badge',
  },
  {
    id: 'midnight',
    nameKey: 'edition_midnight_name',
    subtitleKey: 'edition_midnight_subtitle',
    f0LabelKey: 'edition_midnight_f0_label',
    f0ValueKey: 'edition_midnight_f0_value',
    f1LabelKey: 'edition_midnight_f1_label',
    f1ValueKey: 'edition_midnight_f1_value',
    badgeKey: 'edition_midnight_badge',
  },
  {
    id: 'pre-order',
    nameKey: 'edition_preorder_name',
    subtitleKey: 'edition_preorder_subtitle',
    f0LabelKey: 'edition_preorder_f0_label',
    f0ValueKey: 'edition_preorder_f0_value',
    f1LabelKey: 'edition_preorder_f1_label',
    f1ValueKey: 'edition_preorder_f1_value',
    badgeKey: 'edition_preorder_badge',
  },
  {
    id: 'platforms',
    nameKey: 'edition_platforms_name',
    subtitleKey: 'edition_platforms_subtitle',
    f0LabelKey: 'edition_platforms_f0_label',
    f0ValueKey: 'edition_platforms_f0_value',
    f1LabelKey: 'edition_platforms_f1_label',
    f1ValueKey: 'edition_platforms_f1_value',
    badgeKey: 'edition_platforms_badge',
  },
];

/* ──────────────── Sidebar Codes ──────────────── */
export interface SidebarCode {
  code: string;
  reward: string;
}

// Placeholder-only state: single-player premium game with no redemption-code
// system (research_report.md §3.4). Two-state data contract — never mix this
// placeholder entry with real codes.
export const SIDEBAR_CODES: SidebarCode[] = [
  { code: 'None', reward: 'No active codes yet. Check back soon!' },
];

/* ──────────────── Footer Data ──────────────── */
export const FOOTER_DATA = {
  officialDiscordUrl: '',
  officialYoutubeUrl: 'https://www.youtube.com/@Konami',
  communityTool: { label: 'Community', href: '' },
} as const;
