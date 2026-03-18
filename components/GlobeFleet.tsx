"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* India outline helper: convert lat/lon to normalized 0-1 coordinates */
function latLonToNorm(lat: number, lon: number): [number, number] {
  const x = (lon - 68) / (97.5 - 68);
  const y = (37 - lat) / (37 - 6);
  return [x, y];
}

/* ─── Indian cities with pixel-mapped positions (normalized 0-1) ─── */
/* Based on India's bounding box: lat 6-37°N, lon 68-97.5°E */
const CITIES = [
  { name: "Mumbai",    x: latLonToNorm(19.08, 72.88)[0], y: latLonToNorm(19.08, 72.88)[1] },
  { name: "Delhi",     x: latLonToNorm(28.61, 77.21)[0], y: latLonToNorm(28.61, 77.21)[1] },
  { name: "Bangalore", x: latLonToNorm(12.97, 77.59)[0], y: latLonToNorm(12.97, 77.59)[1] },
  { name: "Chennai",   x: latLonToNorm(13.08, 80.27)[0], y: latLonToNorm(13.08, 80.27)[1] },
  { name: "Hyderabad", x: latLonToNorm(17.39, 78.49)[0], y: latLonToNorm(17.39, 78.49)[1] },
  { name: "Kolkata",   x: latLonToNorm(22.57, 88.36)[0], y: latLonToNorm(22.57, 88.36)[1] },
  { name: "Pune",      x: latLonToNorm(18.52, 73.86)[0], y: latLonToNorm(18.52, 73.86)[1] },
  { name: "Ahmedabad", x: latLonToNorm(23.02, 72.57)[0], y: latLonToNorm(23.02, 72.57)[1] },
  { name: "Jaipur",    x: latLonToNorm(26.91, 75.79)[0], y: latLonToNorm(26.91, 75.79)[1] },
  { name: "Lucknow",   x: latLonToNorm(26.85, 80.95)[0], y: latLonToNorm(26.85, 80.95)[1] },
  { name: "Kochi",     x: latLonToNorm(9.93, 76.27)[0],  y: latLonToNorm(9.93, 76.27)[1] },
  { name: "Indore",    x: latLonToNorm(22.72, 75.86)[0], y: latLonToNorm(22.72, 75.86)[1] },
];

const ROUTES = [
  [0, 1],  // Mumbai → Delhi
  [2, 3],  // Bangalore → Chennai
  [0, 2],  // Mumbai → Bangalore
  [1, 5],  // Delhi → Kolkata
  [4, 1],  // Hyderabad → Delhi
  [0, 6],  // Mumbai → Pune
  [7, 1],  // Ahmedabad → Delhi
  [8, 9],  // Jaipur → Lucknow
  [3, 4],  // Chennai → Hyderabad
  [5, 2],  // Kolkata → Bangalore
  [10, 2], // Kochi → Bangalore
  [11, 0], // Indore → Mumbai
];

/* India outline — highly detailed polygon traced from actual boundary coordinates.
   Uses catmull-rom spline interpolation for smooth curves. */
