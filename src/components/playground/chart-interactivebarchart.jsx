import React from "react";

const MANIFEST = {
  "type": "Chart.InteractiveBarChart",
  "description": "Interactive bar chart with hover tooltips and smooth animations",
  "editorElement": {
    "selector": ".bar-chart-container",
    "displayName": "Interactive Bar Chart",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Chart Title",
        "defaultValue": "Monthly Revenue",
        "group": "Content"
      },
      "subtitle": {
        "dataType": "text",
        "displayName": "Chart Subtitle",
        "defaultValue": "Revenue performance across quarters",
        "group": "Content"
      },
      "labels": {
        "dataType": "text",
        "displayName": "X-Axis Labels (comma separated)",
        "defaultValue": "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
        "group": "Content"
      },
      "datasets": {
        "dataType": "text",
        "displayName": "Datasets JSON",
        "defaultValue": '[{"label":"2023","data":[45,52,48,61,55,67,59,72,68,75,71,82],"color":"#1A1A1A"},{"label":"2024","data":[52,58,55,68,72,78,75,85,82,88,85,95],"color":"#6B6B6B"}]',
        "group": "Content"
      },
      "yAxisLabel": {
        "dataType": "text",
        "displayName": "Y-Axis Label",
        "defaultValue": "Revenue ($K)",
        "group": "Content"
      },
      "showLegend": {
        "dataType": "booleanValue",
        "displayName": "Show Legend",
        "defaultValue": "true",
        "group": "Content"
      },
      "showGrid": {
        "dataType": "booleanValue",
        "displayName": "Show Grid Lines",
        "defaultValue": "true",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "chartBackgroundColor": {
        "dataType": "color",
        "displayName": "Chart Background",
        "defaultValue": "#FAFAFA",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text Color",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text Color",
        "defaultValue": "#6B6B6B",
        "group": "Colors"
      },
      "gridColor": {
        "dataType": "color",
        "displayName": "Grid Line Color",
        "defaultValue": "rgba(0,0,0,0.08)",
        "group": "Colors"
      },
      "tooltipBackgroundColor": {
        "dataType": "color",
        "displayName": "Tooltip Background",
        "defaultValue": "#1A1A1A",
        "group": "Colors"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Inter, -apple-system, system-ui, sans-serif",
        "options": [
          "Inter, -apple-system, system-ui, sans-serif",
          "SF Pro Display, -apple-system, sans-serif",
          "Helvetica Neue, Helvetica, Arial, sans-serif"
        ],
        "group": "Typography"
      },
      "titleSize": {
        "dataType": "select",
        "displayName": "Title Font Size",
        "defaultValue": "24px",
        "options": ["20px", "24px", "28px", "32px"],
        "group": "Typography"
      },
      "labelSize": {
        "dataType": "select",
        "displayName": "Label Font Size",
        "defaultValue": "12px",
        "options": ["10px", "12px", "14px"],
        "group": "Typography"
      },
      "chartMaxWidth": {
        "dataType": "select",
        "displayName": "Chart Max Width",
        "defaultValue": "1000px",
        "options": ["800px", "900px", "1000px", "1200px", "100%"],
        "group": "Layout"
      },
      "chartHeight": {
        "dataType": "select",
        "displayName": "Chart Height",
        "defaultValue": "400px",
        "options": ["300px", "350px", "400px", "450px", "500px"],
        "group": "Layout"
      },
      "barWidth": {
        "dataType": "select",
        "displayName": "Bar Width",
        "defaultValue": "60%",
        "options": ["40%", "50%", "60%", "70%", "80%"],
        "group": "Layout"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius",
        "defaultValue": "8px",
        "options": ["0px", "4px", "6px", "8px", "12px"],
        "group": "Layout"
      },
      "barBorderRadius": {
        "dataType": "select",
        "displayName": "Bar Border Radius",
        "defaultValue": "4px",
        "options": ["0px", "2px", "4px", "6px", "8px"],
        "group": "Layout"
      },
      "animationDuration": {
        "dataType": "number",
        "displayName": "Animation Duration (ms)",
        "defaultValue": "800",
        "group": "Animation"
      },
      "barStagger": {
        "dataType": "number",
        "displayName": "Bar Stagger Delay (ms)",
        "defaultValue": "50",
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [hoveredBar, setHoveredBar] = React.useState(null);
  const [tooltip, setTooltip] = React.useState({ show: false, x: 0, y: 0, data: null });
  const chartRef = React.useRef(null);
  const barsRef = React.useRef([]);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  // Safe config extraction
  const labels = React.useMemo(() => {
    return (config?.labels || MANIFEST.editorElement.data.labels.defaultValue).split(',').map(l => l.trim());
  }, [config?.labels]);

  const datasets = React.useMemo(() => {
    try {
      return JSON.parse(config?.datasets || MANIFEST.editorElement.data.datasets.defaultValue);
    } catch (e) {
      return JSON.parse(MANIFEST.editorElement.data.datasets.defaultValue);
    }
  }, [config?.datasets]);

  const showLegend = config?.showLegend !== false;
  const showGrid = config?.showGrid !== false;
  const animationDuration = parseInt(config?.animationDuration || '800');
  const barStagger = parseInt(config?.barStagger || '50');

  // Calculate max value for scaling
  const maxValue = React.useMemo(() => {
    const allValues = datasets.flatMap(ds => ds.data);
    return Math.max(...allValues);
  }, [datasets]);

  // PATTERN 7: Scroll-triggered animation
  React.useEffect(() => {
    if (!chartRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          
          // PATTERN 1: Direct DOM animation for bars
          barsRef.current.forEach((bar, index) => {
            if (!bar) return;

            setTimeout(() => {
              bar.animate([
                { transform: 'scaleY(0)', transformOrigin: 'bottom' },
                { transform: 'scaleY(1)', transformOrigin: 'bottom' }
              ], {
                duration: animationDuration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
              });
            }, index * barStagger);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, animationDuration, barStagger]);

  const handleBarHover = (datasetIndex, labelIndex, event, value, label, datasetLabel) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredBar({ datasetIndex, labelIndex });
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      data: { value, label, datasetLabel }
    });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '600px',
      padding: '48px 24px',
      backgroundColor: config?.backgroundColor || '#FFFFFF',
      fontFamily: config?.fontFamily || 'Inter, -apple-system, system-ui, sans-serif'
    },
    inner: {
      maxWidth: config?.chartMaxWidth || '1000px',
      margin: '0 auto',
      backgroundColor: config?.chartBackgroundColor || '#FAFAFA',
      borderRadius: config?.borderRadius || '8px',
      padding: '32px'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: config?.titleSize || '24px',
      fontWeight: '500',
      color: config?.primaryTextColor || '#1A1A1A',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '14px',
      color: config?.secondaryTextColor || '#6B6B6B',
      lineHeight: '1.6'
    },
    legend: {
      display: showLegend ? 'flex' : 'none',
      gap: '24px',
      marginBottom: '32px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: config?.primaryTextColor || '#1A1A1A'
    },
    legendColor: {
      width: '16px',
      height: '16px',
      borderRadius: '3px'
    },
    chartArea: {
      position: 'relative',
      height: config?.chartHeight || '400px',
      display: 'flex'
    },
    yAxis: {
      width: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingRight: '12px'
    },
    yAxisLabel: {
      fontSize: config?.labelSize || '12px',
      color: config?.secondaryTextColor || '#6B6B6B',
      textAlign: 'right'
    },
    chartContent: {
      flex: '1',
      position: 'relative',
      borderLeft: `1px solid ${config?.gridColor || 'rgba(0,0,0,0.08)'}`,
      borderBottom: `1px solid ${config?.gridColor || 'rgba(0,0,0,0.08)'}`
    },
    gridLines: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      pointerEvents: 'none'
    },
    gridLine: {
      position: 'absolute',
      left: '0',
      right: '0',
      height: '1px',
      backgroundColor: config?.gridColor || 'rgba(0,0,0,0.08)'
    },
    barsContainer: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '2%',
      padding: '0 2%'
    },
    barGroup: {
      flex: '1',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '4px',
      maxWidth: '120px'
    },
    bar: {
      flex: '1',
      borderRadius: `${config?.barBorderRadius || '4px'} ${config?.barBorderRadius || '4px'} 0 0`,
      cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scaleY(0)',
      transformOrigin: 'bottom',
      maxWidth: config?.barWidth || '60%'
    },
    xAxis: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '12px',
      marginLeft: '60px',
      gap: '2%',
      padding: '0 2%'
    },
    xAxisLabel: {
      flex: '1',
      textAlign: 'center',
      fontSize: config?.labelSize || '12px',
      color: config?.secondaryTextColor || '#6B6B6B',
      maxWidth: '120px'
    },
    tooltip: {
      position: 'fixed',
      backgroundColor: config?.tooltipBackgroundColor || '#1A1A1A',
      color: '#FFFFFF',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      pointerEvents: 'none',
      zIndex: '1000',
      whiteSpace: 'nowrap',
      transform: 'translate(-50%, -100%)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      opacity: tooltip.show ? '1' : '0',
      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    },
    tooltipArrow: {
      position: 'absolute',
      bottom: '-4px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: `4px solid ${config?.tooltipBackgroundColor || '#1A1A1A'}`
    }
  };

  // Generate Y-axis labels
  const yAxisSteps = 5;
  const yAxisLabels = Array.from({ length: yAxisSteps }, (_, i) => {
    const value = Math.round((maxValue / (yAxisSteps - 1)) * (yAxisSteps - 1 - i));
    return value;
  });

  return (
    <div style={styles.container} className="bar-chart-container">
      <div style={styles.inner} ref={chartRef}>
        <div style={styles.header}>
          <h2 style={styles.title}>{config?.title || 'Monthly Revenue'}</h2>
          <p style={styles.subtitle}>{config?.subtitle || 'Revenue performance across quarters'}</p>
        </div>

        <div style={styles.legend}>
          {datasets.map((dataset, idx) => (
            <div key={idx} style={styles.legendItem}>
              <div style={{...styles.legendColor, backgroundColor: dataset.color}} />
              <span>{dataset.label}</span>
            </div>
          ))}
        </div>

        <div style={styles.chartArea}>
          <div style={styles.yAxis}>
            {yAxisLabels.map((label, idx) => (
              <div key={idx} style={styles.yAxisLabel}>
                {label}
              </div>
            ))}
          </div>

          <div style={styles.chartContent}>
            {showGrid && (
              <div style={styles.gridLines}>
                {yAxisLabels.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.gridLine,
                      top: `${(100 / (yAxisSteps - 1)) * idx}%`
                    }}
                  />
                ))}
              </div>
            )}

            <div style={styles.barsContainer}>
              {labels.map((label, labelIdx) => (
                <div key={labelIdx} style={styles.barGroup}>
                  {datasets.map((dataset, datasetIdx) => {
                    const value = dataset.data[labelIdx];
                    const heightPercent = (value / maxValue) * 100;
                    const isHovered = hoveredBar?.datasetIndex === datasetIdx && hoveredBar?.labelIndex === labelIdx;

                    return (
                      <div
                        key={datasetIdx}
                        ref={el => barsRef.current[labelIdx * datasets.length + datasetIdx] = el}
                        style={{
                          ...styles.bar,
                          height: `${heightPercent}%`,
                          backgroundColor: dataset.color,
                          opacity: isHovered ? '0.8' : '1',
                          transform: isHovered ? 'scaleY(1) scaleX(1.05)' : 'scaleY(1) scaleX(1)'
                        }}
                        onMouseEnter={(e) => handleBarHover(datasetIdx, labelIdx, e, value, label, dataset.label)}
                        onMouseLeave={handleBarLeave}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.xAxis}>
          {labels.map((label, idx) => (
            <div key={idx} style={styles.xAxisLabel}>{label}</div>
          ))}
        </div>
      </div>

      {tooltip.show && tooltip.data && (
        <div style={{...styles.tooltip, left: `${tooltip.x}px`, top: `${tooltip.y}px`}}>
          <div>{tooltip.data.datasetLabel}: ${tooltip.data.value}K</div>
          <div style={{fontSize: '11px', opacity: '0.8'}}>{tooltip.data.label}</div>
          <div style={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
