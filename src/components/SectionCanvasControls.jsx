import { useState } from "react";
import { useSiteConfig } from "../lib/ConfigProvider";
import { useEditorUI } from "../lib/EditorUIContext";
import {
  createCustomSection,
  defaultBackgroundForSection,
  getSectionLabel,
  insertSection,
  isCustomSectionId,
  removeSection,
  reorderSections,
} from "../lib/homeSections";
import { createPlaygroundSection } from "../lib/playgroundRegistry";
import PlaygroundPicker from "./PlaygroundPicker";

const CHROME = {
  bg: "rgba(23, 19, 12, 0.92)",
  border: "#3a3226",
  text: "#f1ead9",
  muted: "#b7ac96",
  accent: "#c99a5b",
  accentText: "#17130c",
};

export default function SectionCanvasControls({ sectionId, index, total }) {
  const { config, updateLocal } = useSiteConfig();
  const { open, selectedSection, setSelectedSection } = useEditorUI();
  const [pickerOpen, setPickerOpen] = useState(false);

  if (!open) return null;

  const label = getSectionLabel(sectionId, config.customSections);
  const selected = selectedSection === sectionId;

  const setOrder = (nextOrder) => updateLocal({ homeSectionOrder: nextOrder });

  const moveUp = () => {
    if (index <= 0) return;
    setOrder(reorderSections(config.homeSectionOrder, index, index - 1));
  };

  const moveDown = () => {
    if (index >= total - 1) return;
    setOrder(reorderSections(config.homeSectionOrder, index, index + 1));
  };

  const addContentBelow = () => {
    const custom = createCustomSection();
    const order = insertSection(config.homeSectionOrder, index, custom.id);
    updateLocal({
      homeSectionOrder: order,
      customSections: { ...(config.customSections || {}), [custom.id]: custom },
      backgrounds: { [custom.id]: defaultBackgroundForSection(custom.id) },
    });
    setSelectedSection(custom.id);
  };

  const addPlaygroundBelow = (playgroundId) => {
    const section = createPlaygroundSection(playgroundId);
    const order = insertSection(config.homeSectionOrder, index, section.id);
    updateLocal({
      homeSectionOrder: order,
      customSections: { ...(config.customSections || {}), [section.id]: section },
      backgrounds: { [section.id]: defaultBackgroundForSection(section.id) },
    });
    setSelectedSection(section.id);
    setPickerOpen(false);
  };

  const remove = () => {
    if (!isCustomSectionId(sectionId)) return;
    const nextCustom = { ...(config.customSections || {}) };
    delete nextCustom[sectionId];
    const nextBackgrounds = { ...config.backgrounds };
    delete nextBackgrounds[sectionId];
    updateLocal({
      homeSectionOrder: removeSection(config.homeSectionOrder, sectionId),
      customSections: nextCustom,
      backgrounds: nextBackgrounds,
    });
    if (selectedSection === sectionId) setSelectedSection(null);
  };

  return (
    <>
      {pickerOpen && (
        <PlaygroundPicker onSelect={addPlaygroundBelow} onClose={() => setPickerOpen(false)} />
      )}
      <div
        className="absolute left-3 top-3 z-[900] flex items-start gap-2 pointer-events-auto"
        onMouseEnter={() => setSelectedSection(sectionId)}
      >
        <div
          className="rounded-lg px-2 py-2 shadow-lg backdrop-blur-sm"
          style={{
            background: CHROME.bg,
            border: `1px solid ${selected ? CHROME.accent : CHROME.border}`,
            color: CHROME.text,
          }}
        >
          <p className="text-[10px] uppercase tracking-wide mb-2 max-w-[88px] leading-tight" style={{ color: CHROME.muted }}>
            {label}
          </p>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={moveUp}
              disabled={index <= 0}
              className="rounded px-2 py-1 text-xs disabled:opacity-30"
              style={{ background: CHROME.border, color: CHROME.text }}
              title="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={moveDown}
              disabled={index >= total - 1}
              className="rounded px-2 py-1 text-xs disabled:opacity-30"
              style={{ background: CHROME.border, color: CHROME.text }}
              title="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={addContentBelow}
              className="rounded px-2 py-1 text-xs"
              style={{ background: CHROME.accent, color: CHROME.accentText }}
              title="Add content section below"
            >
              + text
            </button>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="rounded px-2 py-1 text-[10px] uppercase tracking-wide"
              style={{ background: "#2a3f5f", color: CHROME.text }}
              title="Add playground component below"
            >
              + cmp
            </button>
            {isCustomSectionId(sectionId) && (
              <button
                type="button"
                onClick={remove}
                className="rounded px-2 py-1 text-xs"
                style={{ background: "#5a2f24", color: "#f5d4c8" }}
                title="Remove section"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
