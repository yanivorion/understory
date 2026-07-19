import React from "react";

const MANIFEST = {
  "type": "Generative.AlgorithmicText",
  "description": "Sophisticated generative typography system with 16 mathematical algorithms transforming text into living visualizations - from physarum simulations to Lorenz attractors",
  "editorElement": {
    "selector": ".generative-text-container",
    "displayName": "Generative Algorithmic Text",
    "archetype": "container",
    "data": {
      "text1": {
        "dataType": "text",
        "displayName": "First Line",
        "defaultValue": "IGNITE",
        "group": "Content",
        "description": "First line of text to visualize"
      },
      "text2": {
        "dataType": "text",
        "displayName": "Second Line",
        "defaultValue": "CREATIVITY",
        "group": "Content",
        "description": "Second line of text to visualize"
      },
      "algorithm": {
        "dataType": "select",
        "displayName": "Algorithm",
        "defaultValue": "physarum",
        "options": [
          "physarum",
          "flowfield",
          "boids",
          "reactionDiffusion",
          "gameOfLife",
          "dla",
          "circlePacking",
          "lorenz",
          "waveInterference",
          "langtonsAnt",
          "lissajous",
          "brownianTree",
          "spirograph",
          "cellularAutomata",
          "voronoi",
          "particleGravity"
        ],
        "group": "Algorithm",
        "description": "Select generative algorithm"
      },
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Density",
        "defaultValue": "medium",
        "options": ["low", "medium", "high", "ultra"],
        "group": "Algorithm",
        "description": "Number of particles/agents"
      },
      "speed": {
        "dataType": "select",
        "displayName": "Animation Speed",
        "defaultValue": "1",
        "options": ["0.5", "0.75", "1", "1.25", "1.5", "2"],
        "group": "Algorithm",
        "description": "Animation speed multiplier"
      },
      "trailLength": {
        "dataType": "select",
        "displayName": "Trail Length",
        "defaultValue": "medium",
        "options": ["none", "short", "medium", "long"],
        "group": "Algorithm",
        "description": "Length of particle trails"
      },
      "resetInterval": {
        "dataType": "select",
        "displayName": "Auto Reset (seconds)",
        "defaultValue": "10",
        "options": ["5", "10", "15", "20", "30", "never"],
        "group": "Algorithm",
        "description": "Auto-reset interval"
      },
      "showResetButton": {
        "dataType": "booleanValue",
        "displayName": "Show Reset Button",
        "defaultValue": "true",
        "group": "Content"
      },
      "resetButtonText": {
        "dataType": "text",
        "displayName": "Reset Button Text",
        "defaultValue": "Reset",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryColor": {
        "dataType": "color",
        "displayName": "Primary Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "secondaryColor": {
        "dataType": "color",
        "displayName": "Secondary Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "buttonTextColor": {
        "dataType": "color",
        "displayName": "Button Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "buttonBorderColor": {
        "dataType": "color",
        "displayName": "Button Border Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "buttonHoverColor": {
        "dataType": "color",
        "displayName": "Button Hover Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size Factor",
        "defaultValue": 8,
        "group": "Typography",
        "description": "Divisor for width (smaller = larger text)"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "bold",
        "options": ["normal", "bold"],
        "group": "Typography"
      },
      "fontFamily": {
        "dataType": "select",
        "displayName": "Font Family",
        "defaultValue": "Arial, sans-serif",
        "options": ["Arial, sans-serif", "Georgia, serif", "Courier New, monospace", "Verdana, sans-serif", "Impact, sans-serif"],
        "group": "Typography"
      },
      "containerHeight": {
        "dataType": "select",
        "displayName": "Container Height",
        "defaultValue": "500",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Layout"
      },
      "lineSpacing": {
        "dataType": "select",
        "displayName": "Line Spacing",
        "defaultValue": "0.6",
        "options": ["0.4", "0.5", "0.6", "0.7", "0.8"],
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
  const canvasRef = React.useRef(null);
  const textCanvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const stateRef = React.useRef({});
  
  // Safe config access
  const text1 = config?.text1 || 'IGNITE';
  const text2 = config?.text2 || 'CREATIVITY';
  const algorithm = config?.algorithm || 'physarum';
  const particleCount = config?.particleCount || 'medium';
  const speed = parseFloat(config?.speed || '1');
  const trailLength = config?.trailLength || 'medium';
  const resetInterval = config?.resetInterval || '10';
  const showResetButton = config?.showResetButton !== false;
  const resetButtonText = config?.resetButtonText || 'Reset';
  
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const primaryColor = config?.primaryColor || '#212529';
  const secondaryColor = config?.secondaryColor || '#495057';
  const accentColor = config?.accentColor || '#6C757D';
  const buttonTextColor = config?.buttonTextColor || '#212529';
  const buttonBorderColor = config?.buttonBorderColor || '#DEE2E6';
  const buttonHoverColor = config?.buttonHoverColor || '#F8F9FA';
  
  const fontSizeFactor = parseInt(config?.fontSize || '8');
  const fontWeight = config?.fontWeight || 'bold';
  const fontFamily = config?.fontFamily || 'Arial, sans-serif';
  const containerHeight = parseInt(config?.containerHeight || '500');
  const lineSpacing = parseFloat(config?.lineSpacing || '0.6');

  const [isHovered, setIsHovered] = React.useState(false);

  const getParticleCount = React.useCallback(() => {
    const counts = { low: 500, medium: 1500, high: 3000, ultra: 5000 };
    return counts[particleCount] || 1500;
  }, [particleCount]);

  const getTrailDecay = React.useCallback(() => {
    const decays = { none: 1.0, short: 0.98, medium: 0.95, long: 0.9 };
    return decays[trailLength] || 0.95;
  }, [trailLength]);

  const hexToRgb = React.useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 33, g: 37, b: 41 };
  }, []);

  // Noise function for flow field
  const createNoise = React.useCallback(() => {
    const perm = [];
    for (let i = 0; i < 512; i++) perm[i] = Math.floor(Math.random() * 256);
    
    const lerp = (t, a, b) => a + t * (b - a);
    const grad = (hash, x, y, z) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };
    
    return (x, y, z) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      const u = x * x * (3 - 2 * x);
      const v = y * y * (3 - 2 * y);
      const w = z * z * (3 - 2 * z);
      const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
      const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
      return lerp(w, lerp(v, lerp(u, grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z)),
        lerp(u, grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z))),
        lerp(v, lerp(u, grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1)),
        lerp(u, grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1))));
    };
  }, []);

  const createTextMask = React.useCallback((ctx, width, height) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.min(width / fontSizeFactor, height / 3);
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillText(text1, width / 2, height / 2 - fontSize * lineSpacing);
    ctx.fillText(text2, width / 2, height / 2 + fontSize * lineSpacing);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const mask = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      mask[i] = imageData.data[i * 4] > 128 ? 1 : 0;
    }
    return mask;
  }, [text1, text2, fontSizeFactor, fontWeight, fontFamily, lineSpacing]);

  const getTextPoints = React.useCallback((mask, width, height, step = 3) => {
    const points = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (mask[y * width + x]) {
          points.push({ x, y });
        }
      }
    }
    return points;
  }, []);

  // Algorithm implementations
  const algorithms = React.useMemo(() => ({
    // Physarum (Slime Mold)
    physarum: {
      init: (width, height, mask, points) => {
        const agents = [];
        const count = Math.min(getParticleCount(), points.length * 2);
        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          agents.push({
            x: pt.x + (Math.random() - 0.5) * 10,
            y: pt.y + (Math.random() - 0.5) * 10,
            angle: Math.random() * Math.PI * 2
          });
        }
        return {
          agents,
          trailMap: new Float32Array(width * height),
          sensorAngle: 45 * Math.PI / 180,
          turnAngle: 45 * Math.PI / 180
        };
      },
      update: (state, width, height, mask, points) => {
        const { agents, trailMap, sensorAngle, turnAngle } = state;
        const sense = (x, y, angle) => {
          const dist = 9;
          const sx = Math.floor(x + Math.cos(angle) * dist);
          const sy = Math.floor(y + Math.sin(angle) * dist);
          if (sx < 0 || sx >= width || sy < 0 || sy >= height) return 0;
          let val = trailMap[sy * width + sx];
          for (let i = 0; i < points.length; i += 10) {
            const pt = points[i];
            const dx = sx - pt.x, dy = sy - pt.y;
            if (dx * dx + dy * dy < 225) { val += 0.5; break; }
          }
          return val;
        };

        for (let i = 0; i < agents.length; i++) {
          const agent = agents[i];
          const fwd = sense(agent.x, agent.y, agent.angle);
          const left = sense(agent.x, agent.y, agent.angle - sensorAngle);
          const right = sense(agent.x, agent.y, agent.angle + sensorAngle);

          if (fwd < left && fwd < right) {
            agent.angle += (Math.random() - 0.5) * 2 * turnAngle;
          } else if (left < right) {
            agent.angle += turnAngle * speed;
          } else if (right < left) {
            agent.angle -= turnAngle * speed;
          }

          agent.x += Math.cos(agent.angle) * speed;
          agent.y += Math.sin(agent.angle) * speed;

          // Constrain to text area
          let nearText = false;
          for (let j = 0; j < points.length; j += 10) {
            const pt = points[j];
            const dx = agent.x - pt.x, dy = agent.y - pt.y;
            if (dx * dx + dy * dy < 900) { nearText = true; break; }
          }
          if (!nearText && points.length > 0) {
            let nearest = points[0], nearestDist = Infinity;
            for (let j = 0; j < points.length; j += 10) {
              const pt = points[j];
              const dx = pt.x - agent.x, dy = pt.y - agent.y;
              const dist = dx * dx + dy * dy;
              if (dist < nearestDist) { nearestDist = dist; nearest = pt; }
            }
            const targetAngle = Math.atan2(nearest.y - agent.y, nearest.x - agent.x);
            agent.angle += (targetAngle - agent.angle) * 0.1;
          }

          if (agent.x < 0) agent.x = width - 1;
          if (agent.x >= width) agent.x = 0;
          if (agent.y < 0) agent.y = height - 1;
          if (agent.y >= height) agent.y = 0;

          const ix = Math.floor(agent.x), iy = Math.floor(agent.y);
          if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
            trailMap[iy * width + ix] = 1;
          }
        }

        const decay = getTrailDecay();
        for (let i = 0; i < trailMap.length; i++) {
          trailMap[i] *= decay;
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { trailMap } = state;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const rgb = hexToRgb(colors.primary);
        const bgRgb = hexToRgb(colors.background);

        for (let i = 0; i < trailMap.length; i++) {
          const val = trailMap[i];
          const idx = i * 4;
          data[idx] = bgRgb.r - (bgRgb.r - rgb.r) * val;
          data[idx + 1] = bgRgb.g - (bgRgb.g - rgb.g) * val;
          data[idx + 2] = bgRgb.b - (bgRgb.b - rgb.b) * val;
          data[idx + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    },

    // Flow Field
    flowfield: {
      init: (width, height, mask, points) => {
        const particles = [];
        const count = Math.min(getParticleCount(), points.length * 2);
        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          particles.push({
            x: pt.x, y: pt.y,
            prevX: pt.x, prevY: pt.y,
            origX: pt.x, origY: pt.y
          });
        }
        return { particles, noise: createNoise(), noiseZ: Math.random() * 1000 };
      },
      update: (state, width, height, mask, points) => {
        const { particles, noise } = state;
        state.noiseZ += 0.002 * speed;
        const noiseScale = 0.003;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.prevX = p.x;
          p.prevY = p.y;

          const angle = noise(p.x * noiseScale, p.y * noiseScale, state.noiseZ) * Math.PI * 4;
          const newX = p.x + Math.cos(angle) * 1.5 * speed;
          const newY = p.y + Math.sin(angle) * 1.5 * speed;

          const ix = Math.floor(newX), iy = Math.floor(newY);
          if (ix >= 0 && ix < width && iy >= 0 && iy < height && mask[iy * width + ix]) {
            p.x = newX;
            p.y = newY;
          } else {
            if (Math.random() < 0.1) {
              p.x = p.origX + (Math.random() - 0.5) * 5;
              p.y = p.origY + (Math.random() - 0.5) * 5;
              p.prevX = p.x;
              p.prevY = p.y;
            } else {
              const newAngle = angle + Math.PI * (0.5 + Math.random());
              const nx = p.x + Math.cos(newAngle);
              const ny = p.y + Math.sin(newAngle);
              const nix = Math.floor(nx), niy = Math.floor(ny);
              if (nix >= 0 && nix < width && niy >= 0 && niy < height && mask[niy * width + nix]) {
                p.x = nx;
                p.y = ny;
              }
            }
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { particles } = state;
        const decay = getTrailDecay();
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - decay})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.15)`;
        ctx.lineWidth = 0.8;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - p.prevX, dy = p.y - p.prevY;
          if (Math.sqrt(dx * dx + dy * dy) < 5) {
            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }
    },

    // Boids
    boids: {
      init: (width, height, mask, points) => {
        const boids = [];
        const count = Math.min(getParticleCount() / 2, 800);
        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          boids.push({
            x: pt.x, y: pt.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            targetX: pt.x, targetY: pt.y
          });
        }
        return { boids };
      },
      update: (state, width, height, mask, points) => {
        const { boids } = state;
        for (let i = 0; i < boids.length; i++) {
          const b = boids[i];
          let sepX = 0, sepY = 0, sepCount = 0;
          let aliX = 0, aliY = 0, aliCount = 0;
          let cohX = 0, cohY = 0, cohCount = 0;

          for (let j = 0; j < boids.length; j++) {
            if (i === j) continue;
            const other = boids[j];
            const dx = b.x - other.x, dy = b.y - other.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < 15 && d > 0) {
              sepX += dx / d; sepY += dy / d; sepCount++;
            }
            if (d < 30) {
              aliX += other.vx; aliY += other.vy; aliCount++;
              cohX += other.x; cohY += other.y; cohCount++;
            }
          }

          if (sepCount > 0) { b.vx += sepX / sepCount * 0.08 * speed; b.vy += sepY / sepCount * 0.08 * speed; }
          if (aliCount > 0) { b.vx += (aliX / aliCount - b.vx) * 0.05 * speed; b.vy += (aliY / aliCount - b.vy) * 0.05 * speed; }
          if (cohCount > 0) { b.vx += (cohX / cohCount - b.x) * 0.002 * speed; b.vy += (cohY / cohCount - b.y) * 0.002 * speed; }

          b.vx += (b.targetX - b.x) * 0.01 * speed;
          b.vy += (b.targetY - b.y) * 0.01 * speed;

          const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (spd > 4) { b.vx = (b.vx / spd) * 4; b.vy = (b.vy / spd) * 4; }

          b.x += b.vx;
          b.y += b.vy;
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { boids } = state;
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;

        for (let i = 0; i < boids.length; i++) {
          const b = boids[i];
          const angle = Math.atan2(b.vy, b.vx);
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(6, 0);
          ctx.lineTo(-3, 2);
          ctx.lineTo(-3, -2);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    },

    // Reaction Diffusion
    reactionDiffusion: {
      init: (width, height, mask) => {
        const w = Math.floor(width / 2);
        const h = Math.floor(height / 2);
        const gridA = new Float32Array(w * h);
        const gridB = new Float32Array(w * h);
        const nextA = new Float32Array(w * h);
        const nextB = new Float32Array(w * h);

        for (let i = 0; i < w * h; i++) {
          gridA[i] = 1;
          const x = i % w, y = Math.floor(i / w);
          const mx = Math.floor(x * 2), my = Math.floor(y * 2);
          if (mx < width && my < height && mask[my * width + mx]) {
            gridB[i] = 1;
          } else {
            gridB[i] = 0;
          }
        }
        return { gridA, gridB, nextA, nextB, w, h, dA: 1.0, dB: 0.5, feed: 0.055, kill: 0.062 };
      },
      update: (state) => {
        const { gridA, gridB, nextA, nextB, w, h, dA, dB, feed, kill } = state;
        const laplacian = (grid, x, y) => {
          let sum = grid[y * w + x] * -1;
          sum += (x > 0 ? grid[y * w + x - 1] : grid[y * w + x]) * 0.2;
          sum += (x < w - 1 ? grid[y * w + x + 1] : grid[y * w + x]) * 0.2;
          sum += (y > 0 ? grid[(y - 1) * w + x] : grid[y * w + x]) * 0.2;
          sum += (y < h - 1 ? grid[(y + 1) * w + x] : grid[y * w + x]) * 0.2;
          sum += (x > 0 && y > 0 ? grid[(y - 1) * w + x - 1] : grid[y * w + x]) * 0.05;
          sum += (x < w - 1 && y > 0 ? grid[(y - 1) * w + x + 1] : grid[y * w + x]) * 0.05;
          sum += (x > 0 && y < h - 1 ? grid[(y + 1) * w + x - 1] : grid[y * w + x]) * 0.05;
          sum += (x < w - 1 && y < h - 1 ? grid[(y + 1) * w + x + 1] : grid[y * w + x]) * 0.05;
          return sum;
        };

        for (let iter = 0; iter < Math.ceil(5 * speed); iter++) {
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const idx = y * w + x;
              const a = gridA[idx], b = gridB[idx];
              const laplaceA = laplacian(gridA, x, y);
              const laplaceB = laplacian(gridB, x, y);
              const reaction = a * b * b;
              nextA[idx] = Math.max(0, Math.min(1, a + (dA * laplaceA - reaction + feed * (1 - a))));
              nextB[idx] = Math.max(0, Math.min(1, b + (dB * laplaceB + reaction - (kill + feed) * b)));
            }
          }
          for (let i = 0; i < gridA.length; i++) {
            gridA[i] = nextA[i];
            gridB[i] = nextB[i];
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { gridB, w, h } = state;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const rgb = hexToRgb(colors.primary);
        const bgRgb = hexToRgb(colors.background);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const sx = Math.floor(x / 2), sy = Math.floor(y / 2);
            const val = (sx < w && sy < h) ? gridB[sy * w + sx] : 0;
            const idx = (y * width + x) * 4;
            data[idx] = bgRgb.r + (rgb.r - bgRgb.r) * val;
            data[idx + 1] = bgRgb.g + (rgb.g - bgRgb.g) * val;
            data[idx + 2] = bgRgb.b + (rgb.b - bgRgb.b) * val;
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    },

    // Game of Life
    gameOfLife: {
      init: (width, height, mask) => {
        const cellSize = 4;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const grid = new Uint8Array(cols * rows);
        const nextGrid = new Uint8Array(cols * rows);
        const scaledMask = new Uint8Array(cols * rows);

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const mx = Math.floor(x * cellSize), my = Math.floor(y * cellSize);
            if (mx < width && my < height && mask[my * width + mx]) {
              scaledMask[y * cols + x] = 1;
              grid[y * cols + x] = Math.random() > 0.4 ? 1 : 0;
            }
          }
        }
        return { grid, nextGrid, scaledMask, cols, rows, cellSize, frameCount: 0 };
      },
      update: (state) => {
        const { grid, nextGrid, scaledMask, cols, rows } = state;
        state.frameCount++;
        if (state.frameCount % Math.max(1, Math.floor(3 / speed)) !== 0) return;

        const countNeighbors = (x, y) => {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + cols) % cols;
              const ny = (y + dy + rows) % rows;
              count += grid[ny * cols + nx];
            }
          }
          return count;
        };

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = y * cols + x;
            const neighbors = countNeighbors(x, y);
            const alive = grid[idx];
            if (alive && (neighbors < 2 || neighbors > 3)) {
              nextGrid[idx] = 0;
            } else if (!alive && neighbors === 3) {
              nextGrid[idx] = 1;
            } else {
              nextGrid[idx] = alive;
            }
            if (scaledMask[idx] && !nextGrid[idx] && Math.random() < 0.01) {
              nextGrid[idx] = 1;
            }
          }
        }
        for (let i = 0; i < grid.length; i++) grid[i] = nextGrid[i];
      },
      render: (ctx, state, width, height, colors) => {
        const { grid, cols, rows, cellSize } = state;
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (grid[y * cols + x]) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
          }
        }
      }
    },

    // DLA (Diffusion Limited Aggregation)
    dla: {
      init: (width, height, mask, points) => {
        const tree = [];
        const treeGrid = new Uint8Array(width * height);
        const walkers = [];
        const count = Math.min(getParticleCount() / 5, 200);

        const seedCount = Math.floor(points.length / 50);
        for (let i = 0; i < seedCount; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          tree.push({ x: pt.x, y: pt.y });
          const idx = Math.floor(pt.y) * width + Math.floor(pt.x);
          if (idx >= 0 && idx < treeGrid.length) treeGrid[idx] = 1;
        }

        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          walkers.push({ x: pt.x + (Math.random() - 0.5) * 50, y: pt.y + (Math.random() - 0.5) * 50 });
        }

        return { tree, treeGrid, walkers };
      },
      update: (state, width, height, mask, points) => {
        const { tree, treeGrid, walkers } = state;
        const hasNeighbor = (x, y) => {
          const ix = Math.floor(x), iy = Math.floor(y);
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const nx = ix + dx, ny = iy + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (treeGrid[ny * width + nx]) return true;
              }
            }
          }
          return false;
        };

        const isNearText = (x, y) => {
          for (let i = 0; i < points.length; i += 5) {
            const pt = points[i];
            const dx = x - pt.x, dy = y - pt.y;
            if (dx * dx + dy * dy < 400) return true;
          }
          return false;
        };

        for (let iter = 0; iter < Math.ceil(30 * speed); iter++) {
          for (let i = 0; i < walkers.length; i++) {
            const w = walkers[i];
            w.x += (Math.random() - 0.5) * 4;
            w.y += (Math.random() - 0.5) * 4;

            if (!isNearText(w.x, w.y) && points.length > 0) {
              const pt = points[Math.floor(Math.random() * points.length)];
              w.x = pt.x + (Math.random() - 0.5) * 50;
              w.y = pt.y + (Math.random() - 0.5) * 50;
              continue;
            }

            if (hasNeighbor(w.x, w.y)) {
              tree.push({ x: w.x, y: w.y });
              const idx = Math.floor(w.y) * width + Math.floor(w.x);
              if (idx >= 0 && idx < treeGrid.length) treeGrid[idx] = 1;
              if (points.length > 0) {
                const pt = points[Math.floor(Math.random() * points.length)];
                w.x = pt.x + (Math.random() - 0.5) * 50;
                w.y = pt.y + (Math.random() - 0.5) * 50;
              }
            }
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { tree } = state;
        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;
        for (let i = Math.max(0, tree.length - 50); i < tree.length; i++) {
          const t = tree[i];
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },

    // Circle Packing
    circlePacking: {
      init: (width, height, mask) => {
        return { circles: [], growing: [], mask };
      },
      update: (state, width, height, mask) => {
        const { circles, growing } = state;
        const isInText = (x, y) => {
          const ix = Math.floor(x), iy = Math.floor(y);
          if (ix < 0 || ix >= width || iy < 0 || iy >= height) return false;
          return mask[iy * width + ix] === 1;
        };

        // Add new circles
        for (let a = 0; a < Math.ceil(5 * speed); a++) {
          for (let attempts = 0; attempts < 100; attempts++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            if (!isInText(x, y)) continue;

            let valid = true;
            for (let j = 0; j < circles.length; j++) {
              const c = circles[j];
              const dx = x - c.x, dy = y - c.y;
              if (Math.sqrt(dx * dx + dy * dy) < c.r + 2) {
                valid = false;
                break;
              }
            }
            if (valid) {
              const circle = { x, y, r: 1 };
              circles.push(circle);
              growing.push(circle);
              break;
            }
          }
        }

        // Grow circles
        for (let i = growing.length - 1; i >= 0; i--) {
          const c = growing[i];
          let canGrow = isInText(c.x - c.r, c.y) && isInText(c.x + c.r, c.y) &&
                        isInText(c.x, c.y - c.r) && isInText(c.x, c.y + c.r);

          if (canGrow) {
            for (let j = 0; j < circles.length; j++) {
              if (circles[j] === c) continue;
              const other = circles[j];
              const dx = c.x - other.x, dy = c.y - other.y;
              if (Math.sqrt(dx * dx + dy * dy) < c.r + other.r + 1) {
                canGrow = false;
                break;
              }
            }
          }

          if (canGrow) {
            c.r += 0.3 * speed;
          } else {
            growing.splice(i, 1);
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { circles } = state;
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < circles.length; i++) {
          const c = circles[i];
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    },

    // Lorenz Attractor
    lorenz: {
      init: (width, height, mask, points) => {
        const attractors = [];
        const count = Math.min(points.length, 100);
        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          attractors.push({
            x: 0.1 + Math.random() * 0.1,
            y: Math.random() * 0.1,
            z: Math.random() * 0.1,
            centerX: pt.x,
            centerY: pt.y,
            points: [],
            scale: 2 + Math.random() * 2
          });
        }
        return { attractors, sigma: 10, rho: 28, beta: 8 / 3, dt: 0.005 };
      },
      update: (state) => {
        const { attractors, sigma, rho, beta, dt } = state;
        for (let iter = 0; iter < Math.ceil(3 * speed); iter++) {
          for (let i = 0; i < attractors.length; i++) {
            const a = attractors[i];
            const dx = sigma * (a.y - a.x) * dt;
            const dy = (a.x * (rho - a.z) - a.y) * dt;
            const dz = (a.x * a.y - beta * a.z) * dt;
            a.x += dx;
            a.y += dy;
            a.z += dz;

            const screenX = a.centerX + a.x * a.scale;
            const screenY = a.centerY + (a.z - 25) * a.scale * 0.5;
            a.points.push({ x: screenX, y: screenY });
            if (a.points.length > 200) a.points.shift();
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { attractors } = state;
        const decay = getTrailDecay();
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - decay})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.3)`;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < attractors.length; i++) {
          const a = attractors[i];
          if (a.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(a.points[0].x, a.points[0].y);
            for (let j = 1; j < a.points.length; j++) {
              ctx.lineTo(a.points[j].x, a.points[j].y);
            }
            ctx.stroke();
          }
        }
      }
    },

    // Wave Interference
    waveInterference: {
      init: (width, height, mask, points) => {
        const w = Math.floor(width / 2);
        const h = Math.floor(height / 2);
        const sources = [];
        const step = 15;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            const mx = x * 2, my = y * 2;
            if (mx < width && my < height && mask[my * width + mx]) {
              sources.push({
                x, y,
                freq: 0.08 + Math.random() * 0.04,
                phase: Math.random() * Math.PI * 2
              });
            }
          }
        }
        return { sources, time: 0, w, h };
      },
      update: (state) => {
        state.time += 0.15 * speed;
      },
      render: (ctx, state, width, height, colors) => {
        const { sources, time, w, h } = state;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const rgb = hexToRgb(colors.primary);
        const bgRgb = hexToRgb(colors.background);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const sx = Math.floor(x / 2), sy = Math.floor(y / 2);
            let sum = 0;
            for (let i = 0; i < sources.length; i++) {
              const s = sources[i];
              const dx = sx - s.x, dy = sy - s.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              sum += Math.sin(dist * s.freq - time + s.phase);
            }
            sum = sum / Math.max(sources.length, 1);
            const val = (sum + 1) * 0.5;
            const idx = (y * width + x) * 4;
            data[idx] = bgRgb.r + (rgb.r - bgRgb.r) * val;
            data[idx + 1] = bgRgb.g + (rgb.g - bgRgb.g) * val;
            data[idx + 2] = bgRgb.b + (rgb.b - bgRgb.b) * val;
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    },

    // Langton's Ant
    langtonsAnt: {
      init: (width, height, mask, points) => {
        const cellSize = 2;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const grid = new Uint8Array(cols * rows);
        const scaledMask = new Uint8Array(cols * rows);
        const ants = [];

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const mx = Math.floor(x * cellSize), my = Math.floor(y * cellSize);
            if (mx < width && my < height && mask[my * width + mx]) {
              scaledMask[y * cols + x] = 1;
            }
          }
        }

        const scaledPoints = points.map(pt => ({
          x: Math.floor(pt.x / cellSize),
          y: Math.floor(pt.y / cellSize)
        }));

        const numAnts = 20;
        for (let i = 0; i < numAnts; i++) {
          const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
          ants.push({ x: pt.x, y: pt.y, dir: Math.floor(Math.random() * 4) });
        }

        return { grid, scaledMask, ants, cols, rows, cellSize, scaledPoints };
      },
      update: (state) => {
        const { grid, scaledMask, ants, cols, rows, scaledPoints } = state;
        const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

        for (let iter = 0; iter < Math.ceil(100 * speed); iter++) {
          for (let a = 0; a < ants.length; a++) {
            const ant = ants[a];
            const idx = ant.y * cols + ant.x;

            if (grid[idx] === 0) {
              ant.dir = (ant.dir + 1) % 4;
              grid[idx] = 1;
            } else {
              ant.dir = (ant.dir + 3) % 4;
              grid[idx] = 0;
            }

            ant.x += directions[ant.dir][0];
            ant.y += directions[ant.dir][1];

            if (ant.x < 0) ant.x = cols - 1;
            if (ant.x >= cols) ant.x = 0;
            if (ant.y < 0) ant.y = rows - 1;
            if (ant.y >= rows) ant.y = 0;

            if (!scaledMask[ant.y * cols + ant.x] && scaledPoints.length > 0) {
              const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
              ant.x = pt.x;
              ant.y = pt.y;
            }
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { grid, scaledMask, ants, cols, rows, cellSize } = state;
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (grid[y * cols + x] && scaledMask[y * cols + x]) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
          }
        }

        const srgb = hexToRgb(colors.secondary);
        ctx.fillStyle = `rgb(${srgb.r}, ${srgb.g}, ${srgb.b})`;
        for (let i = 0; i < ants.length; i++) {
          ctx.fillRect(ants[i].x * cellSize, ants[i].y * cellSize, cellSize, cellSize);
        }
      }
    },

    // Lissajous Curves
    lissajous: {
      init: (width, height, mask, points) => {
        const curves = [];
        const step = 20;
        const sampledPoints = [];
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            if (mask[y * width + x]) {
              sampledPoints.push({ x, y });
            }
          }
        }

        for (let i = 0; i < sampledPoints.length; i++) {
          const pt = sampledPoints[i];
          curves.push({
            centerX: pt.x,
            centerY: pt.y,
            a: 1 + Math.floor(Math.random() * 4),
            b: 1 + Math.floor(Math.random() * 4),
            delta: Math.random() * Math.PI,
            amplitude: 8 + Math.random() * 8,
            points: [],
            phase: Math.random() * Math.PI * 2
          });
        }
        return { curves, t: 0 };
      },
      update: (state) => {
        const { curves } = state;
        state.t += 0.03 * speed;
        for (let i = 0; i < curves.length; i++) {
          const c = curves[i];
          const x = c.centerX + Math.sin(c.a * (state.t + c.phase) + c.delta) * c.amplitude;
          const y = c.centerY + Math.sin(c.b * (state.t + c.phase)) * c.amplitude;
          c.points.push({ x, y });
          if (c.points.length > 150) c.points.shift();
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { curves } = state;
        const decay = getTrailDecay();
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - decay})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.4)`;
        ctx.lineWidth = 0.8;

        for (let i = 0; i < curves.length; i++) {
          const c = curves[i];
          if (c.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(c.points[0].x, c.points[0].y);
            for (let j = 1; j < c.points.length; j++) {
              ctx.lineTo(c.points[j].x, c.points[j].y);
            }
            ctx.stroke();
          }
        }
      }
    },

    // Brownian Tree
    brownianTree: {
      init: (width, height, mask, points) => {
        const w = Math.floor(width / 2);
        const h = Math.floor(height / 2);
        const grid = new Uint8Array(w * h);
        const scaledMask = new Uint8Array(w * h);
        const walkers = [];

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const mx = x * 2, my = y * 2;
            if (mx < width && my < height && mask[my * width + mx]) {
              scaledMask[y * w + x] = 1;
            }
          }
        }

        const scaledPoints = points.map(pt => ({
          x: Math.floor(pt.x / 2),
          y: Math.floor(pt.y / 2)
        })).filter(pt => pt.x < w && pt.y < h);

        const seedCount = Math.floor(scaledPoints.length / 100);
        for (let i = 0; i < seedCount; i++) {
          const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
          grid[pt.y * w + pt.x] = 1;
        }

        const count = Math.min(getParticleCount() / 2, 800);
        for (let i = 0; i < count; i++) {
          const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
          walkers.push({ x: pt.x, y: pt.y });
        }

        return { grid, scaledMask, walkers, w, h, scaledPoints };
      },
      update: (state) => {
        const { grid, scaledMask, walkers, w, h, scaledPoints } = state;
        const hasNeighbor = (x, y) => {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = x + dx, ny = y + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                if (grid[ny * w + nx]) return true;
              }
            }
          }
          return false;
        };

        for (let iter = 0; iter < Math.ceil(20 * speed); iter++) {
          for (let i = 0; i < walkers.length; i++) {
            const walker = walkers[i];
            walker.x += Math.floor(Math.random() * 3) - 1;
            walker.y += Math.floor(Math.random() * 3) - 1;
            walker.x = Math.max(0, Math.min(w - 1, walker.x));
            walker.y = Math.max(0, Math.min(h - 1, walker.y));

            if (!scaledMask[walker.y * w + walker.x] && scaledPoints.length > 0) {
              const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
              walker.x = pt.x;
              walker.y = pt.y;
              continue;
            }

            if (hasNeighbor(walker.x, walker.y)) {
              grid[walker.y * w + walker.x] = 1;
              if (scaledPoints.length > 0) {
                const pt = scaledPoints[Math.floor(Math.random() * scaledPoints.length)];
                walker.x = pt.x;
                walker.y = pt.y;
              }
            }
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { grid, w, h } = state;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const rgb = hexToRgb(colors.primary);
        const bgRgb = hexToRgb(colors.background);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const sx = Math.floor(x / 2), sy = Math.floor(y / 2);
            const val = (sx < w && sy < h && grid[sy * w + sx]) ? 1 : 0;
            const idx = (y * width + x) * 4;
            data[idx] = bgRgb.r + (rgb.r - bgRgb.r) * val;
            data[idx + 1] = bgRgb.g + (rgb.g - bgRgb.g) * val;
            data[idx + 2] = bgRgb.b + (rgb.b - bgRgb.b) * val;
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    },

    // Spirograph
    spirograph: {
      init: (width, height, mask, points) => {
        const spirographs = [];
        const step = 25;
        const sampledPoints = [];
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            if (mask[y * width + x]) {
              sampledPoints.push({ x, y });
            }
          }
        }

        for (let i = 0; i < sampledPoints.length; i++) {
          const pt = sampledPoints[i];
          const scale = 8 + Math.random() * 6;
          const R = scale;
          const r = scale * (0.2 + Math.random() * 0.5);
          const d = r * (0.5 + Math.random() * 0.8);

          spirographs.push({
            centerX: pt.x,
            centerY: pt.y,
            R, r, d,
            prevX: null,
            prevY: null,
            phase: Math.random() * Math.PI * 2
          });
        }
        return { spirographs, t: 0 };
      },
      update: (state, width, height, mask, points, ctx, colors) => {
        const { spirographs } = state;
        state.t += 0.08 * speed;

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.3)`;
        ctx.lineWidth = 0.5;

        for (let iter = 0; iter < 3; iter++) {
          for (let i = 0; i < spirographs.length; i++) {
            const s = spirographs[i];
            const tt = state.t + s.phase;
            const x = (s.R - s.r) * Math.cos(tt) + s.d * Math.cos((s.R - s.r) / s.r * tt);
            const y = (s.R - s.r) * Math.sin(tt) - s.d * Math.sin((s.R - s.r) / s.r * tt);
            const screenX = s.centerX + x;
            const screenY = s.centerY + y;

            if (s.prevX !== null) {
              ctx.beginPath();
              ctx.moveTo(s.prevX, s.prevY);
              ctx.lineTo(screenX, screenY);
              ctx.stroke();
            }

            s.prevX = screenX;
            s.prevY = screenY;
          }
          state.t += 0.08 * speed;
        }
      },
      render: (ctx, state, width, height, colors) => {
        // Rendering handled in update for spirograph
      }
    },

    // 1D Cellular Automata
    cellularAutomata: {
      init: (width, height, mask, points) => {
        const cellSize = 2;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const scaledMask = new Uint8Array(cols * rows);

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const mx = Math.floor(x * cellSize), my = Math.floor(y * cellSize);
            if (mx < width && my < height && mask[my * width + mx]) {
              scaledMask[y * cols + x] = 1;
            }
          }
        }

        const textCols = [];
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            if (scaledMask[y * cols + x]) {
              textCols.push(x);
              break;
            }
          }
        }

        const rules = [30, 90, 110, 150, 182, 45, 73, 105];
        const automata = [];
        const numAutomata = 30;

        for (let i = 0; i < numAutomata; i++) {
          const startX = textCols[Math.floor(Math.random() * textCols.length)];
          let startY = Math.floor(Math.random() * rows);
          while (startY < rows && !scaledMask[startY * cols + startX]) startY++;
          if (startY >= rows) continue;

          const currentRow = new Uint8Array(cols);
          currentRow[startX] = 1;
          for (let j = -3; j <= 3; j++) {
            if (Math.random() > 0.5 && startX + j >= 0 && startX + j < cols) {
              currentRow[startX + j] = 1;
            }
          }

          automata.push({
            currentRow,
            rowIndex: startY,
            rule: rules[Math.floor(Math.random() * rules.length)],
            direction: Math.random() > 0.5 ? 1 : -1
          });
        }

        return { automata, scaledMask, cols, rows, cellSize };
      },
      update: (state, width, height, mask, points, ctx, colors) => {
        const { automata, scaledMask, cols, rows, cellSize } = state;
        const applyRule = (left, center, right, rule) => {
          const pattern = (left << 2) | (center << 1) | right;
          return (rule >> pattern) & 1;
        };

        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;

        for (let a = 0; a < automata.length; a++) {
          const auto = automata[a];
          if (auto.rowIndex < 0 || auto.rowIndex >= rows) continue;

          for (let x = 0; x < cols; x++) {
            if (auto.currentRow[x] && scaledMask[auto.rowIndex * cols + x]) {
              ctx.fillRect(x * cellSize, auto.rowIndex * cellSize, cellSize, cellSize);
            }
          }

          const nextRow = new Uint8Array(cols);
          for (let x = 0; x < cols; x++) {
            const left = auto.currentRow[(x - 1 + cols) % cols];
            const center = auto.currentRow[x];
            const right = auto.currentRow[(x + 1) % cols];
            nextRow[x] = applyRule(left, center, right, auto.rule);
          }

          auto.currentRow = nextRow;
          auto.rowIndex += auto.direction * Math.ceil(speed);
        }
      },
      render: () => {}
    },

    // Voronoi
    voronoi: {
      init: (width, height, mask, points) => {
        const voronoiPoints = [];
        const count = Math.min(getParticleCount() / 20, 80);
        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          voronoiPoints.push({
            x: pt.x,
            y: pt.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            gray: Math.floor(180 + Math.random() * 75)
          });
        }
        return { voronoiPoints };
      },
      update: (state, width, height, mask, points) => {
        const { voronoiPoints } = state;
        for (let i = 0; i < voronoiPoints.length; i++) {
          const p = voronoiPoints[i];
          const newX = p.x + p.vx * speed;
          const newY = p.y + p.vy * speed;
          const ix = Math.floor(newX), iy = Math.floor(newY);

          if (ix >= 0 && ix < width && iy >= 0 && iy < height && mask[iy * width + ix]) {
            p.x = newX;
            p.y = newY;
          } else {
            p.vx *= -1;
            p.vy *= -1;
            p.vx += (Math.random() - 0.5) * 0.5;
            p.vy += (Math.random() - 0.5) * 0.5;

            const ix2 = Math.floor(p.x), iy2 = Math.floor(p.y);
            if (ix2 < 0 || ix2 >= width || iy2 < 0 || iy2 >= height || !mask[iy2 * width + ix2]) {
              if (points.length > 0) {
                const pt = points[Math.floor(Math.random() * points.length)];
                p.x = pt.x;
                p.y = pt.y;
              }
            }
          }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { voronoiPoints } = state;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const step = 2;
        const rgb = hexToRgb(colors.primary);
        const bgRgb = hexToRgb(colors.background);

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            let minDist = Infinity;
            let closestPoint = null;

            for (let i = 0; i < voronoiPoints.length; i++) {
              const p = voronoiPoints[i];
              const dx = x - p.x, dy = y - p.y;
              const dist = dx * dx + dy * dy;
              if (dist < minDist) {
                minDist = dist;
                closestPoint = p;
              }
            }

            const idx0 = y * width + x;
            const inText = idx0 >= 0 && idx0 < width * height && state.mask && state.mask[idx0];
            const grayVal = closestPoint ? closestPoint.gray : 255;
            const val = inText ? grayVal / 255 : 0;

            for (let dy = 0; dy < step && y + dy < height; dy++) {
              for (let dx = 0; dx < step && x + dx < width; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                data[idx] = bgRgb.r + (rgb.r - bgRgb.r) * val;
                data[idx + 1] = bgRgb.g + (rgb.g - bgRgb.g) * val;
                data[idx + 2] = bgRgb.b + (rgb.b - bgRgb.b) * val;
                data[idx + 3] = 255;
              }
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);

        const prgb = hexToRgb(colors.primary);
        ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`;
        for (let i = 0; i < voronoiPoints.length; i++) {
          const p = voronoiPoints[i];
          const ix = Math.floor(p.x), iy = Math.floor(p.y);
          if (ix >= 0 && ix < width && iy >= 0 && iy < height && state.mask && state.mask[iy * width + ix]) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    },

    // Particle Gravity
    particleGravity: {
      init: (width, height, mask, points) => {
        const particles = [];
        const attractors = [];
        const count = Math.min(getParticleCount() / 2, 800);

        const numAttractors = Math.min(points.length, 50);
        const step = Math.floor(points.length / numAttractors);
        for (let i = 0; i < points.length; i += step) {
          const pt = points[i];
          attractors.push({
            x: pt.x,
            y: pt.y,
            mass: 20 + Math.random() * 30
          });
        }

        for (let i = 0; i < count; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          const angle = Math.random() * Math.PI * 2;
          const dist = 50 + Math.random() * 150;
          particles.push({
            x: pt.x + Math.cos(angle) * dist,
            y: pt.y + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            trail: []
          });
        }

        return { particles, attractors };
      },
      update: (state, width, height) => {
        const { particles, attractors } = state;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          for (let j = 0; j < attractors.length; j++) {
            const a = attractors[j];
            const dx = a.x - p.x, dy = a.y - p.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3) dist = 3;
            let force = a.mass / (dist * dist);
            force = Math.min(force, 0.5);
            p.vx += (dx / dist) * force * 0.15 * speed;
            p.vy += (dy / dist) * force * 0.15 * speed;
          }

          p.vx *= 0.99;
          p.vy *= 0.99;

          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 5) {
            p.vx = (p.vx / spd) * 5;
            p.vy = (p.vy / spd) * 5;
          }

          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 15) p.trail.shift();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
          if (p.x > width) { p.x = width; p.vx *= -0.5; }
          if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
          if (p.y > height) { p.y = height; p.vy *= -0.5; }
        }
      },
      render: (ctx, state, width, height, colors) => {
        const { particles, attractors } = state;
        const decay = getTrailDecay();
        const rgb = hexToRgb(colors.background);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - decay})`;
        ctx.fillRect(0, 0, width, height);

        const prgb = hexToRgb(colors.primary);
        ctx.strokeStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.4)`;
        ctx.lineWidth = 0.8;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let j = 1; j < p.trail.length; j++) {
              ctx.lineTo(p.trail[j].x, p.trail[j].y);
            }
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${prgb.r}, ${prgb.g}, ${prgb.b}, 0.2)`;
        for (let i = 0; i < attractors.length; i++) {
          const a = attractors[i];
          ctx.beginPath();
          ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }), [getParticleCount, getTrailDecay, hexToRgb, createNoise, speed]);

  const initializeAlgorithm = React.useCallback(() => {
    const canvas = canvasRef.current;
    const textCanvas = textCanvasRef.current;
    if (!canvas || !textCanvas) return;

    const ctx = canvas.getContext('2d');
    const textCtx = textCanvas.getContext('2d');
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width;
    canvas.height = height;
    textCanvas.width = width;
    textCanvas.height = height;

    const mask = createTextMask(textCtx, width, height);
    const points = getTextPoints(mask, width, height);

    const rgb = hexToRgb(backgroundColor);
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    ctx.fillRect(0, 0, width, height);

    const algo = algorithms[algorithm];
    if (algo && algo.init) {
      stateRef.current = {
        ...algo.init(width, height, mask, points),
        mask,
        points,
        width,
        height
      };
    }
  }, [algorithm, algorithms, backgroundColor, createTextMask, getTextPoints, hexToRgb]);

  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    if (!state || !state.width) return;

    const { width, height, mask, points } = state;
    const algo = algorithms[algorithm];
    const colors = {
      background: backgroundColor,
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor
    };

    if (algo) {
      if (algo.update) {
        algo.update(state, width, height, mask, points, ctx, colors);
      }
      if (algo.render) {
        algo.render(ctx, state, width, height, colors);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [algorithm, algorithms, backgroundColor, primaryColor, secondaryColor, accentColor]);

  const handleReset = React.useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    initializeAlgorithm();
    animationRef.current = requestAnimationFrame(animate);
  }, [initializeAlgorithm, animate]);

  React.useEffect(() => {
    initializeAlgorithm();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeAlgorithm, animate]);

  React.useEffect(() => {
    if (resetInterval === 'never') return;

    const interval = setInterval(() => {
      handleReset();
    }, parseInt(resetInterval) * 1000);

    return () => clearInterval(interval);
  }, [resetInterval, handleReset]);

  React.useEffect(() => {
    const handleResize = () => {
      handleReset();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleReset]);

  const algorithmLabels = {
    physarum: 'Physarum (Slime Mold)',
    flowfield: 'Flow Field',
    boids: 'Boids Flocking',
    reactionDiffusion: 'Reaction Diffusion',
    gameOfLife: 'Game of Life',
    dla: 'Diffusion Limited Aggregation',
    circlePacking: 'Circle Packing',
    lorenz: 'Lorenz Attractor',
    waveInterference: 'Wave Interference',
    langtonsAnt: "Langton's Ant",
    lissajous: 'Lissajous Curves',
    brownianTree: 'Brownian Tree',
    spirograph: 'Spirograph',
    cellularAutomata: 'Cellular Automata',
    voronoi: 'Voronoi Diagram',
    particleGravity: 'Particle Gravity'
  };

  return (
    <div
      ref={containerRef}
      className="generative-text-container"
      style={{
        position: 'relative',
        width: '100%',
        height: containerHeight + 'px',
        minHeight: '400px',
        overflow: 'hidden',
        backgroundColor: backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <canvas
        ref={textCanvasRef}
        style={{
          display: 'none'
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          imageRendering: ['reactionDiffusion', 'gameOfLife', 'langtonsAnt', 'brownianTree', 'cellularAutomata'].includes(algorithm) ? 'pixelated' : 'auto'
        }}
      />
      
      {showResetButton && (
        <button
          onClick={handleReset}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={resetButtonText}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: buttonTextColor,
            backgroundColor: isHovered ? buttonHoverColor : 'transparent',
            border: `1px solid ${buttonBorderColor}`,
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 250ms ease-out',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        >
          {resetButtonText}
        </button>
      )}
      
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          fontSize: '11px',
          fontWeight: '400',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: accentColor,
          opacity: 0.7
        }}
      >
        {algorithmLabels[algorithm] || algorithm}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
