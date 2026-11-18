/*
 * Waitlist configuration.
 *
 * Option A (default): deploy on Netlify. Leave WAITLIST_ENDPOINT empty and
 *   sign-ups appear under Netlify > Forms > "waitlist". Nothing else to set up.
 *
 * Option B: any host (GitHub Pages, etc). Create a free form at formspree.io
 *   and paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
 *   Sign-ups then arrive by email and in the Formspree dashboard.
 */
window.MFH_CONFIG = {
  WAITLIST_ENDPOINT: ""
};
