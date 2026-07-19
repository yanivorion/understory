import { createContext, useContext, useMemo, useState } from "react";

const EditorUIContext = createContext(null);

export function EditorUIProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const value = useMemo(
    () => ({ open, setOpen, selectedSection, setSelectedSection }),
    [open, selectedSection]
  );

  return <EditorUIContext.Provider value={value}>{children}</EditorUIContext.Provider>;
}

export function useEditorUI() {
  const ctx = useContext(EditorUIContext);
  if (!ctx) throw new Error("useEditorUI must be used inside <EditorUIProvider>");
  return ctx;
}
