// Resolves a path inside /public so it works under the GitHub Pages sub-path.
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`
