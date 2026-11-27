"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";

interface WebGLTopographicStageProps {
  className?: string;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Preserves the exact animated topographic field and cursor ripple math while shifting colors to Ink Black, Electric Cobalt, and Acid Yellow/Ivory contour lines.
const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = max(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    float distMouse = length(p - vec2((uMouse.x - 0.5) * aspect, (1.0 - uMouse.y) - 0.5));
    float ripple = exp(-distMouse * 3.2) * 0.25;

    float field = noise(p * 3.1 + vec2(uTime * 0.06, -uTime * 0.04));
    field += 0.5 * noise(p * 6.2 - vec2(uTime * 0.05, uTime * 0.03));
    field += ripple;

    // Sharp topographic elevation contour bands
    float contours = abs(fract(field * 7.5) - 0.5);
    float lineMask = 1.0 - smoothstep(0.0, 0.042, contours);

    vec3 inkBase = vec3(0.082, 0.082, 0.082);      // Deep Ink Black #151515
    vec3 cobaltTint = vec3(0.114, 0.224, 0.620);   // Deep Cobalt shade anchored under ink
    vec3 ivoryContour = vec3(0.961, 0.941, 0.902); // Warm Ivory #F5F0E6
    vec3 acidWave = vec3(0.914, 1.000, 0.271);     // Acid Yellow #E9FF45 near cursor ripple

    vec3 baseColor = mix(inkBase, cobaltTint, smoothstep(-0.25, 0.85, p.y + field * 0.25));
    vec3 strokeTone = mix(ivoryContour, acidWave, exp(-distMouse * 2.2));
    vec3 finalColor = mix(baseColor, strokeTone, lineMask * 0.22);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/** Renders the real-time Three.js WebGL topographic canvas with existing shader motion preserved under Neo-Brutalist palette colors. */
export function WebGLTopographicStage({
  className = "",
}: WebGLTopographicStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reducedMotion } = useCinemaEngine();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) {
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let rafId = 0;
    let observer: ResizeObserver | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const width = container.clientWidth || 1200;
      const height = container.clientHeight || 720;
      renderer.setSize(width, height);
      renderer.domElement.className = "block h-full w-full";
      container.appendChild(renderer.domElement);

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.55, 0.45) },
        uResolution: { value: new THREE.Vector2(width, height) },
      };

      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const targetMouse = new THREE.Vector2(0.55, 0.45);

      /** Tracks pointer position normalized across the shader stage viewport. */
      function handlePointerMove(event: PointerEvent) {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        targetMouse.x = THREE.MathUtils.clamp(
          (event.clientX - rect.left) / rect.width,
          0,
          1
        );
        targetMouse.y = THREE.MathUtils.clamp(
          (event.clientY - rect.top) / rect.height,
          0,
          1
        );
      }

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const nextWidth = Math.max(entry.contentRect.width, 1);
          const nextHeight = Math.max(entry.contentRect.height, 1);
          renderer?.setSize(nextWidth, nextHeight);
          uniforms.uResolution.value.set(nextWidth, nextHeight);
        }
      });
      observer.observe(container);

      const timer = new THREE.Timer();
      timer.connect(document);

      /** Advances shader time and mouse interpolation cleanly per frame. */
      function animate(timestamp?: number) {
        timer.update(timestamp);
        uniforms.uTime.value = timer.getElapsed();
        uniforms.uMouse.value.lerp(targetMouse, 0.06);
        renderer?.render(scene, camera);
        rafId = window.requestAnimationFrame(animate);
      }

      rafId = window.requestAnimationFrame(animate);

      return () => {
        window.cancelAnimationFrame(rafId);
        timer.dispose();
        window.removeEventListener("pointermove", handlePointerMove);
        observer?.disconnect();
        if (renderer?.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        geometry?.dispose();
        material?.dispose();
        renderer?.dispose();
      };
    } catch {
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    }
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none bg-ink ${className}`}
    />
  );
}
