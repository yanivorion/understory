import { createClient } from "@base44/sdk";

// Anonymous by default (no token) — enough to read public-RLS entities like
// CursorSiteConfig. auth.loginViaEmailPassword / loginWithProvider (used in
// /studio) upgrade the same client to an authenticated session.
export const base44 = createClient({
  appId: "6a5cb737b1cf64633da0d58a",
  options: {
    onError: (error) => {
      console.warn("Base44 error:", error?.message || error);
    },
  },
});
