const DEFAULTS = {
  apiBaseUrl: "/api",
  bsApiBaseUrl: "/bsApi",
  defaultFixtureId: "cq1wnjypozp0xc3b1z3b2hlp0",
  publicBase: "/ui/"
};

const DEFAULT_FIXTURE_ID_ALIASES = {
  "0705chnaus": "17x6hz87xt7zl404uchnd9jx0",
  "0708chntan": "185uj7ezcc9l8g0amtlwnbl04",
  "0711chnnga": "18e8rybbdmy61ww4xpb42cnx0"
};

const runtimeConfig = createFrontendConfig(readEnv());

export const API_BASE_URL = runtimeConfig.apiBaseUrl;
export const BS_API_BASE_URL = runtimeConfig.bsApiBaseUrl;
export const DEFAULT_FIXTURE_ID = runtimeConfig.defaultFixtureId;
export const FIXTURE_ID_ALIASES = runtimeConfig.fixtureIdAliases;
export const PUBLIC_BASE_URL = runtimeConfig.publicBase;

export function createFrontendConfig(env = {}) {
  return {
    apiBaseUrl: normalizeBase(env.VITE_API_BASE_URL, DEFAULTS.apiBaseUrl),
    bsApiBaseUrl: normalizeBase(env.VITE_BS_API_BASE_URL, DEFAULTS.bsApiBaseUrl),
    defaultFixtureId: env.VITE_DEFAULT_FIXTURE_ID || DEFAULTS.defaultFixtureId,
    fixtureIdAliases: normalizeFixtureAliases(DEFAULT_FIXTURE_ID_ALIASES),
    publicBase: ensureTrailingSlash(env.VITE_PUBLIC_BASE || env.BASE_URL || DEFAULTS.publicBase)
  };
}

export function resolveFixtureIdAlias(value, aliases = FIXTURE_ID_ALIASES) {
  const fixtureId = String(value || "").trim();
  if (!fixtureId) {
    return "";
  }
  return aliases[fixtureId.toLowerCase()] || fixtureId;
}

export function apiUrl(path, params) {
  return buildUrl(API_BASE_URL, path, params);
}

export function bsApiUrl(path, params) {
  return buildUrl(BS_API_BASE_URL, path, params);
}

export function publicAssetUrl(path) {
  return joinPath(PUBLIC_BASE_URL, path);
}

export function buildUrl(base, path = "", params) {
  const normalizedBase = normalizeBase(base, "");
  const normalizedPath = path ? `/${String(path).replace(/^\/+/, "")}` : "";
  const absolute = isAbsoluteUrl(normalizedBase);
  const origin = globalThis.window?.location?.origin || "http://localhost";
  const url = new URL(`${trimTrailingSlash(normalizedBase)}${normalizedPath}`, origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return absolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}

function readEnv() {
  return import.meta.env || {};
}

function normalizeBase(value, fallback) {
  const raw = String(value || fallback || "").trim();
  if (!raw) {
    return "";
  }
  if (isAbsoluteUrl(raw)) {
    return trimTrailingSlash(raw);
  }
  return `/${trimSlashes(raw)}`;
}

function joinPath(base, path) {
  return `${ensureTrailingSlash(base)}${String(path || "").replace(/^\/+/, "")}`;
}

function ensureTrailingSlash(value) {
  const base = normalizeBase(value, DEFAULTS.publicBase);
  return base.endsWith("/") ? base : `${base}/`;
}

function trimTrailingSlash(value) {
  return String(value).replace(/\/+$/, "");
}

function trimSlashes(value) {
  return String(value).replace(/^\/+|\/+$/g, "");
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(String(value));
}

function normalizeFixtureAliases(aliases) {
  return Object.fromEntries(
    Object.entries(aliases).map(([alias, fixtureId]) => [String(alias).trim().toLowerCase(), String(fixtureId).trim()])
  );
}
