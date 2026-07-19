export default function Gutter({ size = "md", tone = "light" }) {
  const heights = {
    sm: "h-16 md:h-24",
    md: "h-24 md:h-40",
    lg: "h-32 md:h-56",
  };
  const bg = tone === "dark" ? "bg-forest" : "bg-parchment";

  return (
    <div className={`${heights[size]} ${bg} flex items-center justify-center`}>
      <span className={`h-1 w-1 rounded-full ${tone === "dark" ? "bg-paper/20" : "bg-ink/15"}`} />
    </div>
  );
}
