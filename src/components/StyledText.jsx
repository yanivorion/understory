import { useMemo } from "react";
import { useSiteConfig } from "../lib/ConfigProvider";
import { resolveTextStyle, textStyleToCss } from "../lib/textStyles";

export function useTextStyle(styleKey) {
  const { config } = useSiteConfig();
  return useMemo(
    () => textStyleToCss(resolveTextStyle(config.textStyles, styleKey)),
    [config.textStyles, styleKey]
  );
}

export default function StyledText({ styleKey, as: Tag = "span", className = "", style, children, ...props }) {
  const textStyle = useTextStyle(styleKey);
  return (
    <Tag className={className} style={{ ...textStyle, ...style }} {...props}>
      {children}
    </Tag>
  );
}
