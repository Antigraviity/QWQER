"use client";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* India outline helper: convert lat/lon to normalized 0-1 coordinates */
/* Uses Mercator projection for a more recognizable India silhouette */
function latToMercY(lat: number): number {
  const latRad = (lat * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}
const MERC_Y_MIN = latToMercY(6);
const MERC_Y_MAX = latToMercY(37);
function latLonToNorm(lat: number, lon: number): [number, number] {
  const x = (lon - 68) / (97.5 - 68);
  const mercY = latToMercY(lat);
  const y = 1 - (mercY - MERC_Y_MIN) / (MERC_Y_MAX - MERC_Y_MIN);
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
  { name: "Srinagar",  x: latLonToNorm(34.08, 74.79)[0], y: latLonToNorm(34.08, 74.79)[1] },
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
  [12, 1], // Srinagar → Delhi
];

/* India outline data — kept for potential future use but map now uses india-map.webp image */
/* eslint-disable no-unused-vars */
const _INDIA_OUTLINE: [number, number][] = [
  // === J&K / Pakistan border start ===
  latLonToNorm(32.87, 74.59), latLonToNorm(33.10, 74.40), latLonToNorm(33.30, 74.25),
  latLonToNorm(33.52, 74.15), latLonToNorm(33.73, 74.28), latLonToNorm(33.90, 74.50),
  latLonToNorm(34.05, 74.75), latLonToNorm(34.20, 75.05), latLonToNorm(34.40, 75.35),
  latLonToNorm(34.58, 75.65), latLonToNorm(34.75, 76.00), latLonToNorm(34.90, 76.35),
  latLonToNorm(35.05, 76.65), latLonToNorm(35.18, 77.00), latLonToNorm(35.30, 77.40),
  latLonToNorm(35.42, 77.80),
  // === Ladakh east / Aksai Chin ===
  latLonToNorm(35.30, 78.10), latLonToNorm(35.10, 78.35), latLonToNorm(34.85, 78.55),
  latLonToNorm(34.55, 78.72), latLonToNorm(34.25, 78.85), latLonToNorm(33.95, 78.97),
  latLonToNorm(33.65, 79.05), latLonToNorm(33.35, 79.10), latLonToNorm(33.05, 79.18),
  latLonToNorm(32.75, 79.28), latLonToNorm(32.45, 79.40),
  // === Uttarakhand / Nepal border ===
  latLonToNorm(32.10, 79.48), latLonToNorm(31.75, 79.65), latLonToNorm(31.40, 79.82),
  latLonToNorm(31.10, 79.98), latLonToNorm(30.80, 80.15), latLonToNorm(30.50, 80.35),
  latLonToNorm(30.20, 80.58), latLonToNorm(29.90, 80.80),
  // === Nepal border (east) ===
  latLonToNorm(29.60, 80.92), latLonToNorm(29.30, 81.10), latLonToNorm(29.00, 81.40),
  latLonToNorm(28.70, 81.75), latLonToNorm(28.40, 82.15), latLonToNorm(28.15, 82.55),
  latLonToNorm(27.90, 82.95), latLonToNorm(27.70, 83.35), latLonToNorm(27.55, 83.75),
  latLonToNorm(27.42, 84.15), latLonToNorm(27.32, 84.55), latLonToNorm(27.22, 84.95),
  latLonToNorm(27.08, 85.35), latLonToNorm(26.90, 85.75), latLonToNorm(26.72, 86.15),
  latLonToNorm(26.55, 86.55), latLonToNorm(26.45, 86.95), latLonToNorm(26.42, 87.30),
  latLonToNorm(26.50, 87.65), latLonToNorm(26.60, 88.00),
  // === Siliguri corridor ===
  latLonToNorm(26.70, 88.20), latLonToNorm(26.82, 88.35), latLonToNorm(26.95, 88.48),
  latLonToNorm(27.10, 88.58), latLonToNorm(27.28, 88.68),
  // === Sikkim / Bhutan border ===
  latLonToNorm(27.48, 88.73), latLonToNorm(27.72, 88.80), latLonToNorm(27.95, 88.88),
  // === Northeast — Arunachal Pradesh ===
  latLonToNorm(28.10, 89.30), latLonToNorm(27.90, 89.80), latLonToNorm(27.65, 90.40),
  latLonToNorm(27.48, 90.95), latLonToNorm(27.65, 91.45), latLonToNorm(27.85, 91.90),
  latLonToNorm(28.05, 92.35), latLonToNorm(28.15, 92.80), latLonToNorm(28.00, 93.30),
  latLonToNorm(27.82, 93.80), latLonToNorm(27.60, 94.30), latLonToNorm(27.42, 94.80),
  latLonToNorm(27.55, 95.30), latLonToNorm(27.72, 95.80), latLonToNorm(27.80, 96.20),
  latLonToNorm(27.62, 96.60), latLonToNorm(27.35, 96.95),
  // === NE — Myanmar border (south) ===
  latLonToNorm(27.05, 97.10), latLonToNorm(26.70, 96.90), latLonToNorm(26.35, 96.65),
  latLonToNorm(26.00, 96.35), latLonToNorm(25.65, 95.95), latLonToNorm(25.30, 95.50),
  latLonToNorm(24.95, 95.05), latLonToNorm(24.60, 94.60), latLonToNorm(24.25, 94.22),
  latLonToNorm(23.90, 93.85), latLonToNorm(23.55, 93.52), latLonToNorm(23.25, 93.30),
  // === Mizoram / Chin Hills ===
  latLonToNorm(22.95, 93.22), latLonToNorm(22.60, 93.12), latLonToNorm(22.25, 92.95),
  latLonToNorm(21.90, 92.72), latLonToNorm(21.55, 92.48), latLonToNorm(21.25, 92.30),
  // === Chittagong / Bangladesh SE ===
  latLonToNorm(21.15, 92.10), latLonToNorm(21.30, 91.75), latLonToNorm(21.55, 91.45),
  latLonToNorm(21.85, 91.18), latLonToNorm(22.15, 90.90), latLonToNorm(22.40, 90.65),
  latLonToNorm(22.65, 90.55),
  // === Bangladesh border — north through Sylhet ===
  latLonToNorm(22.95, 90.55), latLonToNorm(23.30, 90.62), latLonToNorm(23.65, 90.70),
  latLonToNorm(23.95, 90.80), latLonToNorm(24.22, 91.08), latLonToNorm(24.45, 91.42),
  latLonToNorm(24.68, 91.78), latLonToNorm(24.90, 92.05),
  // === Meghalaya / Assam (back west) ===
  latLonToNorm(25.15, 92.08), latLonToNorm(25.35, 91.80), latLonToNorm(25.50, 91.42),
  latLonToNorm(25.62, 91.00), latLonToNorm(25.58, 90.55), latLonToNorm(25.70, 90.10),
  latLonToNorm(25.88, 89.80), latLonToNorm(26.08, 89.55),
  // === Back to Siliguri (NE side) ===
  latLonToNorm(26.22, 89.60), latLonToNorm(26.35, 89.72), latLonToNorm(26.42, 89.55),
  latLonToNorm(26.38, 89.20), latLonToNorm(26.22, 88.90), latLonToNorm(26.00, 88.62),
  latLonToNorm(25.72, 88.40), latLonToNorm(25.40, 88.28),
  // === Bangladesh west border ===
  latLonToNorm(25.10, 88.50), latLonToNorm(24.80, 88.62), latLonToNorm(24.50, 88.75),
  latLonToNorm(24.20, 88.90), latLonToNorm(23.95, 88.82), latLonToNorm(23.70, 88.65),
  latLonToNorm(23.42, 88.58), latLonToNorm(23.15, 88.65), latLonToNorm(22.90, 88.78),
  // === Sundarbans / WB coast ===
  latLonToNorm(22.55, 88.72), latLonToNorm(22.22, 88.52), latLonToNorm(21.90, 88.22),
  latLonToNorm(21.62, 87.80), latLonToNorm(21.48, 87.40),
  // === Odisha coast ===
  latLonToNorm(21.35, 87.00), latLonToNorm(21.15, 86.72), latLonToNorm(20.85, 86.62),
  latLonToNorm(20.55, 86.50), latLonToNorm(20.25, 86.32), latLonToNorm(19.95, 86.00),
  latLonToNorm(19.65, 85.55), latLonToNorm(19.35, 85.10), latLonToNorm(19.10, 84.70),
  latLonToNorm(18.82, 84.30),
  // === Andhra coast ===
  latLonToNorm(18.52, 83.92), latLonToNorm(18.22, 83.60), latLonToNorm(17.92, 83.32),
  latLonToNorm(17.62, 83.08), latLonToNorm(17.32, 82.72), latLonToNorm(17.02, 82.35),
  latLonToNorm(16.72, 82.05), latLonToNorm(16.40, 81.72), latLonToNorm(16.10, 81.32),
  latLonToNorm(15.80, 80.92), latLonToNorm(15.50, 80.52), latLonToNorm(15.22, 80.22),
  latLonToNorm(14.88, 80.05), latLonToNorm(14.55, 79.95),
  // === Tamil Nadu east coast ===
  latLonToNorm(14.18, 80.05), latLonToNorm(13.75, 80.15), latLonToNorm(13.35, 80.25),
  latLonToNorm(13.00, 80.25), latLonToNorm(12.65, 80.08), latLonToNorm(12.30, 79.88),
  latLonToNorm(11.95, 79.78), latLonToNorm(11.60, 79.78), latLonToNorm(11.25, 79.78),
  latLonToNorm(10.90, 79.72), latLonToNorm(10.55, 79.60), latLonToNorm(10.25, 79.42),
  latLonToNorm(9.95, 79.25), latLonToNorm(9.65, 79.10),
  // === Palk Strait / south tip ===
  latLonToNorm(9.35, 79.00), latLonToNorm(9.08, 78.85), latLonToNorm(8.82, 78.55),
  latLonToNorm(8.55, 78.15), latLonToNorm(8.30, 77.72),
  // === Kanyakumari ===
  latLonToNorm(8.08, 77.52), latLonToNorm(7.98, 77.38),
  // === Kerala west coast ===
  latLonToNorm(8.10, 77.15), latLonToNorm(8.25, 77.00), latLonToNorm(8.42, 76.88),
  latLonToNorm(8.62, 76.72), latLonToNorm(8.82, 76.55), latLonToNorm(9.05, 76.40),
  latLonToNorm(9.30, 76.30), latLonToNorm(9.55, 76.25), latLonToNorm(9.80, 76.22),
  latLonToNorm(10.05, 76.18), latLonToNorm(10.30, 76.08), latLonToNorm(10.55, 76.00),
  latLonToNorm(10.82, 75.85), latLonToNorm(11.10, 75.65), latLonToNorm(11.38, 75.45),
  latLonToNorm(11.65, 75.25),
  // === Karnataka coast ===
  latLonToNorm(11.95, 75.08), latLonToNorm(12.28, 74.88), latLonToNorm(12.60, 74.78),
  latLonToNorm(12.95, 74.68), latLonToNorm(13.30, 74.58), latLonToNorm(13.65, 74.48),
  latLonToNorm(13.98, 74.35), latLonToNorm(14.32, 74.18), latLonToNorm(14.65, 74.02),
  // === Goa ===
  latLonToNorm(14.98, 73.88), latLonToNorm(15.30, 73.78), latLonToNorm(15.58, 73.68),
  // === Maharashtra / Konkan coast ===
  latLonToNorm(15.88, 73.48), latLonToNorm(16.20, 73.32), latLonToNorm(16.55, 73.18),
  latLonToNorm(16.88, 73.05), latLonToNorm(17.20, 72.98), latLonToNorm(17.55, 72.92),
  latLonToNorm(17.88, 72.88), latLonToNorm(18.20, 72.85), latLonToNorm(18.55, 72.82),
  latLonToNorm(18.88, 72.80), latLonToNorm(19.18, 72.80), latLonToNorm(19.48, 72.82),
  latLonToNorm(19.78, 72.78), latLonToNorm(20.08, 72.72), latLonToNorm(20.38, 72.62),
  // === Gujarat coast ===
  latLonToNorm(20.65, 72.48), latLonToNorm(20.88, 72.28), latLonToNorm(21.08, 72.12),
  latLonToNorm(21.25, 71.95), latLonToNorm(21.42, 71.75), latLonToNorm(21.55, 71.50),
  // === Saurashtra peninsula (simplified — no deep Gulf of Khambhat) ===
  latLonToNorm(21.62, 71.20), latLonToNorm(21.72, 70.85), latLonToNorm(21.85, 70.50),
  latLonToNorm(22.00, 70.15), latLonToNorm(22.15, 69.80), latLonToNorm(22.32, 69.45),
  latLonToNorm(22.50, 69.10), latLonToNorm(22.65, 68.80),
  // === Kathiawar tip — goes south and comes back ===
  latLonToNorm(22.42, 68.62), latLonToNorm(22.10, 68.72), latLonToNorm(21.75, 68.88),
  latLonToNorm(21.40, 69.10), latLonToNorm(21.10, 69.42), latLonToNorm(20.88, 69.80),
  latLonToNorm(20.80, 70.22), latLonToNorm(20.88, 70.62), latLonToNorm(21.05, 70.95),
  latLonToNorm(21.28, 71.18), latLonToNorm(21.55, 71.42),
  // === Gulf of Khambhat (simplified V) ===
  latLonToNorm(21.82, 71.55), latLonToNorm(22.05, 71.72), latLonToNorm(22.25, 71.92),
  latLonToNorm(22.42, 72.15), latLonToNorm(22.30, 72.35), latLonToNorm(22.10, 72.48),
  latLonToNorm(21.85, 72.55), latLonToNorm(21.60, 72.42),
  // === Kutch / Rann ===
  latLonToNorm(22.40, 72.30), latLonToNorm(22.70, 72.18), latLonToNorm(22.95, 71.95),
  latLonToNorm(23.15, 71.60), latLonToNorm(23.35, 71.20),
  latLonToNorm(23.48, 70.75), latLonToNorm(23.58, 70.25), latLonToNorm(23.68, 69.75),
  latLonToNorm(23.78, 69.30), latLonToNorm(23.88, 68.88), latLonToNorm(23.98, 68.55),
  // === Pakistan border going north ===
  latLonToNorm(24.15, 68.75), latLonToNorm(24.35, 69.00), latLonToNorm(24.55, 69.35),
  latLonToNorm(24.68, 69.65), latLonToNorm(24.62, 70.00), latLonToNorm(24.45, 70.30),
  latLonToNorm(24.30, 70.55), latLonToNorm(24.25, 70.85), latLonToNorm(24.40, 71.05),
  latLonToNorm(24.62, 70.95), latLonToNorm(24.88, 70.78), latLonToNorm(25.15, 70.58),
  latLonToNorm(25.45, 70.38), latLonToNorm(25.75, 70.18), latLonToNorm(26.05, 70.05),
  latLonToNorm(26.35, 69.95), latLonToNorm(26.65, 69.88), latLonToNorm(26.95, 69.88),
  latLonToNorm(27.25, 69.92), latLonToNorm(27.55, 70.00), latLonToNorm(27.85, 70.15),
  latLonToNorm(28.15, 70.32), latLonToNorm(28.45, 70.52), latLonToNorm(28.72, 70.72),
  // === Punjab / Rajasthan border ===
  latLonToNorm(28.98, 70.92), latLonToNorm(29.25, 71.12), latLonToNorm(29.50, 71.32),
  latLonToNorm(29.72, 71.55), latLonToNorm(29.92, 71.80), latLonToNorm(30.12, 72.08),
  latLonToNorm(30.32, 72.38), latLonToNorm(30.50, 72.68), latLonToNorm(30.68, 72.98),
  latLonToNorm(30.88, 73.25), latLonToNorm(31.08, 73.55), latLonToNorm(31.28, 73.85),
  latLonToNorm(31.48, 74.10), latLonToNorm(31.65, 74.32), latLonToNorm(31.82, 74.48),
  latLonToNorm(32.05, 74.55), latLonToNorm(32.30, 74.58), latLonToNorm(32.58, 74.60),
  latLonToNorm(32.87, 74.59),
];

/* State borders data — kept for potential future use */
const _STATE_BORDERS: [number, number][][] = [
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

    // Counter animations for stats
    document.querySelectorAll(".gf-counter").forEach((el) => {
      const target = parseFloat((el as HTMLElement).dataset.target || "0");
      const suffix = (el as HTMLElement).dataset.suffix || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
        },
      });
    });

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

    // White/grey theme for map outlines
    const A = { r: 255, g: 255, b: 255 };
    // Red accent for trucks
    const T = { r: 238, g: 52, b: 37 };

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

      // South Indian Express cities use scooter icons
      const SCOOTER_CITIES = new Set([2, 3, 4, 10]); // Bangalore, Chennai, Hyderabad, Kochi

      /* Helper: draw a scooter icon at position, rotated to face direction */
      function drawScooterIcon(tctx: CanvasRenderingContext2D, px: number, py: number, angle: number, s: number) {
        tctx.save();
        tctx.translate(px, py);
        tctx.rotate(angle);

        // Glow behind scooter (purple for Express)
        const glow = tctx.createRadialGradient(0, 0, 0, 0, 0, s * 3);
        glow.addColorStop(0, `rgba(108,58,224,0.6)`);
        glow.addColorStop(1, `rgba(108,58,224,0)`);
        tctx.beginPath();
        tctx.arc(0, 0, s * 3, 0, Math.PI * 2);
        tctx.fillStyle = glow;
        tctx.fill();

        // Scooter body (sleek elongated shape)
        const bw = s * 2.2;
        const bh = s * 1.0;
        tctx.beginPath();
        tctx.roundRect(-bw * 0.4, -bh / 2, bw, bh, s * 0.4);
        tctx.fillStyle = `rgb(108,58,224)`;
        tctx.fill();

        // Handlebar (front)
        tctx.beginPath();
        tctx.roundRect(bw * 0.45, -bh * 0.8, s * 0.5, bh * 1.6, s * 0.2);
        tctx.fillStyle = `rgba(200,200,200,0.8)`;
        tctx.fill();

        // Seat (small bump on top)
        tctx.beginPath();
        tctx.ellipse(-s * 0.1, -bh * 0.5, s * 0.6, s * 0.25, 0, 0, Math.PI * 2);
        tctx.fillStyle = `rgba(60,30,120,0.9)`;
        tctx.fill();

        // Front wheel
        tctx.fillStyle = 'rgba(80,80,80,0.9)';
        tctx.beginPath();
        tctx.arc(bw * 0.35, bh / 2 + s * 0.15, s * 0.3, 0, Math.PI * 2);
        tctx.fill();
        // Rear wheel
        tctx.beginPath();
        tctx.arc(-bw * 0.25, bh / 2 + s * 0.15, s * 0.3, 0, Math.PI * 2);
        tctx.fill();

        tctx.restore();
      }

      /* Helper: draw a small truck icon at position, rotated to face direction */
      function drawTruckIcon(tctx: CanvasRenderingContext2D, px: number, py: number, angle: number, s: number) {
        tctx.save();
        tctx.translate(px, py);
        tctx.rotate(angle);

        // Glow behind truck
        const glow = tctx.createRadialGradient(0, 0, 0, 0, 0, s * 3);
        glow.addColorStop(0, `rgba(${T.r},${T.g},${T.b},0.6)`);
        glow.addColorStop(1, `rgba(${T.r},${T.g},${T.b},0)`);
        tctx.beginPath();
        tctx.arc(0, 0, s * 3, 0, Math.PI * 2);
        tctx.fillStyle = glow;
        tctx.fill();

        // Truck body (rectangle)
        const bw = s * 2.8; // body width (along direction)
        const bh = s * 1.6; // body height
        tctx.beginPath();
        tctx.roundRect(-bw * 0.3, -bh / 2, bw, bh, s * 0.3);
        tctx.fillStyle = `rgb(${T.r},${T.g},${T.b})`;
        tctx.fill();

        // Cabin (smaller rect at front)
        const cw = s * 1.0;
        const ch = s * 1.2;
        tctx.beginPath();
        tctx.roundRect(bw * 0.5, -ch / 2, cw, ch, [0, s * 0.3, s * 0.3, 0]);
        tctx.fillStyle = `rgba(180,180,180,0.85)`;
        tctx.fill();

        // Windshield line on cabin
        tctx.beginPath();
        tctx.moveTo(bw * 0.5 + cw * 0.3, -ch / 2 + s * 0.2);
        tctx.lineTo(bw * 0.5 + cw * 0.3, ch / 2 - s * 0.2);
        tctx.strokeStyle = `rgba(100,100,100,0.4)`;
        tctx.lineWidth = s * 0.15;
        tctx.stroke();

        // Wheels (2 small circles)
        tctx.fillStyle = 'rgba(80,80,80,0.8)';
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
        ctx.strokeStyle = `rgba(${T.r},${T.g},${T.b},0.15)`;
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
        ctx.strokeStyle = `rgba(${T.r},${T.g},${T.b},0.7)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        // ── Draw vehicle icon at current position ──
        const tp = getArcPoint(fx, fy, tx, ty, truck.progress, w, h);
        // Get direction angle from a point slightly behind
        const ahead = getArcPoint(fx, fy, tx, ty, Math.min(1, truck.progress + 0.02), w, h);
        const angle = Math.atan2(ahead.y - tp.y, ahead.x - tp.x);
        // Use scooter for routes where BOTH cities are South Indian Express cities
        const isScooterRoute = SCOOTER_CITIES.has(truck.from) && SCOOTER_CITIES.has(truck.to);
        if (isScooterRoute) {
          drawScooterIcon(ctx, tp.x, tp.y, angle, 5.5);
        } else {
          drawTruckIcon(ctx, tp.x, tp.y, angle, 5.5);
        }

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
        style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 60%)", filter: "blur(80px)" }}
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
              QWQER Fleet and Express together cover every mile of your supply chain, from hyperlocal last mile to intercity full truckload, backed by real-time visibility and optimised routing.
            </p>


          </div>

          {/* Right: India Map */}
          <div className="flex-1 w-full lg:w-auto lg:flex-[1.3]">
            <div className="gf-map relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: "0.85" }}>
              {/* Static India map image */}
              <Image 
                src="/india-map.webp" 
                alt="India Map" 
                fill
                className="absolute inset-0 w-full h-full object-contain opacity-70 pointer-events-none" 
                priority
              />
              {/* Animated overlay canvas for cities, routes, trucks */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
