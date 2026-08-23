import site from '../data/site.json';

/**
 * Google prints about 60 characters of a title and cuts the rest mid-word,
 * and `Base.astro` appends " | <brand>" to every page. That suffix is part of
 * the budget, so the same wording that fits under a short brand name overruns
 * under a longer one — renaming the business silently pushes pages over.
 *
 * Rather than hand-trim copy against whatever the brand happens to be called,
 * templates hand over their preferred wording followed by progressively
 * shorter fallbacks, and the longest one that actually fits wins. The last
 * candidate is used whether it fits or not, so it should always be short
 * enough to be safe.
 */
export const TITLE_MAX = 60;

/** Characters `Base.astro` will append: " | <brand>". */
export const brandSuffixLength = ` | ${site.name}`.length;

export function fitTitle(...candidates: string[]): string {
  const usable = candidates.filter(Boolean);
  for (const candidate of usable) {
    if (candidate.length + brandSuffixLength <= TITLE_MAX) return candidate;
  }
  return usable[usable.length - 1] ?? '';
}
