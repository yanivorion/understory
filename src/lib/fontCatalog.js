/**
 * Wix-compatible font catalog. Google-sourced fonts load via FontLoader;
 * system / Monotype-style entries use native stacks where available.
 */
export const FONT_GROUPS = [
  {
    label: "Site defaults",
    fonts: [
      { id: "product-sans", label: "Product Sans / Google Sans", family: "'Product Sans', 'Google Sans', system-ui, sans-serif" },
      { id: "merriweather", label: "Merriweather", family: "'Merriweather', Georgia, serif", google: "Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400" },
    ],
  },
  {
    label: "System (Wix)",
    fonts: [
      { id: "arial", label: "Arial", family: "Arial, Helvetica, sans-serif" },
      { id: "arial-black", label: "Arial Black", family: "'Arial Black', Arial, sans-serif" },
      { id: "georgia", label: "Georgia", family: "Georgia, 'Times New Roman', serif" },
      { id: "times", label: "Times New Roman", family: "'Times New Roman', Times, serif" },
      { id: "helvetica", label: "Helvetica / Arial", family: "Helvetica, Arial, sans-serif" },
      { id: "verdana", label: "Verdana", family: "Verdana, Geneva, sans-serif" },
      { id: "tahoma", label: "Tahoma", family: "Tahoma, Geneva, sans-serif" },
      { id: "trebuchet", label: "Trebuchet MS", family: "'Trebuchet MS', Helvetica, sans-serif" },
      { id: "courier", label: "Courier New", family: "'Courier New', Courier, monospace" },
      { id: "palatino", label: "Palatino", family: "Palatino, 'Palatino Linotype', serif" },
      { id: "avenir", label: "Avenir (system)", family: "Avenir, 'Avenir Next', 'Helvetica Neue', sans-serif" },
      { id: "futura", label: "Futura (system)", family: "Futura, 'Century Gothic', sans-serif" },
    ],
  },
  {
    label: "Google — Sans",
    fonts: [
      { id: "roboto", label: "Roboto", family: "'Roboto', sans-serif", google: "Roboto:ital,wght@0,100..900;1,100..900" },
      { id: "open-sans", label: "Open Sans", family: "'Open Sans', sans-serif", google: "Open+Sans:ital,wght@0,300..800;1,300..800" },
      { id: "lato", label: "Lato", family: "'Lato', sans-serif", google: "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900" },
      { id: "montserrat", label: "Montserrat", family: "'Montserrat', sans-serif", google: "Montserrat:ital,wght@0,100..900;1,100..900" },
      { id: "poppins", label: "Poppins", family: "'Poppins', sans-serif", google: "Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" },
      { id: "raleway", label: "Raleway", family: "'Raleway', sans-serif", google: "Raleway:ital,wght@0,100..900;1,100..900" },
      { id: "nunito", label: "Nunito", family: "'Nunito', sans-serif", google: "Nunito:ital,wght@0,200..1000;1,200..1000" },
      { id: "work-sans", label: "Work Sans", family: "'Work Sans', sans-serif", google: "Work+Sans:ital,wght@0,100..900;1,100..900" },
      { id: "dm-sans", label: "DM Sans", family: "'DM Sans', sans-serif", google: "DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000" },
      { id: "inter", label: "Inter", family: "'Inter', sans-serif", google: "Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900" },
      { id: "manrope", label: "Manrope", family: "'Manrope', sans-serif", google: "Manrope:wght@200..800" },
      { id: "outfit", label: "Outfit", family: "'Outfit', sans-serif", google: "Outfit:wght@100..900" },
      { id: "josefin-sans", label: "Josefin Sans", family: "'Josefin Sans', sans-serif", google: "Josefin+Sans:ital,wght@0,100..700;1,100..700" },
      { id: "barlow", label: "Barlow", family: "'Barlow', sans-serif", google: "Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" },
      { id: "rubik", label: "Rubik", family: "'Rubik', sans-serif", google: "Rubik:ital,wght@0,300..900;1,300..900" },
      { id: "heebo", label: "Heebo", family: "'Heebo', sans-serif", google: "Heebo:wght@100..900" },
      { id: "assistant", label: "Assistant", family: "'Assistant', sans-serif", google: "Assistant:wght@200..800" },
    ],
  },
  {
    label: "Google — Serif & Display",
    fonts: [
      { id: "playfair", label: "Playfair Display", family: "'Playfair Display', Georgia, serif", google: "Playfair+Display:ital,wght@0,400..900;1,400..900" },
      { id: "lora", label: "Lora", family: "'Lora', Georgia, serif", google: "Lora:ital,wght@0,400..700;1,400..700" },
      { id: "cormorant", label: "Cormorant Garamond", family: "'Cormorant Garamond', Georgia, serif", google: "Cormorant+Garamond:ital,wght@0,300..700;1,300..700" },
      { id: "eb-garamond", label: "EB Garamond", family: "'EB Garamond', Georgia, serif", google: "EB+Garamond:ital,wght@0,400..800;1,400..800" },
      { id: "libre-baskerville", label: "Libre Baskerville", family: "'Libre Baskerville', Georgia, serif", google: "Libre+Baskerville:ital,wght@0,400;0,700;1,400" },
      { id: "cinzel", label: "Cinzel", family: "'Cinzel', Georgia, serif", google: "Cinzel:wght@400..900" },
      { id: "fraunces", label: "Fraunces", family: "'Fraunces', Georgia, serif", google: "Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900" },
      { id: "crimson-pro", label: "Crimson Pro", family: "'Crimson Pro', Georgia, serif", google: "Crimson+Pro:ital,wght@0,200..900;1,200..900" },
      { id: "bodoni-moda", label: "Bodoni Moda", family: "'Bodoni Moda', Georgia, serif", google: "Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900" },
      { id: "enriqueta", label: "Enriqueta", family: "'Enriqueta', Georgia, serif", google: "Enriqueta:wght@400;500;600;700" },
      { id: "caudex", label: "Caudex", family: "'Caudex', Georgia, serif", google: "Caudex:ital,wght@0,400;0,700;1,400;1,700" },
      { id: "forum", label: "Forum", family: "'Forum', Georgia, serif", google: "Forum" },
    ],
  },
  {
    label: "Google — Script & Accent",
    fonts: [
      { id: "dancing-script", label: "Dancing Script", family: "'Dancing Script', cursive", google: "Dancing+Script:wght@400..700" },
      { id: "pacifico", label: "Pacifico", family: "'Pacifico', cursive", google: "Pacifico" },
      { id: "satisfy", label: "Satisfy", family: "'Satisfy', cursive", google: "Satisfy" },
      { id: "great-vibes", label: "Great Vibes", family: "'Great Vibes', cursive", google: "Great+Vibes" },
      { id: "cookie", label: "Cookie", family: "'Cookie', cursive", google: "Cookie" },
      { id: "damion", label: "Damion", family: "'Damion', cursive", google: "Damion" },
      { id: "amatic-sc", label: "Amatic SC", family: "'Amatic SC', cursive", google: "Amatic+SC:wght@400;700" },
      { id: "anton", label: "Anton", family: "'Anton', sans-serif", google: "Anton" },
      { id: "jockey-one", label: "Jockey One", family: "'Jockey One', sans-serif", google: "Jockey+One" },
    ],
  },
  {
    label: "Google — Mono",
    fonts: [
      { id: "roboto-mono", label: "Roboto Mono", family: "'Roboto Mono', monospace", google: "Roboto+Mono:ital,wght@0,100..700;1,100..700" },
      { id: "jetbrains-mono", label: "JetBrains Mono", family: "'JetBrains Mono', monospace", google: "JetBrains+Mono:ital,wght@0,100..800;1,100..800" },
      { id: "fira-code", label: "Fira Code", family: "'Fira Code', monospace", google: "Fira+Code:wght@300..700" },
    ],
  },
];

export const ALL_FONTS = FONT_GROUPS.flatMap((g) => g.fonts);

export const FONT_BY_ID = Object.fromEntries(ALL_FONTS.map((f) => [f.id, f]));

export function getFontFamily(fontId) {
  return FONT_BY_ID[fontId]?.family || FONT_BY_ID["product-sans"].family;
}

export function collectGoogleFamilies(fontIds) {
  const specs = new Set();
  fontIds.forEach((id) => {
    const font = FONT_BY_ID[id];
    if (font?.google) specs.add(font.google);
  });
  return [...specs];
}
