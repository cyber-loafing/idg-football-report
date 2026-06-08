import assert from "node:assert/strict";
import test from "node:test";

import { buildUrl, createFrontendConfig } from "./config.js";

test("createFrontendConfig uses same-origin defaults", () => {
  const config = createFrontendConfig({});

  assert.equal(config.apiBaseUrl, "/api");
  assert.equal(config.bsApiBaseUrl, "/bsApi");
  assert.equal(config.defaultFixtureId, "cq1wnjypozp0xc3b1z3b2hlp0");
  assert.equal(config.publicBase, "/ui/");
});

test("createFrontendConfig accepts env overrides", () => {
  const config = createFrontendConfig({
    VITE_API_BASE_URL: "https://example.com/api/",
    VITE_BS_API_BASE_URL: "proxy/bsApi",
    VITE_DEFAULT_FIXTURE_ID: "fixture-1",
    VITE_PUBLIC_BASE: "/report"
  });

  assert.equal(config.apiBaseUrl, "https://example.com/api");
  assert.equal(config.bsApiBaseUrl, "/proxy/bsApi");
  assert.equal(config.defaultFixtureId, "fixture-1");
  assert.equal(config.publicBase, "/report/");
});

test("buildUrl avoids duplicate slashes and preserves query params", () => {
  const url = buildUrl("/api/", "/fixtures/abc/latest", { lang: "cn", empty: null });

  assert.equal(url, "/api/fixtures/abc/latest?lang=cn");
});

test("buildUrl supports absolute API origins", () => {
  const url = buildUrl("https://example.com/api", "source-config");

  assert.equal(url, "https://example.com/api/source-config");
});
