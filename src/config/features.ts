// Single build-time switch for the ordering stack (accounts, cart, checkout).
// CRA inlines REACT_APP_* at build time, so this resolves to a constant in the
// bundle. Anything other than the exact string "true" leaves ordering OFF, which
// keeps the site a brochure and stops every API call at the source.
export const ORDERING_ENABLED = process.env.REACT_APP_ORDERING_ENABLED === "true";
