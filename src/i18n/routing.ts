import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Research report §3f: target locales = es + pt + de (en is source language).
  locales: ['en', 'es', 'pt', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  de: 'Deutsch',
};
