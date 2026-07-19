import { useEditorUI } from "../lib/EditorUIContext";
import SectionCanvasControls from "./SectionCanvasControls";

/**
 * Wraps each home page section for editor canvas controls and a subtle
 * selection ring while the side panel is open.
 */
export default function HomeSectionShell({ sectionId, index, total, children }) {
  const { open, selectedSection, setSelectedSection } = useEditorUI();
  const selected = open && selectedSection === sectionId;

  return (
    <div
      data-section-id={sectionId}
      className={`relative overflow-visible ${open ? "outline outline-1 outline-offset-[-1px]" : ""} ${
        selected ? "outline-amber/70" : open ? "outline-white/10 hover:outline-amber/35" : ""
      }`}
      onMouseEnter={() => open && setSelectedSection(sectionId)}
    >
      <SectionCanvasControls sectionId={sectionId} index={index} total={total} />
      {children}
    </div>
  );
}
