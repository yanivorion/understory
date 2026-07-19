import { useReveal } from "../lib/useReveal";

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
