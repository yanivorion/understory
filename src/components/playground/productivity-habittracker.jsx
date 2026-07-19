import React from "react";

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: Oct 26, 2025, 04:30 AM
 * Component Type: Productivity.HabitTracker
 * 
* User Request: N/A
*
* Design Brief:
* N/A
 * ============================================================================
 */

/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: Custom Components V9
 * Generated: October 26, 2025, 12:00 PM
 * Component Type: Productivity.HabitTracker
 * 
 * User Request: Make a habit tracker with checkboxes
 * 
 * Design Brief:
 * COMPONENT ANALYSIS
 * Functional Complexity: 3 (Checkbox state management, streak calculation, daily tracking)
 * Expressive Complexity: 3 (Clean grid layout with satisfying check interactions)
 * 
 * USER DESIGN DIRECTION
 * Minimal guidance provided - user requested habit tracker with checkboxes
 * 
 * DESIGN BRIEF
 * Core Concept: A clean habit tracking interface that provides visual feedback
 * on daily completion with streak counts to motivate consistent behavior
 * 
 * Visual Profile: Sophisticated | Clean | Minimalist | Organized
 * 
 * Design Style: Contemporary Minimal with productivity focus
 * - Grid-based layout for clear organization
 * - Large checkboxes for easy interaction
 * - Visual streak indicators for motivation
 * - Clean separation between habits
 * 
 * Visual Techniques: Subtle check animations, progress indicators, hover states
 * 
 * Color Palette: Cool Gray System with success accent
 * - Base 1 (#FAFBFC): Background, card surfaces
 * - Base 2 (#E5E7EB): Borders, unchecked boxes
 * - Base 3 (#6B7280): Secondary text, labels
 * - Base 4 (#1F2937): Primary text, habit names
 * - Accent Success (#10B981): Checked state, streak indicators
 * - Accent Hover (#3B82F6): Hover feedback
 * 
 * Typography:
 * - Font Family: System fonts (clean, professional)
 * - Habit Name: 16px, 500 weight (clear, readable)
 * - Streak Text: 14px, 500 weight (supporting info)
 * - Day Labels: 12px, 500 weight, uppercase, letter-spacing (organized)
 * - Hierarchy: Habit names primary, streaks secondary, days tertiary
 * 
 * Spacing & Layout:
 * - Gap System: 16px between habits, 8px between checkboxes
 * - Grid Layout: 7-column for days of week
 * - Padding Strategy: 20px card padding, 24px container padding
 * - Checkbox Size: 32x32px (comfortable tap target)
 * - Responsive: Stacks tighter on mobile, maintains usability
 * 
 * Interaction Design:
 * - Hover Behavior: Checkbox border changes to accent (200ms)
 * - Active States: Checkbox scales down slightly (0.95) on click
 * - Check Animation: Smooth scale-in with checkmark (300ms ease-out)
 * - Focus Treatment: 2px solid accent ring
 * - Transitions: 200ms ease-out for interactions
 * 
 * Key Animation: 
 * - Checkbox check/uncheck with scale animation (300ms ease-out)
 * - Checkmark fade-in with slight scale (200ms ease-out)
 * - Streak counter updates with subtle pulse (300ms)
 * - Standard appearance transition for initial render
 * 
 * Performance Patterns:
 * - Efficient state management with single habits array
 * - Checkbox state toggling without full re-render
 * - Local storage could be added for persistence
 * - Streak calculation optimized per habit
 * 
 * Design Rationale:
 * The habit tracker uses a familiar calendar-style grid that immediately
 * communicates daily tracking. Large checkboxes ensure accessibility and
 * mobile-friendliness. The cool gray palette keeps the interface calm and
 * professional, while the green accent provides positive reinforcement when
 * habits are completed. Streak counters tap into gamification psychology to
 * encourage consistency. The generous spacing prevents cognitive overload,
 * allowing users to focus on one habit at a time. The clean, organized layout
 * makes it easy to see patterns at a glance - which days are strong, which
 * habits need attention. Every interaction feels satisfying through subtle
 * animations that provide immediate feedback without being distracting. The
 * design prioritizes clarity and motivation over decoration.
 * ============================================================================
 */

const MANIFEST = {
  "type": "Productivity.HabitTracker",
  "description": "Clean habit tracker with daily checkboxes, streak counting, and visual progress. Perfect for building consistent routines and tracking daily habits.",
  "editorElement": {
    "selector": ".habit-tracker",
    "displayName": "Habit Tracker",
    "archetype": "container",
    "data": {
      "habits": {
        "dataType": "text",
        "displayName": "Habits (comma-separated)",
        "defaultValue": "Exercise, Read, Meditate, Drink Water, Early Sleep",
        "group": "Content",
        "description": "Enter habit names separated by commas"
      },
      "showStreaks": {
        "dataType": "booleanValue",
        "displayName": "Show Streak Counter",
        "defaultValue": true,
        "group": "Content"
      },
      "showDayLabels": {
        "dataType": "booleanValue",
        "displayName": "Show Day Labels",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFBFC",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#1F2937",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E7EB",
        "group": "Colors"
      },
      "checkedColor": {
        "dataType": "color",
        "displayName": "Checked Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "habitFontSize": {
        "dataType": "number",
        "displayName": "Habit Name Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "checkboxSize": {
        "dataType": "number",
        "displayName": "Checkbox Size (px)",
        "defaultValue": 32,
        "group": "Layout"
      },
      "cardPadding": {
        "dataType": "number",
        "displayName": "Card Padding (px)",
        "defaultValue": 20,
        "group": "Layout"
      },
      "gapBetweenHabits": {
        "dataType": "number",
        "displayName": "Gap Between Habits (px)",
        "defaultValue": 16,
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const habitsText = config?.habits || "Exercise, Read, Meditate, Drink Water, Early Sleep";
  const showStreaks = config?.showStreaks !== false;
  const showDayLabels = config?.showDayLabels !== false;
  const backgroundColor = config?.backgroundColor || "#FAFBFC";
  const cardBackground = config?.cardBackground || "#FFFFFF";
  const textColor = config?.textColor || "#1F2937";
  const borderColor = config?.borderColor || "#E5E7EB";
  const checkedColor = config?.checkedColor || "#10B981";
  const hoverColor = config?.hoverColor || "#3B82F6";
  const habitFontSize = parseInt(config?.habitFontSize || "16");
  const checkboxSize = parseInt(config?.checkboxSize || "32");
  const cardPadding = parseInt(config?.cardPadding || "20");
  const gapBetweenHabits = parseInt(config?.gapBetweenHabits || "16");

  const habitNames = habitsText.split(',').map(h => h.trim()).filter(h => h);
  
  const [habits, setHabits] = React.useState(() => 
    habitNames.map(name => ({
      name,
      days: Array(7).fill(false)
    }))
  );

  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleDay = (habitIndex, dayIndex) => {
    setHabits(prev => {
      const newHabits = [...prev];
      newHabits[habitIndex] = {
        ...newHabits[habitIndex],
        days: newHabits[habitIndex].days.map((checked, i) => 
          i === dayIndex ? !checked : checked
        )
      };
      return newHabits;
    });
  };

  const calculateStreak = (days) => {
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div 
      ref={containerRef}
      className="habit-tracker"
      style={{
        width: '100%',
        padding: '24px',
        backgroundColor: backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${gapBetweenHabits}px`,
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {habits.map((habit, habitIndex) => {
          const streak = calculateStreak(habit.days);
          
          return (
            <div
              key={habitIndex}
              style={{
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: `${cardPadding}px`,
                opacity: prefersReducedMotion ? 1 : (isVisible ? 1 : 0),
                transform: prefersReducedMotion ? 'none' : (isVisible ? 'translateY(0)' : 'translateY(15px)'),
                transition: prefersReducedMotion ? 'none' : `opacity 400ms ease-out ${habitIndex * 50}ms, transform 400ms ease-out ${habitIndex * 50}ms`
              }}
            >
              {/* Habit Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: showDayLabels ? '12px' : '16px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: `${habitFontSize}px`,
                  fontWeight: '500',
                  color: textColor
                }}>
                  {habit.name}
                </h3>
                
                {showStreaks && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: streak > 0 ? checkedColor : '#6B7280'
                  }}>
                    <span>🔥</span>
                    <span>{streak} day{streak !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Day Labels */}
              {showDayLabels && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(7, ${checkboxSize}px)`,
                  gap: '8px',
                  marginBottom: '8px',
                  justifyContent: 'start'
                }}>
                  {dayLabels.map((label, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6B7280',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em'
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}

              {/* Checkboxes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(7, ${checkboxSize}px)`,
                gap: '8px',
                justifyContent: 'start'
              }}>
                {habit.days.map((isChecked, dayIndex) => (
                  <button
                    key={dayIndex}
                    onClick={() => toggleDay(habitIndex, dayIndex)}
                    aria-label={`${habit.name} - ${dayLabels[dayIndex]}`}
                    aria-pressed={isChecked}
                    style={{
                      width: `${checkboxSize}px`,
                      height: `${checkboxSize}px`,
                      border: `2px solid ${isChecked ? checkedColor : borderColor}`,
                      borderRadius: '6px',
                      backgroundColor: isChecked ? checkedColor : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: prefersReducedMotion ? 'none' : 'all 200ms ease-out',
                      position: 'relative',
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      if (!isChecked && !prefersReducedMotion) {
                        e.currentTarget.style.borderColor = hoverColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isChecked) {
                        e.currentTarget.style.borderColor = borderColor;
                      }
                    }}
                    onMouseDown={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {isChecked && (
                      <svg
                        width={checkboxSize * 0.6}
                        height={checkboxSize * 0.6}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          opacity: prefersReducedMotion ? 1 : undefined,
                          transform: prefersReducedMotion ? 'none' : undefined,
                          animation: prefersReducedMotion ? 'none' : 'checkIn 300ms ease-out'
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes checkIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .habit-tracker button:focus-visible {
          outline: 2px solid ${hoverColor};
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
