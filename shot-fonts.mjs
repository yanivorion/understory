import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
page.on("pageerror", (err) => console.log("PAGEERROR:", err.message));

await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/contact/font-hero.png" });

await page.evaluate(() => window.scrollTo(0, 320 * 9.5 * 0.15));
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/contact/font-hero-title.png" });

await page.goto("http://localhost:5173/collection", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/contact/font-collection.png" });

await page.goto("http://localhost:5173/contact", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/contact/font-contact.png" });

await browser.close();
