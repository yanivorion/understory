import { createClient } from "@base44/sdk";

// Anonymous by default (no token) — enough to read public-RLS entities like
// SiteConfig. auth.loginViaEmailPassword / loginWithProvider (used in
// /studio) upgrade the same client to an authenticated session.
//
// appBaseUrl is required for auth.loginWithProvider()/logout() to build
// correct full-page redirect URLs. Without it, the SDK defaults to an empty
// string and those redirects become relative, which only happens to work
// when the app is hosted directly on its own base44.app domain — on any
// other host (localhost, a custom domain) the redirect breaks. Setting it
// explicitly fixes Google login everywhere, including local dev.
export const base44 = createClient({
  appId: "6a5cb737b1cf64633da0d58a",
  appBaseUrl: "https://base44.app",
  options: {
    onError: (error) => {
      console.warn("Base44 error:", error?.message || error);
    },
  },
});
