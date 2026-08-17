// routes.ts — every link in the new campus world goes through here.
//
// The world currently lives under /lab so the published book at /chapter1 etc.
// stays exactly as it was. When the redesign is ready to become the real book,
// flip BASE to '' and the map, chapter headers, next-chapter nav and the
// cartridge HUD all follow. Nothing else hardcodes a path.
export const BASE = '/lab';

/** The campus map — the world's home. */
export const mapHref = () => `${BASE}/map`;

/** A chapter page, by CHAPTERS id (e.g. 'chapter1'). */
export const chapterHref = (id: string) => `${BASE}/${id}`;

/** A chapter's evening texting scene. */
export const chatHref = (id: string) => `${BASE}/${id}/chat`;