const INDIA_OUTLINE_RAW: [number, number][] = [
  // ══════ START: J&K / Ladakh northern tip ══════
  latLonToNorm(32.87, 74.64),
  latLonToNorm(33.20, 74.35),
  latLonToNorm(33.58, 74.10),
  latLonToNorm(33.90, 74.40),
  latLonToNorm(34.10, 74.80),
  latLonToNorm(34.35, 75.40),
  latLonToNorm(34.60, 75.80),
  latLonToNorm(34.85, 76.20),
  latLonToNorm(35.10, 76.70),
  latLonToNorm(35.30, 77.20),
  latLonToNorm(35.50, 77.80),
  // ══════ Aksai Chin / Ladakh east ══════
  latLonToNorm(35.20, 78.20),
  latLonToNorm(34.80, 78.60),
  latLonToNorm(34.30, 78.90),
  latLonToNorm(33.80, 79.10),
  latLonToNorm(33.40, 79.10),
  latLonToNorm(32.70, 79.30),
  latLonToNorm(32.40, 79.40),
  // ══════ Himachal / Uttarakhand border ══════
  latLonToNorm(31.90, 79.50),
  latLonToNorm(31.40, 79.80),
  latLonToNorm(30.90, 80.10),
  latLonToNorm(30.60, 80.30),
  latLonToNorm(30.40, 80.40),
  latLonToNorm(30.20, 80.60),
  latLonToNorm(30.00, 80.80),
  // ══════ Nepal border ══════
  latLonToNorm(29.60, 80.90),
  latLonToNorm(29.30, 81.10),
  latLonToNorm(29.10, 81.40),
  latLonToNorm(28.90, 81.80),
  latLonToNorm(28.60, 82.10),
  latLonToNorm(28.40, 82.60),
  latLonToNorm(28.20, 83.00),
  latLonToNorm(27.90, 83.40),
  latLonToNorm(27.70, 83.80),
  latLonToNorm(27.60, 84.20),
  latLonToNorm(27.50, 84.60),
  latLonToNorm(27.40, 85.00),
  latLonToNorm(27.20, 85.40),
  latLonToNorm(27.00, 85.80),
  latLonToNorm(26.80, 86.20),
  latLonToNorm(26.60, 86.60),
  latLonToNorm(26.50, 87.00),
  latLonToNorm(26.40, 87.40),
  latLonToNorm(26.50, 87.80),
  latLonToNorm(26.60, 88.10),
  // ══════ Siliguri corridor (narrow neck) ══════
  latLonToNorm(26.70, 88.30),
  latLonToNorm(26.90, 88.45),
  latLonToNorm(27.10, 88.60),
  latLonToNorm(27.30, 88.70),
  // ══════ Sikkim / NE entry ══════
  latLonToNorm(27.50, 88.75),
  latLonToNorm(27.80, 88.80),
  latLonToNorm(28.10, 88.90),
  // ══════ Northeast India (Assam, Arunachal, etc.) ══════
  latLonToNorm(28.20, 89.50),
  latLonToNorm(27.80, 90.30),
  latLonToNorm(27.50, 91.00),
  latLonToNorm(27.80, 91.60),
  latLonToNorm(28.00, 92.00),
  latLonToNorm(28.20, 92.60),
  latLonToNorm(28.00, 93.20),
  latLonToNorm(27.80, 93.80),
  latLonToNorm(27.60, 94.50),
  latLonToNorm(27.40, 95.00),
  latLonToNorm(27.60, 95.60),
  latLonToNorm(27.80, 96.20),
  latLonToNorm(27.60, 96.60),
  latLonToNorm(27.20, 97.00),
  // ══════ NE border — south along Myanmar border ══════
  latLonToNorm(26.80, 97.10),
  latLonToNorm(26.40, 96.80),
  latLonToNorm(26.00, 96.50),
  latLonToNorm(25.60, 96.10),
  latLonToNorm(25.20, 95.50),
  latLonToNorm(24.80, 95.00),
  latLonToNorm(24.40, 94.60),
  latLonToNorm(24.00, 94.20),
  latLonToNorm(23.60, 93.80),
  latLonToNorm(23.30, 93.40),
  latLonToNorm(23.00, 93.30),
  // ══════ Mizoram / Myanmar ══════
  latLonToNorm(22.50, 93.20),
  latLonToNorm(22.00, 93.00),
  latLonToNorm(21.60, 92.60),
  latLonToNorm(21.30, 92.40),
  // ══════ Bangladesh SE border / Tripura / Mizoram ══════
  latLonToNorm(21.20, 92.20),
  latLonToNorm(21.40, 91.80),
  latLonToNorm(21.80, 91.50),
  latLonToNorm(22.10, 91.20),
  latLonToNorm(22.40, 90.80),
  latLonToNorm(22.60, 90.60),
  latLonToNorm(23.00, 90.60),
  latLonToNorm(23.50, 90.70),
  latLonToNorm(24.00, 90.80),
  latLonToNorm(24.30, 91.20),
  latLonToNorm(24.50, 91.60),
  latLonToNorm(24.80, 92.00),
  latLonToNorm(25.10, 92.10),
  latLonToNorm(25.40, 91.80),
  latLonToNorm(25.60, 91.40),
  latLonToNorm(25.70, 91.00),
  latLonToNorm(25.60, 90.50),
  latLonToNorm(25.80, 90.00),
  latLonToNorm(26.00, 89.80),
  latLonToNorm(26.20, 89.50),
  // ══════ Back to Siliguri corridor (from NE side) ══════
  latLonToNorm(26.40, 89.60),
  latLonToNorm(26.50, 89.80),
  latLonToNorm(26.60, 89.50),
  latLonToNorm(26.50, 89.10),
  latLonToNorm(26.30, 88.80),
  latLonToNorm(26.10, 88.60),
  latLonToNorm(25.80, 88.40),
  latLonToNorm(25.40, 88.30),
  // ══════ Bangladesh west border ══════
  latLonToNorm(25.10, 88.60),
  latLonToNorm(24.80, 88.70),
  latLonToNorm(24.50, 88.80),
  latLonToNorm(24.20, 89.00),
  latLonToNorm(24.00, 88.90),
  latLonToNorm(23.80, 88.70),
  latLonToNorm(23.50, 88.60),
  latLonToNorm(23.20, 88.70),
  latLonToNorm(23.00, 88.80),
  latLonToNorm(22.80, 88.90),
  // ══════ Sundarbans / West Bengal coast ══════
  latLonToNorm(22.50, 88.80),
  latLonToNorm(22.20, 88.60),
  latLonToNorm(21.90, 88.30),
  latLonToNorm(21.60, 87.80),
  latLonToNorm(21.50, 87.40),
  // ══════ Odisha coast ══════
  latLonToNorm(21.40, 87.00),
  latLonToNorm(21.20, 86.80),
  latLonToNorm(20.80, 86.70),
  latLonToNorm(20.50, 86.60),
  latLonToNorm(20.20, 86.40),
  latLonToNorm(19.90, 86.10),
  latLonToNorm(19.60, 85.60),
  latLonToNorm(19.30, 85.20),
  latLonToNorm(19.10, 84.80),
  latLonToNorm(18.80, 84.40),
  // ══════ Andhra Pradesh coast ══════
  latLonToNorm(18.50, 84.00),
  latLonToNorm(18.20, 83.70),
  latLonToNorm(17.90, 83.40),
  latLonToNorm(17.60, 83.20),
  latLonToNorm(17.30, 82.80),
  latLonToNorm(17.00, 82.40),
  latLonToNorm(16.70, 82.20),
  latLonToNorm(16.40, 81.90),
  latLonToNorm(16.10, 81.40),
  latLonToNorm(15.80, 81.00),
  latLonToNorm(15.50, 80.60),
  latLonToNorm(15.20, 80.30),
  latLonToNorm(14.80, 80.10),
  latLonToNorm(14.50, 80.00),
  // ══════ Tamil Nadu east coast ══════
  latLonToNorm(14.10, 80.10),
  latLonToNorm(13.60, 80.20),
  latLonToNorm(13.30, 80.30),  // Chennai
  latLonToNorm(13.00, 80.30),
  latLonToNorm(12.60, 80.10),
  latLonToNorm(12.20, 79.90),
  latLonToNorm(11.80, 79.80),
  latLonToNorm(11.40, 79.80),
  latLonToNorm(11.00, 79.80),
  latLonToNorm(10.60, 79.70),
  latLonToNorm(10.30, 79.50),
  latLonToNorm(10.10, 79.40),
  latLonToNorm(9.80, 79.20),
  // ══════ Palk Strait / Rameswaram ══════
  latLonToNorm(9.50, 79.10),
  latLonToNorm(9.20, 79.00),
  latLonToNorm(9.00, 78.80),
  latLonToNorm(8.80, 78.50),
  latLonToNorm(8.50, 78.10),
  latLonToNorm(8.30, 77.70),
  // ══════ Kanyakumari (southern tip) ══════
  latLonToNorm(8.08, 77.55),
  latLonToNorm(8.00, 77.40),
  // ══════ Kerala west coast (going north) ══════
  latLonToNorm(8.15, 77.15),
  latLonToNorm(8.30, 77.00),
  latLonToNorm(8.50, 76.90),
  latLonToNorm(8.70, 76.70),
  latLonToNorm(8.90, 76.55),
  latLonToNorm(9.10, 76.40),
  latLonToNorm(9.40, 76.30),
  latLonToNorm(9.60, 76.25),
  latLonToNorm(9.80, 76.25),
  latLonToNorm(10.00, 76.20),
  latLonToNorm(10.30, 76.10),
  latLonToNorm(10.50, 76.05),
  latLonToNorm(10.80, 75.90),
  latLonToNorm(11.10, 75.70),
  latLonToNorm(11.40, 75.50),
  latLonToNorm(11.70, 75.30),
  // ══════ Karnataka coast ══════
  latLonToNorm(12.00, 75.10),
  latLonToNorm(12.40, 74.90),
  latLonToNorm(12.80, 74.80),
  latLonToNorm(13.20, 74.70),
  latLonToNorm(13.60, 74.60),
  latLonToNorm(14.00, 74.40),
  latLonToNorm(14.40, 74.20),
  latLonToNorm(14.80, 74.05),
  // ══════ Goa ══════
  latLonToNorm(15.20, 73.90),
  latLonToNorm(15.50, 73.80),
  latLonToNorm(15.80, 73.70),
  // ══════ Maharashtra coast (Konkan) ══════
  latLonToNorm(16.20, 73.40),
  latLonToNorm(16.60, 73.30),
  latLonToNorm(17.00, 73.10),
  latLonToNorm(17.40, 73.00),
  latLonToNorm(17.70, 73.00),
  latLonToNorm(18.00, 72.90),
  latLonToNorm(18.30, 72.85),
  latLonToNorm(18.60, 72.85),
  latLonToNorm(18.90, 72.80),  // Mumbai
  latLonToNorm(19.20, 72.80),
  latLonToNorm(19.50, 72.85),
  latLonToNorm(19.80, 72.80),
  latLonToNorm(20.10, 72.75),
  latLonToNorm(20.40, 72.65),
  // ══════ Gujarat south coast ══════
  latLonToNorm(20.70, 72.50),
  latLonToNorm(20.90, 72.30),
  latLonToNorm(21.10, 72.15),
  latLonToNorm(21.30, 72.00),
  latLonToNorm(21.50, 71.80),
  latLonToNorm(21.60, 71.50),
  // ══════ Gulf of Khambhat (V-shaped inlet) ══════
  latLonToNorm(21.70, 71.20),
  latLonToNorm(21.80, 70.90),
  latLonToNorm(21.90, 70.60),
  latLonToNorm(22.00, 70.30),
  latLonToNorm(22.10, 70.00),
  latLonToNorm(22.25, 69.70),
  latLonToNorm(22.40, 69.40),
  latLonToNorm(22.55, 69.10),
  latLonToNorm(22.70, 68.80),
  // ══════ Kathiawar peninsula (Saurashtra bulge) ══════
  latLonToNorm(22.40, 68.60),
  latLonToNorm(22.00, 68.80),
  latLonToNorm(21.60, 69.00),
  latLonToNorm(21.20, 69.30),
  latLonToNorm(20.90, 69.80),
  latLonToNorm(20.80, 70.20),
  latLonToNorm(20.90, 70.70),
  latLonToNorm(21.10, 71.00),
  latLonToNorm(21.40, 71.20),
  latLonToNorm(21.70, 71.50),
  latLonToNorm(22.00, 71.60),
  latLonToNorm(22.20, 71.80),
  latLonToNorm(22.40, 72.10),
  latLonToNorm(22.50, 72.30),
  // ══════ Gulf of Khambhat east side going north ══════
  latLonToNorm(22.30, 72.50),
  latLonToNorm(22.10, 72.60),
  latLonToNorm(21.80, 72.70),
  latLonToNorm(21.50, 72.50),
  latLonToNorm(21.30, 72.30),
  latLonToNorm(21.10, 72.15),
  // ══════ Gujarat north coast to Kutch ══════
  latLonToNorm(22.50, 72.40),
  latLonToNorm(22.80, 72.30),
  latLonToNorm(23.00, 72.10),
  latLonToNorm(23.20, 71.70),
  latLonToNorm(23.40, 71.30),
  // ══════ Rann of Kutch (northern indent) ══════
  latLonToNorm(23.50, 70.80),
  latLonToNorm(23.60, 70.30),
  latLonToNorm(23.70, 69.80),
  latLonToNorm(23.80, 69.40),
  latLonToNorm(23.90, 69.00),
  latLonToNorm(24.00, 68.70),
  latLonToNorm(24.10, 68.50),
  // ══════ Pakistan border going north ══════
  latLonToNorm(24.30, 68.80),
  latLonToNorm(24.60, 69.20),
  latLonToNorm(24.80, 69.60),
  latLonToNorm(24.70, 70.00),
  latLonToNorm(24.50, 70.30),
  latLonToNorm(24.30, 70.60),
  latLonToNorm(24.20, 70.90),
  latLonToNorm(24.40, 71.10),
  latLonToNorm(24.60, 71.00),
  latLonToNorm(24.90, 70.80),
  latLonToNorm(25.20, 70.60),
  latLonToNorm(25.50, 70.40),
  latLonToNorm(25.80, 70.20),
  latLonToNorm(26.10, 70.10),
  latLonToNorm(26.40, 70.00),
  latLonToNorm(26.80, 69.90),
  latLonToNorm(27.20, 69.90),
  latLonToNorm(27.60, 70.00),
  latLonToNorm(28.00, 70.20),
  latLonToNorm(28.40, 70.40),
  latLonToNorm(28.70, 70.60),
  // ══════ Rajasthan / Punjab / Pakistan border ══════
  latLonToNorm(29.00, 70.80),
  latLonToNorm(29.30, 71.00),
  latLonToNorm(29.60, 71.20),
  latLonToNorm(29.80, 71.50),
  latLonToNorm(30.00, 71.70),
  latLonToNorm(30.20, 72.00),
  latLonToNorm(30.40, 72.30),
  latLonToNorm(30.60, 72.60),
  latLonToNorm(30.80, 72.90),
  latLonToNorm(31.00, 73.20),
  latLonToNorm(31.20, 73.60),
  latLonToNorm(31.40, 73.90),
  latLonToNorm(31.60, 74.20),
  latLonToNorm(31.80, 74.40),
  latLonToNorm(32.10, 74.50),
  latLonToNorm(32.40, 74.55),
  latLonToNorm(32.70, 74.60),
];

