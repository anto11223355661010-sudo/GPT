'use client';

import { useEffect, useMemo, useRef } from 'react';

type Vec3 = [number, number, number];
type Vec2 = [number, number];

const PHI = (1 + Math.sqrt(5)) / 2;

const RAW_VERTICES: Vec3[] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1]
];

const FACES: [number, number, number][] = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1]
];

function normalizeVertices(vertices: Vec3[]): Vec3[] {
  const max = Math.max(
    ...vertices.map(([x, y, z]) => Math.sqrt(x * x + y * y + z * z))
  );

  return vertices.map(([x, y, z]) => [x / max, y / max, z / max]);
}

function computeEdges(faces: [number, number, number][]) {
  const seen = new Set<string>();
  const edges: [number, number][] = [];

  faces.forEach(([a, b, c]) => {
    const combos: [number, number][] = [
      [a, b],
      [b, c],
      [c, a]
    ];

    combos.forEach(([start, end]) => {
      const key = start < end ? `${start}-${end}` : `${end}-${start}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([start, end]);
      }
    });
  });

  return edges;
}

function rotateVertex(vertex: Vec3, rotation: Vec3): Vec3 {
  const [x, y, z] = vertex;
  const [rx, ry, rz] = rotation;

  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return [x3, y3, z2];
}

function project(vertex: Vec3, size: { width: number; height: number }, cameraDistance: number, perspective: number): Vec2 {
  const [x, y, z] = vertex;
  const depth = cameraDistance + z;
  const scale = perspective / (perspective + depth);
  const radius = Math.min(size.width, size.height) * 0.48;

  return [
    size.width / 2 + x * radius * scale,
    size.height / 2 + y * radius * scale
  ];
}

function computeNormal(a: Vec3, b: Vec3, c: Vec3): Vec3 {
  const u: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v: Vec3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];

  const nx = u[1] * v[2] - u[2] * v[1];
  const ny = u[2] * v[0] - u[0] * v[2];
  const nz = u[0] * v[1] - u[1] * v[0];
  const length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

  return [nx / length, ny / length, nz / length];
}

function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) {
        progressRef.current = 0;
        return;
      }

      progressRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progressRef;
}

export function ScrollScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useScrollProgress();

  const vertices = useMemo(() => normalizeVertices(RAW_VERTICES), []);
  const edges = useMemo(() => computeEdges(FACES), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lightDirection: Vec3 = [0.35, 0.6, 1];
    const lightLength = Math.sqrt(
      lightDirection[0] * lightDirection[0] +
        lightDirection[1] * lightDirection[1] +
        lightDirection[2] * lightDirection[2]
    );
    const lightNormal: Vec3 = [
      lightDirection[0] / lightLength,
      lightDirection[1] / lightLength,
      lightDirection[2] / lightLength
    ];

    const render = (time: number) => {
      const elapsed = time / 1000;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0.12)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const scrollProgress = scrollRef.current;
      const rotation: Vec3 = [
        elapsed * 0.35 + scrollProgress * Math.PI * 0.5,
        elapsed * 0.55 + scrollProgress * Math.PI * 1.5,
        Math.sin(elapsed * 0.6) * 0.4
      ];

      const rotated = vertices.map((vertex) => rotateVertex(vertex, rotation));
      const projected = rotated.map((vertex) =>
        project(vertex, { width, height }, 3.2, 6)
      );

      const faces = FACES.map((face) => {
        const [a, b, c] = face.map((index) => rotated[index]);
        const normal = computeNormal(a, b, c);
        const depth = (a[2] + b[2] + c[2]) / 3;
        const lightIntensity = Math.max(
          0,
          normal[0] * lightNormal[0] +
            normal[1] * lightNormal[1] +
            normal[2] * lightNormal[2]
        );

        return { face, depth, normal, lightIntensity };
      }).sort((a, b) => a.depth - b.depth);

      faces.forEach(({ face, normal, lightIntensity }) => {
        if (normal[2] <= 0) {
          return;
        }

        const alpha = 0.35 + lightIntensity * 0.4;
        const hue = 210 + lightIntensity * 40;
        context.beginPath();
        face.forEach((index, i) => {
          const [x, y] = projected[index];
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.closePath();
        context.fillStyle = `hsla(${hue}, 75%, 65%, ${alpha})`;
        context.fill();
      });

      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = 1.3;
      context.strokeStyle = 'rgba(15, 23, 42, 0.2)';
      edges.forEach(([start, end]) => {
        const [x1, y1] = projected[start];
        const [x2, y2] = projected[end];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      });

      context.lineWidth = 2.2;
      context.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      edges.forEach(([start, end]) => {
        const [x1, y1] = projected[start];
        const [x2, y2] = projected[end];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    animationFrame = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [edges, vertices, scrollRef]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-[0_35px_80px_-45px_rgba(15,23,42,0.65)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/15 dark:border-slate-700/30 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/5"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/40 opacity-40 mix-blend-screen dark:border-slate-700/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.2),transparent_60%)]" />
    </div>
  );
}
