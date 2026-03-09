"use client";
import { useEffect, useRef } from "react";

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const THREE = await import("three");

      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 3.2;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Globe group
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Tilt the globe slightly for a nicer angle
      globeGroup.rotation.x = 0.3;
      globeGroup.rotation.z = -0.1;

      const GLOBE_RADIUS = 1.2;
      const A = 0xee3425; // brand red

      // === WIREFRAME SPHERE ===
      const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 36, 24);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      });
      const wireSphere = new THREE.Mesh(wireGeo, wireMat);
      globeGroup.add(wireSphere);

      // === LATITUDE RINGS ===
      const latitudes = [-60, -30, 0, 30, 60];
      latitudes.forEach((lat) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = GLOBE_RADIUS * Math.sin(phi);
        const y = GLOBE_RADIUS * Math.cos(phi);
        const ringGeo = new THREE.RingGeometry(r - 0.003, r + 0.003, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: lat === 0 ? A : 0xffffff,
          transparent: true,
          opacity: lat === 0 ? 0.15 : 0.06,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = y;
        ring.rotation.x = Math.PI / 2;
        globeGroup.add(ring);
      });

      // === LONGITUDE LINES ===
      const longitudes = [0, 30, 60, 90, 120, 150];
      longitudes.forEach((lon) => {
        const points: InstanceType<typeof THREE.Vector3>[] = [];
        for (let i = 0; i <= 100; i++) {
          const phi = (i / 100) * Math.PI;
          const theta = (lon * Math.PI) / 180;
          const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = GLOBE_RADIUS * Math.cos(phi);
          const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
          points.push(new THREE.Vector3(x, y, z));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: lon % 60 === 0 ? A : 0xffffff,
          transparent: true,
          opacity: lon % 60 === 0 ? 0.12 : 0.05,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        globeGroup.add(line);
      });

      // === OUTER GLOW RING ===
      const glowRingGeo = new THREE.RingGeometry(GLOBE_RADIUS + 0.02, GLOBE_RADIUS + 0.04, 80);
      const glowRingMat = new THREE.MeshBasicMaterial({
        color: A,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
      glowRing.rotation.x = Math.PI / 2;
      globeGroup.add(glowRing);



      // === AMBIENT PARTICLES around globe ===
      const particleCount = 80;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = GLOBE_RADIUS + 0.1 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = r * Math.cos(phi);
        particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.012,
        transparent: true,
        opacity: 0.3,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      globeGroup.add(particles);

      // === ANIMATION ===
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        globeGroup.rotation.y += 0.002; // Slow rotation
        particles.rotation.y -= 0.0005; // Counter-rotate particles
        renderer.render(scene, camera);
      };
      animate();

      // === RESIZE ===
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        width: "600px",
        height: "600px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.7,
      }}
    />
  );
}
