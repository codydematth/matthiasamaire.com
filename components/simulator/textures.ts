'use client';

import * as THREE from 'three';
import { useEffect, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*  Procedural canvas textures                                                */
/*  Everything here is generated at runtime: no image downloads, tiny VRAM.   */
/* -------------------------------------------------------------------------- */

type Ctx = CanvasRenderingContext2D;

const makeCanvas = (w: number, h: number): [HTMLCanvasElement, Ctx] => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return [canvas, canvas.getContext('2d')!];
};

const toTexture = (canvas: HTMLCanvasElement, repeat = false) => {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
};

/** Seeded PRNG so procedural textures look identical on every load. */
export const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

let cachedFont: string | null = null;
export const uiFont = () => {
  if (cachedFont) return cachedFont;
  const geist =
    typeof document !== 'undefined'
      ? getComputedStyle(document.documentElement).getPropertyValue('--font-geist-sans').trim()
      : '';
  cachedFont = `${geist ? geist + ', ' : ''}"Segoe UI", system-ui, -apple-system, sans-serif`;
  return cachedFont;
};
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const fitText = (ctx: Ctx, text: string, weight: number, maxSize: number, maxWidth: number, font = uiFont()) => {
  let size = maxSize;
  ctx.font = `${weight} ${size}px ${font}`;
  while (ctx.measureText(text).width > maxWidth && size > 10) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${font}`;
  }
  return size;
};

const roundRect = (ctx: Ctx, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const neonText = (ctx: Ctx, text: string, x: number, y: number, color: string, blur: number) => {
  ctx.save();
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = blur * 1.6;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = blur;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = blur * 0.35;
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.fillText(text, x, y);
  ctx.restore();
};

/* ------------------------------- Neon signs ------------------------------- */

export interface NeonSignOptions {
  title: string;
  subtitle?: string;
  color: string;
  width?: number;
  height?: number;
  background?: string;
  frame?: boolean;
  logo?: string;
}

/**
 * Glowing sign board. If a logo URL is passed the canvas is redrawn once the
 * image arrives (texture stays valid immediately).
 */
export const createNeonSign = (opts: NeonSignOptions) => {
  const { width = 1024, height = 288, color, frame = true } = opts;
  const [canvas, ctx] = makeCanvas(width, height);
  const texture = toTexture(canvas);

  const draw = (logo?: HTMLImageElement) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = opts.background ?? '#faf9ed';
    roundRect(ctx, 0, 0, width, height, 28);
    ctx.fill();

    if (frame) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.shadowColor = color;
      ctx.shadowBlur = 0;
      roundRect(ctx, 16, 16, width - 32, height - 32, 20);
      ctx.stroke();
      ctx.restore();
    }

    let textX = width / 2;
    let maxTextW = width * 0.84;
    if (logo) {
      const s = height * 0.56;
      const lx = 48;
      const ly = (height - s) / 2;
      ctx.save();
      roundRect(ctx, lx, ly, s, s, 18);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logo, lx + 6, ly + 6, s - 12, s - 12);
      ctx.restore();
      textX = lx + s + (width - lx - s) / 2;
      maxTextW = width - lx - s - 80;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const titleY = opts.subtitle ? height * 0.42 : height * 0.52;
    const size = fitText(ctx, opts.title, 900, height * (opts.subtitle ? 0.38 : 0.5), maxTextW);
    ctx.font = `900 ${size}px ${uiFont()}`;
    ctx.fillStyle = '#244b3e';
    ctx.fillText(opts.title, textX, titleY);

    if (opts.subtitle) {
      const sub = fitText(ctx, opts.subtitle, 600, height * 0.14, maxTextW);
      ctx.font = `600 ${sub}px ${uiFont()}`;
      ctx.fillStyle = '#59756b';
      ctx.fillText(opts.subtitle.toUpperCase(), textX, height * 0.74);
    }
    texture.needsUpdate = true;
  };

  draw();
  if (opts.logo) {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (texture.image) draw(img);
    };
    img.src = opts.logo;
  }
  return texture;
};

/** "PROJECT CINEMA / FEATURE PRESENTATION" marquee. */
export const createMarqueeTexture = () => createNeonSign({
  title: 'PROJECT CINEMA', subtitle: 'REAL PROJECTS. REAL STORIES.',
  color: '#16824e', width: 768, height: 384,
});

export const createPosterTexture = (title: string, tagline: string, color: string, seed: number) => {
  const w = 256;
  const h = 384;
  const [canvas, ctx] = makeCanvas(w, h);
  const r = rng(seed);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#0c1024');
  g.addColorStop(1, '#1d1238');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.03 + r() * 0.05})`;
    ctx.beginPath();
    ctx.arc(r() * w, r() * h, 10 + r() * 50, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.restore();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.36, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0c1024';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 52px ${uiFont()}`;
  ctx.fillText(title.charAt(0), w / 2, h * 0.37);
  const size = fitText(ctx, title.toUpperCase(), 900, 34, w - 40);
  ctx.font = `900 ${size}px ${uiFont()}`;
  neonText(ctx, title.toUpperCase(), w / 2, h * 0.62, color, 10);
  ctx.font = `600 15px ${uiFont()}`;
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText(tagline, w / 2, h * 0.73);
  ctx.fillText('NOW SHOWING', w / 2, h * 0.86);
  return toTexture(canvas);
};

/* ------------------------------ Code screens ------------------------------ */

const CODE_LINES = [
  "import { create } from 'zustand';",
  "import { useFrame } from '@react-three/fiber';",
  '',
  'export async function resolveTicket(id: string) {',
  '  const ticket = await api.get(`/tickets/${id}`);',
  "  if (!ticket.ok) throw new Error('Not found');",
  '  // isolate -> reproduce -> resolve',
  '  const trace = await collectTrace(ticket.data);',
  '  return diagnose(trace, { strict: true });',
  '}',
  '',
  'const useAuth = () => {',
  '  const [token, setToken] = useState<string>();',
  '  useEffect(() => {',
  '    const id = setInterval(refresh, 5 * 60_000);',
  '    return () => clearInterval(id);',
  '  }, []);',
  '  return { token, isAuthed: !!token };',
  '};',
  '',
  'export default function Feed({ posts }: Props) {',
  '  return (',
  '    <FlatList',
  '      data={posts}',
  '      windowSize={7}',
  '      keyExtractor={(p) => p.id}',
  '      renderItem={renderPost}',
  '    />',
  '  );',
  '}',
  '',
  '// webhook arrived before redirect? sync flag',
  "router.post('/webhooks/pay', verify, async (req) => {",
  '  const evt = parseEvent(req.body);',
  "  await orders.update(evt.ref, { status: 'paid' });",
  '  return { received: true };',
  '});',
  '',
  'type Station = { id: string; zone: Rect };',
  'const inZone = (p: Vec2, r: Rect) =>',
  '  p.x > r.x0 && p.x < r.x1 && p.z > r.z0 && p.z < r.z1;',
  '',
  'git commit -m "fix: oauth redirect loop on deep link"',
  'yarn build  ✓ compiled successfully',
];

const KEYWORDS =
  /\b(import|from|export|default|async|await|function|const|let|return|if|throw|new|type|useState|useEffect)\b/g;

/** Tall scrolling code canvas: animate `texture.offset.y` for a scrolling editor. */
export const createCodeTexture = (accent = '#7dd3fc') => {
  const w = 512;
  const h = 1024;
  const [canvas, ctx] = makeCanvas(w, h);
  ctx.fillStyle = '#0a0f1e';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#0e1528';
  ctx.fillRect(0, 0, 44, h);
  ctx.font = `15px ${MONO}`;
  ctx.textBaseline = 'top';
  const lineH = 21;
  const total = Math.floor(h / lineH);
  for (let i = 0; i < total; i++) {
    const line = CODE_LINES[i % CODE_LINES.length];
    const y = 6 + i * lineH;
    ctx.fillStyle = '#3b4767';
    ctx.fillText(String(i + 1).padStart(3, ' '), 6, y);
    if (line.trim().startsWith('//')) {
      ctx.fillStyle = '#5c6b8a';
      ctx.fillText(line, 54, y);
      continue;
    }
    // Lightweight tokeniser: keywords / strings / rest.
    let x = 54;
    const parts = line.split(/('[^']*'|`[^`]*`|"[^"]*")/g);
    for (const part of parts) {
      if (!part) continue;
      if (/^['"`]/.test(part)) {
        ctx.fillStyle = '#a3e635';
        ctx.fillText(part, x, y);
        x += ctx.measureText(part).width;
        continue;
      }
      const tokens = part.split(KEYWORDS);
      for (const tok of tokens) {
        if (!tok) continue;
        KEYWORDS.lastIndex = 0;
        ctx.fillStyle = KEYWORDS.test(tok) ? '#c084fc' : /[{}()<>[\]]/.test(tok) ? accent : '#dbe4ff';
        KEYWORDS.lastIndex = 0;
        ctx.fillText(tok, x, y);
        x += ctx.measureText(tok).width;
      }
    }
  }
  const t = toTexture(canvas, true);
  t.repeat.set(1, 0.42);
  return t;
};

/* ------------------------------ Ground tiles ------------------------------ */

const stoneTiles = (
  size: number,
  base: [number, number, number],
  grout: string,
  rows: number,
  minW: number,
  maxW: number,
  seed: number,
) => {
  const [canvas, ctx] = makeCanvas(size, size);
  const r = rng(seed);
  ctx.fillStyle = grout;
  ctx.fillRect(0, 0, size, size);
  const rowH = size / rows;
  for (let row = 0; row < rows; row++) {
    let x = -r() * maxW;
    while (x < size) {
      const w = minW + r() * (maxW - minW);
      const v = (r() - 0.5) * 22;
      ctx.fillStyle = `rgb(${base[0] + v},${base[1] + v},${base[2] + v * 0.9})`;
      const gap = 3;
      ctx.fillRect(x + gap, row * rowH + gap, w - gap * 2, rowH - gap * 2);
      // subtle bevel highlight
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(x + gap, row * rowH + gap, w - gap * 2, 3);
      x += w;
    }
  }
  return toTexture(canvas, true);
};

export const createPavementTexture = () => stoneTiles(512, [156, 145, 133], '#6c6259', 8, 60, 130, 7);
export const createRoadTexture = () => stoneTiles(512, [66, 64, 70], '#2a2a30', 14, 26, 46, 13);

/** Skyline façade: map + emissive map share one layout. */
export const createWindowTextures = () => {
  const w = 256;
  const h = 512;
  const [c1, a] = makeCanvas(w, h);
  const [c2, b] = makeCanvas(w, h);
  const r = rng(42);
  a.fillStyle = '#4a4552';
  a.fillRect(0, 0, w, h);
  b.fillStyle = '#000';
  b.fillRect(0, 0, w, h);
  const cols = 6;
  const rows = 16;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = 12 + x * (w - 24) / cols;
      const py = 12 + y * (h - 24) / rows;
      const ww = (w - 24) / cols - 10;
      const hh = (h - 24) / rows - 12;
      const lit = r() < 0.38;
      a.fillStyle = lit ? '#ffcf8f' : '#232838';
      a.fillRect(px, py, ww, hh);
      if (lit) {
        b.fillStyle = r() < 0.2 ? '#9fd4ff' : '#ffc27a';
        b.fillRect(px, py, ww, hh);
      }
    }
  }
  return { map: toTexture(c1), emissive: toTexture(c2) };
};

/** Radial glow sprite (white -> transparent). Tint via material colour. */
export const createGlowTexture = () => {
  const s = 128;
  const [canvas, ctx] = makeCanvas(s, s);
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(canvas);
  return t;
};

/** Cinema title card shown before a project is selected. */
export const createTitleCardTexture = (title: string, subtitle: string) => {
  const w = 1280;
  const h = 560;
  const [canvas, ctx] = makeCanvas(w, h);
  const g = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
  g.addColorStop(0, '#2a1840');
  g.addColorStop(1, '#07060f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${fitText(ctx, title, 900, 110, w - 200)}px ${uiFont()}`;
  neonText(ctx, title, w / 2, h * 0.42, '#ff5fa2', 26);
  ctx.font = `600 34px ${uiFont()}`;
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText(subtitle, w / 2, h * 0.64);
  return toTexture(canvas);
};

/* --------------------------------- Hooks ---------------------------------- */

/**
 * Creates a disposable GPU resource once and frees it when the component
 * unmounts — keeps VRAM/RAM flat when stations mount and unmount.
 */
export function useDisposable<T extends { dispose: () => void }>(factory: () => T): T {
  const [value] = useState(factory);
  useEffect(() => () => value.dispose(), [value]);
  return value;
}