/* Smooth the outline using Catmull-Rom spline interpolation */
function catmullRomSpline(points: [number, number][], segments: number = 4): [number, number][] {
  const result: [number, number][] = [];
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    for (let t = 0; t < segments; t++) {
      const u = t / segments;
      const u2 = u * u;
      const u3 = u2 * u;
      const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3);
      const y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3);
      result.push([x, y]);
    }
  }
  return result;
}

const INDIA_OUTLINE = catmullRomSpline(INDIA_OUTLINE_RAW, 5);

/* ── Indian state boundaries (simplified internal borders) ── */
/* Each entry is a polyline of [lat, lon] pairs representing a state border segment */
const STATE_BORDERS: [number, number][][] = [
  // ── J&K / Himachal border ──
  [[32.90, 75.30], [32.50, 75.60], [32.10, 76.00], [31.80, 76.40], [31.50, 76.80], [31.20, 77.10]],
  // ── Himachal / Punjab border ──
  [[32.10, 76.00], [31.60, 75.60], [31.30, 75.20], [31.00, 75.00], [30.70, 75.10]],
  // ── Punjab / Haryana border ──
  [[31.00, 75.00], [30.70, 75.50], [30.40, 76.00], [30.10, 76.50], [29.80, 76.70]],
  // ── Uttarakhand / UP border ──
  [[30.40, 77.70], [30.10, 78.00], [29.80, 78.30], [29.50, 78.80], [29.20, 79.20], [29.00, 79.60]],
  // ── Haryana / Rajasthan border ──
  [[29.80, 76.70], [29.40, 76.40], [29.00, 76.10], [28.50, 75.80], [28.00, 75.60], [27.60, 75.40], [27.20, 75.00]],
  // ── UP / MP border (roughly east-west) ──
  [[26.50, 78.50], [26.20, 79.00], [26.00, 79.50], [25.80, 80.00], [25.50, 80.50], [25.30, 81.00], [25.10, 81.50], [24.80, 82.00], [24.50, 82.50], [24.30, 83.00]],
  // ── Rajasthan / Gujarat border ──
  [[27.20, 75.00], [26.80, 74.50], [26.40, 73.80], [25.80, 73.00], [25.20, 72.50], [24.60, 72.00], [24.00, 71.50], [23.80, 71.00]],
  // ── Rajasthan / MP border ──
  [[27.20, 75.00], [26.80, 75.50], [26.50, 76.00], [26.30, 76.50], [26.20, 77.00], [26.30, 77.50], [26.50, 78.50]],
  // ── Gujarat / MP border ──
  [[23.80, 71.00], [23.50, 71.50], [23.30, 72.00], [23.10, 72.50], [23.00, 73.00], [23.10, 73.50], [23.20, 74.00], [23.30, 74.40]],
  // ── Gujarat / Maharashtra border ──
  [[23.30, 74.40], [22.80, 74.20], [22.30, 73.80], [21.80, 73.40], [21.40, 73.00], [20.90, 72.90], [20.50, 72.70]],
  // ── MP / Maharashtra border ──
  [[23.30, 74.40], [23.00, 75.00], [22.60, 75.50], [22.30, 76.00], [22.00, 76.50], [21.80, 77.00], [21.50, 77.50], [21.30, 78.00], [21.10, 78.50], [20.80, 79.00], [20.50, 79.50], [20.30, 80.00]],
  // ── MP / Chhattisgarh border ──
  [[24.30, 83.00], [24.00, 82.50], [23.60, 82.00], [23.30, 81.50], [23.00, 81.00], [22.80, 80.50], [22.50, 80.00], [22.20, 79.50], [21.80, 79.00], [20.30, 80.00]],
  // ── Maharashtra / Karnataka border ──
  [[20.50, 72.70], [19.80, 73.00], [19.20, 73.50], [18.60, 74.00], [17.80, 74.50], [17.20, 75.00], [16.80, 75.50], [16.40, 76.00], [16.00, 76.50], [15.80, 77.00], [15.80, 77.50], [16.00, 78.00], [16.20, 78.50]],
  // ── Maharashtra / Telangana border ──
  [[20.30, 80.00], [19.80, 79.80], [19.30, 79.50], [18.80, 79.20], [18.40, 79.00], [18.00, 78.80], [17.50, 78.60], [17.00, 78.40], [16.70, 78.20], [16.20, 78.50]],
  // ── Karnataka / Kerala border ──
  [[12.50, 75.00], [12.20, 75.20], [12.00, 75.50], [11.80, 75.80], [11.60, 76.00], [11.40, 76.30], [11.20, 76.60], [11.50, 77.00], [11.80, 77.40]],
  // ── Karnataka / Tamil Nadu border ──
  [[11.80, 77.40], [12.00, 77.80], [12.20, 78.10], [12.50, 78.40], [12.80, 78.60], [13.10, 78.80], [13.30, 79.00], [13.50, 79.30]],
  // ── Karnataka / Andhra/Telangana border ──
  [[16.20, 78.50], [16.00, 78.00], [15.80, 77.60], [15.50, 77.30], [15.20, 77.00], [14.80, 77.00], [14.40, 77.20], [14.00, 77.50], [13.70, 77.80], [13.50, 78.00], [13.30, 78.20], [13.10, 78.60], [13.10, 78.80]],
  // ── Telangana / AP border ──
  [[16.20, 78.50], [16.40, 79.00], [16.50, 79.50], [16.60, 80.00], [16.70, 80.50], [16.80, 81.00], [17.00, 81.50], [17.20, 82.00]],
  // ── AP / Tamil Nadu border ──
  [[13.50, 79.30], [13.60, 79.80], [13.80, 80.00], [14.00, 80.10], [14.30, 80.00]],
  // ── Chhattisgarh / Odisha border ──
  [[23.30, 83.50], [22.80, 83.30], [22.30, 83.10], [21.80, 83.00], [21.50, 82.80], [21.20, 82.50], [20.80, 82.30], [20.50, 82.00], [20.30, 81.70], [20.10, 81.40], [19.80, 81.00], [19.50, 80.80]],
  // ── Chhattisgarh / Jharkhand border ──
  [[23.30, 83.50], [23.50, 84.00], [23.60, 84.50]],
  // ── Jharkhand / WB border ──
  [[23.60, 84.50], [23.50, 85.00], [23.30, 85.50], [23.10, 86.00], [23.00, 86.50], [22.80, 87.00], [22.50, 87.30]],
  // ── Jharkhand / Bihar border ──
  [[23.60, 84.50], [24.00, 84.80], [24.30, 85.00], [24.60, 85.20], [25.00, 85.50], [25.30, 86.00], [25.50, 86.50], [25.60, 87.00]],
  // ── Bihar / UP border ──
  [[25.00, 84.00], [25.20, 83.50], [25.30, 83.00], [24.80, 82.50], [24.30, 83.00]],
  // ── WB / Odisha border ──
  [[22.50, 87.30], [22.00, 87.00], [21.60, 86.80], [21.40, 86.50]],
  // ── Odisha / AP border ──
  [[19.50, 80.80], [19.20, 81.00], [18.80, 81.50], [18.50, 82.00], [18.20, 82.50], [18.00, 83.00], [17.80, 83.30]],
  // ── UP / Bihar border ──
  [[26.80, 83.80], [26.50, 84.00], [26.30, 84.30], [26.00, 84.50], [25.70, 84.30], [25.40, 84.20], [25.00, 84.00]],
  // ── Kerala / Tamil Nadu border (south) ──
  [[11.80, 77.40], [11.50, 77.60], [11.20, 77.80], [10.80, 77.60], [10.50, 77.40], [10.20, 77.20], [9.80, 77.00], [9.50, 77.00], [9.20, 77.10], [8.80, 77.00], [8.50, 77.20]],
  // ── Goa borders ──
  [[15.80, 73.70], [15.60, 74.00], [15.40, 74.20], [15.20, 73.90]],
  // ── Haryana / UP border ──
  [[29.80, 76.70], [29.50, 77.00], [29.20, 77.20], [28.80, 77.30], [28.40, 77.50], [28.00, 77.80], [27.80, 78.00], [27.50, 78.20], [27.20, 78.50], [26.80, 78.50]],
  // ── UP / Rajasthan border ──
  [[27.20, 78.50], [27.00, 78.00], [26.80, 77.50], [26.60, 77.00], [26.50, 76.50], [26.50, 76.00], [26.60, 75.50], [27.00, 75.20], [27.20, 75.00]],
  // ── Uttarakhand / Himachal border ──
  [[31.20, 77.10], [30.80, 77.30], [30.50, 77.50], [30.40, 77.70]],
  // ── Chhattisgarh / Telangana border ──
  [[19.50, 80.80], [19.80, 80.30], [20.00, 79.80], [20.30, 80.00]],
  // ── Chhattisgarh / AP border (south) ──
  [[19.50, 80.80], [19.30, 81.50], [19.00, 82.00], [18.80, 82.50]],
  // ══════ NORTHEAST STATE BORDERS ══════
  // ── Assam / Arunachal Pradesh border ──
  [[27.10, 92.00], [27.20, 92.50], [27.30, 93.00], [27.20, 93.50], [27.10, 94.00], [27.00, 94.50], [27.10, 95.00], [27.20, 95.50]],
  // ── Assam / Nagaland border ──
  [[26.80, 93.80], [26.50, 93.90], [26.20, 94.10], [25.90, 94.20], [25.60, 94.40]],
  // ── Assam / Manipur border ──
  [[25.60, 94.40], [25.30, 94.20], [25.00, 93.80], [24.80, 93.50]],
  // ── Assam / Meghalaya border ──
  [[26.10, 89.80], [26.00, 90.30], [25.90, 90.80], [25.80, 91.30], [25.70, 91.80], [25.60, 92.20], [25.60, 92.60], [25.50, 93.00]],
  // ── Meghalaya / Bangladesh border (south edge) ──
  [[25.50, 93.00], [25.20, 92.80], [25.00, 92.50], [24.90, 92.20], [24.80, 92.00]],
  // ── Assam / Mizoram border ──
  [[24.80, 93.50], [24.50, 93.30], [24.20, 93.00], [24.00, 92.80]],
  // ── Tripura borders ──
  [[24.00, 92.00], [23.80, 91.80], [23.50, 91.50], [23.30, 91.30], [23.00, 91.20], [22.80, 91.50], [22.60, 91.80], [22.40, 91.50]],
  // ── Nagaland / Manipur border ──
  [[25.60, 94.40], [25.40, 94.60], [25.20, 94.50], [25.00, 94.30], [24.80, 94.10], [24.60, 93.90]],
  // ── Manipur / Mizoram border ──
  [[24.20, 93.00], [24.00, 93.20], [23.80, 93.40], [23.50, 93.50]],
  // ── WB / Bihar border ──
  [[25.60, 87.00], [25.80, 87.30], [26.00, 87.60], [26.20, 87.80], [26.40, 88.00], [26.60, 88.10]],
  // ── WB / Jharkhand border (west) ──
  [[22.50, 87.30], [22.80, 86.80], [23.00, 86.50], [23.10, 86.00], [23.30, 85.50], [23.50, 85.00], [23.60, 84.50]],
  // ── WB / Assam connector (Siliguri) ──
  [[26.60, 88.10], [26.70, 88.30], [26.80, 88.50], [27.00, 88.60]],
].map(border => border.map(([lat, lon]) => latLonToNorm(lat, lon) as [number, number]));

