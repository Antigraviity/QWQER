"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Indian city coordinates (lat, lon) ─── */
const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
];

/* Routes between cities (index pairs) */
const ROUTES = [
  [0, 1], // Mumbai → Delhi
  [2, 3], // Bangalore → Chennai
  [0, 2], // Mumbai → Bangalore
  [1, 5], // Delhi → Kolkata
  [4, 1], // Hyderabad → Delhi
  [0, 6], // Mumbai → Pune
  [7, 1], // Ahmedabad → Delhi
  [8, 9], // Jaipur → Lucknow
  [3, 4], // Chennai → Hyderabad
  [5, 2], // Kolkata → Bangalore
];

/* Convert lat/lon to 3D position on sphere */
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* Create a parabolic arc between two points on a sphere */
function createArcPoints(start: THREE.Vector3, end: THREE.Vector3, radius: number, segments = 64): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const dist = start.distanceTo(end);
  const midHeight = radius + dist * 0.35;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const base = new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(radius);
    const elevation = Math.sin(t * Math.PI) * (midHeight - radius);
    const point = base.clone().normalize().multiplyScalar(radius + elevation);
    points.push(point);
  }
  return points;
}

export default function GlobeFleet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ─── Scene setup ─── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* ─── Globe ─── */
    const GLOBE_RADIUS = 1.4;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    globeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

    // Solid inner sphere (dark fill)
    const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.995, 48, 48);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a14,
      transparent: true,
      opacity: 0.9,
    });
    globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringRadius = GLOBE_RADIUS * Math.sin(phi);
      const y = GLOBE_RADIUS * Math.cos(phi);
      const ringGeo = new THREE.RingGeometry(ringRadius - 0.001, ringRadius + 0.001, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      globeGroup.add(ring);
    }

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 48, 48);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.93, 0.2, 0.14, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    /* ─── City dots ─── */
    const cityPositions = CITIES.map((c) => latLonToVec3(c.lat, c.lon, GLOBE_RADIUS));
    const dotGeo = new THREE.SphereGeometry(0.018, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xee3425 });
    cityPositions.forEach((pos) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Pulse ring around dot
      const ringGeo2 = new THREE.RingGeometry(0.02, 0.035, 16);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xee3425,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.position.copy(pos);
      ring2.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring2);
    });

    /* ─── Route arcs + traveling trucks ─── */
    interface TruckData {
      progress: number;
      speed: number;
      arcPoints: THREE.Vector3[];
      mesh: THREE.Mesh;
      trail: THREE.Line;
      trailGeo: THREE.BufferGeometry;
    }
    const trucks: TruckData[] = [];

    ROUTES.forEach((route, idx) => {
      const startPos = cityPositions[route[0]];
      const endPos = cityPositions[route[1]];
      const arcPoints = createArcPoints(startPos, endPos, GLOBE_RADIUS, 80);

      // Dashed arc path (faint dotted line)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineDashedMaterial({
        color: 0xee3425,
        transparent: true,
        opacity: 0.15,
        dashSize: 0.02,
        gapSize: 0.015,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcLine.computeLineDistances();
      globeGroup.add(arcLine);

      // Truck (small glowing sphere)
      const truckGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const truckMat = new THREE.MeshBasicMaterial({ color: 0xee3425 });
      const truckMesh = new THREE.Mesh(truckGeo, truckMat);
      truckMesh.position.copy(arcPoints[0]);
      globeGroup.add(truckMesh);

      // Truck glow
      const glowTruck = new THREE.PointLight(0xee3425, 0.3, 0.3);
      truckMesh.add(glowTruck);

      // Trail behind truck
      const trailGeo = new THREE.BufferGeometry();
      const trailMat = new THREE.LineBasicMaterial({
        color: 0xee3425,
        transparent: true,
        opacity: 0.5,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      globeGroup.add(trail);

      trucks.push({
        progress: idx * 0.12,
        speed: 0.08 + Math.random() * 0.06,
        arcPoints,
        mesh: truckMesh,
        trail,
        trailGeo,
      });
    });

    /* ─── Ambient light particles ─── */
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.acos(2 * Math.random() - 1);
      const r = GLOBE_RADIUS * 1.1 + Math.random() * 0.6;
      particlePositions[i * 3] = r * Math.sin(phi2) * Math.cos(theta2);
      particlePositions[i * 3 + 1] = r * Math.cos(phi2);
      particlePositions[i * 3 + 2] = r * Math.sin(phi2) * Math.sin(theta2);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xee3425,
      size: 0.008,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });
    globeGroup.add(new THREE.Points(particleGeo, particleMat));

    /* ─── Tilt globe to show India prominently ─── */
    globeGroup.rotation.y = -1.35;
    globeGroup.rotation.x = 0.25;

    /* ─── Slow auto-rotation via GSAP scroll ─── */
    const baseRotY = globeGroup.rotation.y;
    gsap.to(globeGroup.rotation, {
      y: baseRotY - 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    /* ─── Animate ─── */
    const animate = () => {
      // Slow idle rotation
      globeGroup.rotation.y += 0.0008;

      // Animate trucks along arcs
      trucks.forEach((truck) => {
        truck.progress += truck.speed * 0.016;
        if (truck.progress > 1) truck.progress = 0;

        const idx = Math.floor(truck.progress * (truck.arcPoints.length - 1));
        const clampedIdx = Math.min(idx, truck.arcPoints.length - 1);
        truck.mesh.position.copy(truck.arcPoints[clampedIdx]);

        // Update trail (show path behind truck)
        const trailEnd = clampedIdx + 1;
        const trailStart = Math.max(0, trailEnd - 20);
        const trailPoints = truck.arcPoints.slice(trailStart, trailEnd);
        if (trailPoints.length > 1) {
          truck.trailGeo.dispose();
          const newTrailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
          truck.trail.geometry = newTrailGeo;
        }
      });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    /* ─── Resize handler ─── */
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    /* ─── Cleanup ─── */
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #060608 50%, #000 100%)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(238,52,37,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <div className="mb-5">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  border: "1px solid rgba(238,52,37,0.25)",
                  background: "rgba(238,52,37,0.06)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 bg-[#ee3425]" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee3425]" />
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.18em] font-semibold"
                  style={{ color: "rgba(238,52,37,0.85)" }}
                >
                  Pan-India Network
                </span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Connecting cities.
              <br />
              <span style={{ color: "#ee3425" }}>Powering commerce.</span>
            </h2>

            <p className="text-white/40 text-[15px] md:text-base leading-[1.8] mb-8">
              Our fleet network spans major Indian cities, delivering goods
              across intercity corridors with real-time tracking, optimized
              routes, and operational precision — from first mile to final
              doorstep.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 md:gap-12">
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">10+</div>
                <div className="text-[12px] text-white/35 mt-1 uppercase tracking-wider">Major Cities</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">200+</div>
                <div className="text-[12px] text-white/35 mt-1 uppercase tracking-wider">Clients Served</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">3L+</div>
                <div className="text-[12px] text-white/35 mt-1 uppercase tracking-wider">Trips Completed</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Globe */}
          <div className="flex-1 w-full lg:w-auto">
            <div
              ref={containerRef}
              className="w-full aspect-square max-w-[600px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