export default function GlobeFleet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const revealRef = useRef(0); // 0→1 controls sequential reveal
  const mapOpacityRef = useRef(0); // canvas fade-in
  const trucksRef = useRef<{
    progress: number;
    speed: number;
    from: number;
    to: number;
  }[]>([]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Initialize trucks
    trucksRef.current = ROUTES.map((_, i) => ({
      progress: (i * 0.08) % 1,
      speed: 0.15 + Math.random() * 0.12,
      from: ROUTES[i][0],
      to: ROUTES[i][1],
    }));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    init();

    const canvas = canvasRef.current;
    const sec = secRef.current;
    if (!canvas || !sec) return;

    /* ── GSAP text animations ── */
    gsap.set(".gf-badge", { opacity: 0, y: 20 });
    gsap.set(".gf-title", { opacity: 0, y: 40 });
    gsap.set(".gf-desc", { opacity: 0, y: 25 });
    gsap.set(".gf-stat", { opacity: 0, y: 30 });
    gsap.set(".gf-map", { opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".gf-badge", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(".gf-title", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .to(".gf-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".gf-stat", { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "-=0.3")
      .to(".gf-map", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=0.6");

    /* ── Canvas reveal: animate mapOpacity and reveal progress ── */
    const revealObj = { val: 0, opacity: 0 };
    gsap.to(revealObj, {
      val: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0,
      scrollTrigger: {
        trigger: sec,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        revealRef.current = revealObj.val;
        mapOpacityRef.current = revealObj.opacity;
      },
    });

    const A = { r: 238, g: 52, b: 37 };

    /* Quadratic bezier arc — control point lifted upward-left */
    function getArcPoint(
      x1: number, y1: number, x2: number, y2: number, t: number,
      w: number, h: number
    ) {
      // Control point: midpoint shifted up and slightly perpendicular
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Perpendicular offset (curve outward)
      const perpX = -dy / dist;
      const perpY = dx / dist;
      const lift = dist * 0.3;
      const cx = mx + perpX * lift;
      const cy = my + perpY * lift - dist * 0.15; // also lift upward

      const mt = 1 - t;
      return {
        x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
        y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
      };
    }

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const time = timeRef.current;
      const reveal = revealRef.current;
      const mapAlpha = mapOpacityRef.current;

      // Global canvas opacity
      ctx.globalAlpha = mapAlpha;

      // Padding for the map area
      const pad = 40;
      const mapW = w - pad * 2;
      const mapH = h - pad * 2;

      const cx = (nx: number) => pad + nx * mapW;
      const cy = (ny: number) => pad + ny * mapH;

      /* ── India outline (draws progressively) ── */
      const outlineCount = Math.floor(reveal * INDIA_OUTLINE.length);
      if (outlineCount > 1) {
        ctx.beginPath();
        for (let i = 0; i < outlineCount; i++) {
          const p = INDIA_OUTLINE[i];
          const px = cx(p[0]);
          const py = cy(p[1]);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        if (reveal >= 1) ctx.closePath();
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (reveal >= 1) {
          ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},0.02)`;
          ctx.fill();
        }
      }

      /* ── State borders (appear after outline) ── */
      if (reveal >= 0.6) {
        const borderAlpha = Math.min(1, (reveal - 0.6) / 0.4);
        ctx.save();
        ctx.globalAlpha = mapAlpha * borderAlpha;
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.10)`;
        ctx.lineWidth = 1;
        STATE_BORDERS.forEach((border) => {
          if (border.length < 2) return;
          ctx.beginPath();
          for (let i = 0; i < border.length; i++) {
            const px = cx(border[i][0]);
            const py = cy(border[i][1]);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        });
        ctx.restore();
      }

      /* ── Dashed route arcs (appear after outline is drawn) ── */
      const routeReveal = Math.max(0, (reveal - 0.3) / 0.7); // starts at 30% reveal
      ROUTES.forEach((route, ri) => {
        // Stagger each route
        const routeT = Math.max(0, Math.min(1, (routeReveal - ri * 0.06) * 2));
        if (routeT <= 0) return;

        const from = CITIES[route[0]];
        const to = CITIES[route[1]];
        const drawSegs = Math.floor(routeT * 60);

        ctx.beginPath();
        ctx.setLineDash([6, 4]);
        for (let i = 0; i <= drawSegs; i++) {
          const t = i / 60;
          const p = getArcPoint(cx(from.x), cy(from.y), cx(to.x), cy(to.y), t, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${0.12 * routeT})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* ── Traveling trucks with dotted path (only after routes are visible) ── */
      if (reveal < 0.6) { rafRef.current = requestAnimationFrame(draw); ctx.globalAlpha = 1; return; }
      const truckAlpha = Math.min(1, (reveal - 0.6) / 0.4);

      /* Helper: draw a small truck icon at position, rotated to face direction */
      function drawTruckIcon(tctx: CanvasRenderingContext2D, px: number, py: number, angle: number, s: number) {
        tctx.save();
        tctx.translate(px, py);
        tctx.rotate(angle);

        // Glow behind truck
        const glow = tctx.createRadialGradient(0, 0, 0, 0, 0, s * 3);
        glow.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.5)`);
        glow.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        tctx.beginPath();
        tctx.arc(0, 0, s * 3, 0, Math.PI * 2);
        tctx.fillStyle = glow;
        tctx.fill();

        // Truck body (rectangle)
        const bw = s * 2.8; // body width (along direction)
        const bh = s * 1.6; // body height
        tctx.beginPath();
        tctx.roundRect(-bw * 0.3, -bh / 2, bw, bh, s * 0.3);
        tctx.fillStyle = `rgb(${A.r},${A.g},${A.b})`;
        tctx.fill();

        // Cabin (smaller rect at front)
        const cw = s * 1.0;
        const ch = s * 1.2;
        tctx.beginPath();
        tctx.roundRect(bw * 0.5, -ch / 2, cw, ch, [0, s * 0.3, s * 0.3, 0]);
        tctx.fillStyle = `rgba(255,255,255,0.85)`;
        tctx.fill();

        // Windshield line on cabin
        tctx.beginPath();
        tctx.moveTo(bw * 0.5 + cw * 0.3, -ch / 2 + s * 0.2);
        tctx.lineTo(bw * 0.5 + cw * 0.3, ch / 2 - s * 0.2);
        tctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.4)`;
        tctx.lineWidth = s * 0.15;
        tctx.stroke();

        // Wheels (2 small circles)
        tctx.fillStyle = 'rgba(0,0,0,0.7)';
        tctx.beginPath();
        tctx.arc(-bw * 0.1, bh / 2 + s * 0.1, s * 0.35, 0, Math.PI * 2);
        tctx.fill();
        tctx.beginPath();
        tctx.arc(bw * 0.3, bh / 2 + s * 0.1, s * 0.35, 0, Math.PI * 2);
        tctx.fill();
        tctx.beginPath();
        tctx.arc(-bw * 0.1, -bh / 2 - s * 0.1, s * 0.35, 0, Math.PI * 2);
        tctx.fill();
        tctx.beginPath();
        tctx.arc(bw * 0.3, -bh / 2 - s * 0.1, s * 0.35, 0, Math.PI * 2);
        tctx.fill();

        tctx.restore();
      }

      trucksRef.current.forEach((truck) => {
        truck.progress += truck.speed * 0.016;
        if (truck.progress > 1) truck.progress = 0;

        const from = CITIES[truck.from];
        const to = CITIES[truck.to];
        const fx = cx(from.x), fy = cy(from.y);
        const tx = cx(to.x), ty = cy(to.y);

        ctx.globalAlpha = mapAlpha * truckAlpha;

        // ── Draw full dotted path line for the route ──
        ctx.beginPath();
        ctx.setLineDash([3, 5]);
        const pathSegs = 80;
        for (let i = 0; i <= pathSegs; i++) {
          const t = i / pathSegs;
          const p = getArcPoint(fx, fy, tx, ty, t, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.18)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // ── Draw dotted highlighted trail behind truck ──
        const trailLen = 0.12;
        const trailStart = Math.max(0, truck.progress - trailLen);
        ctx.beginPath();
        ctx.setLineDash([3, 4]);
        const trailSegs = 30;
        for (let i = 0; i <= trailSegs; i++) {
          const t = trailStart + (truck.progress - trailStart) * (i / trailSegs);
          const p = getArcPoint(fx, fy, tx, ty, t, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.7)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        // ── Draw truck icon at current position ──
        const tp = getArcPoint(fx, fy, tx, ty, truck.progress, w, h);
        // Get direction angle from a point slightly behind
        const ahead = getArcPoint(fx, fy, tx, ty, Math.min(1, truck.progress + 0.02), w, h);
        const angle = Math.atan2(ahead.y - tp.y, ahead.x - tp.x);
        drawTruckIcon(ctx, tp.x, tp.y, angle, 3);

        ctx.globalAlpha = mapAlpha;
      });

      /* ── City dots (appear sequentially) ── */
      const cityReveal = Math.max(0, (reveal - 0.15) / 0.6);
      CITIES.forEach((city, i) => {
        const cityT = Math.max(0, Math.min(1, (cityReveal - i * 0.07) * 3));
        if (cityT <= 0) return;

        const px = cx(city.x);
        const py = cy(city.y);
        const cityScale = 0.3 + 0.7 * cityT;

        // Pulse ring
        const pulse = ((time * 0.6 + i * 0.4) % 2);
        if (pulse < 1.5) {
          const pr = 6 + pulse * 14;
          const pa = Math.max(0, 0.25 * (1 - pulse / 1.5));
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${pa})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer glow
        ctx.globalAlpha = mapAlpha * cityT;
        const cGlow = ctx.createRadialGradient(px, py, 0, px, py, 12 * cityScale);
        cGlow.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.3)`);
        cGlow.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 12 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = cGlow;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(px, py, 5 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${A.r},${A.g},${A.b})`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(px, py, 2 * cityScale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();

        // City name (fades in)
        ctx.globalAlpha = mapAlpha * Math.max(0, cityT - 0.4) / 0.6;
        ctx.font = "bold 9px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.textAlign = "center";
        ctx.fillText(city.name.toUpperCase(), px, py + 16);
        ctx.globalAlpha = mapAlpha;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [init]);

  return (
    <section
      ref={secRef}
      className="relative py-6 md:py-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#000 0%,#060608 50%,#000 100%)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(238,52,37,0.05) 0%,transparent 60%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left */}
          <div className="flex-1 max-w-xl">
            <div className="gf-badge mb-5">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ border: "1px solid rgba(238,52,37,0.25)", background: "rgba(238,52,37,0.06)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 bg-[#ee3425]" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee3425]" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(238,52,37,0.85)" }}>
                  Pan-India Network
                </span>
              </div>
            </div>

            <h2 className="gf-title text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Connecting cities.<br />
              <span style={{ color: "#ee3425" }}>Powering commerce.</span>
            </h2>

            <p className="gf-desc text-white/70 text-[15px] md:text-base leading-[1.8] mb-8">
              Our fleet network spans major Indian cities, delivering goods
              across intercity corridors with real-time tracking, optimized
              routes, and operational precision — from first mile to final
              doorstep.
            </p>

            <div className="flex gap-8 md:gap-12">
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">10+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Major Cities</div>
              </div>
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">200+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Clients Served</div>
              </div>
              <div className="gf-stat">
                <div className="text-2xl md:text-3xl font-black text-white">3L+</div>
                <div className="text-[12px] text-white/70 mt-1 uppercase tracking-wider">Trips Completed</div>
              </div>
            </div>
          </div>

          {/* Right: India Map Canvas */}
          <div className="flex-1 w-full lg:w-auto lg:flex-[1.3]">
            <div className="gf-map relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: "0.85" }}>
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
