"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface Laptop3DStageProps {
  progressRef: MutableRefObject<number>;
  activeStage: number;
  reducedMotion: boolean;
}

const MODEL_URL = "/models/laptop.glb";

interface ScreenStageVisual {
  number: string;
  tag: string;
  title: string;
  metric: string;
  accent: string;
}

const SCREEN_STAGE_VISUALS: ScreenStageVisual[] = [
  {
    number: "01",
    tag: "LOCAL SEO // MAPS",
    title: "GET DISCOVERED FIRST",
    metric: "+340% MAPS VISIBILITY",
    accent: "#E9FF45",
  },
  {
    number: "02",
    tag: "WEB ENGINEERING",
    title: "FAST BRAND WEBSITES",
    metric: "99 PERFORMANCE SCORE",
    accent: "#3155F5",
  },
  {
    number: "03",
    tag: "CUSTOM SOFTWARE",
    title: "WEB & MOBILE SYSTEMS",
    metric: "TAILORED WORKFLOWS",
    accent: "#F0522B",
  },
  {
    number: "04",
    tag: "SOCIAL CRAFT",
    title: "COHESIVE CONTENT",
    metric: "CONSISTENT BRAND VOICE",
    accent: "#E9FF45",
  },
  {
    number: "05",
    tag: "NFC & QR HARDWARE",
    title: "ONE-TAP REVIEW STANDS",
    metric: "FRICTIONLESS TRUST",
    accent: "#3155F5",
  },
  {
    number: "06",
    tag: "TECHNICAL CARE",
    title: "ALWAYS SUPPORTED",
    metric: "ONE PARTNER · ZERO GAPS",
    accent: "#F0522B",
  },
];

/** Draws a Neo-Brutalist Web Guru interface onto the 1024x1024 screen canvas within laptop.glb's mapped display UV bounds. */
function drawStageScreenCanvas(
  canvas: HTMLCanvasElement,
  stageIndex: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const visual =
    SCREEN_STAGE_VISUALS[stageIndex] ?? SCREEN_STAGE_VISUALS[0];

  // Clear entire 1024x1024 sheet to deep ink black
  ctx.fillStyle = "#151515";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // laptop.glb screen mesh UV TEXCOORD_0 spans u: 0.0025..0.9975, v: 0.0025 (bottom hinge)..0.6165 (top bezel)
  const screenW = 1024;
  const screenH = 631;

  // Flip Y inside the active UV slice so UI renders cleanly right-side up from webcam to hinge
  ctx.save();
  ctx.translate(0, screenH);
  ctx.scale(1, -1);

  // Crisp subtle blueprint grid on screen
  ctx.strokeStyle = "rgba(245, 240, 230, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= screenW; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, screenH);
    ctx.stroke();
  }
  for (let y = 0; y <= screenH; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(screenW, y);
    ctx.stroke();
  }

  // Outer Neo-Brutalist frame inside display bezel
  ctx.strokeStyle = "#F5F0E6";
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 24, screenW - 48, screenH - 48);

  // Top browser/app bar inside laptop display
  ctx.fillStyle = "#1E1E1E";
  ctx.fillRect(26, 26, screenW - 52, 62);
  ctx.fillStyle = "#F5F0E6";
  ctx.fillRect(26, 86, screenW - 52, 3);

  ctx.fillStyle = visual.accent;
  ctx.fillRect(46, 42, 170, 30);
  ctx.fillStyle = visual.accent === "#3155F5" ? "#F5F0E6" : "#151515";
  ctx.font = "bold 17px monospace";
  ctx.fillText("WEB GURU STUDIO", 56, 63);

  ctx.fillStyle = "#F5F0E6";
  ctx.font = "bold 17px monospace";
  ctx.fillText(`STAGE ${visual.number} / 06`, 838, 63);

  // Left editorial column inside laptop screen
  ctx.fillStyle = "#3155F5";
  ctx.fillRect(54, 126, 300, 38);
  ctx.fillStyle = "#F5F0E6";
  ctx.font = "bold 19px monospace";
  ctx.fillText(visual.tag, 70, 152);

  ctx.fillStyle = "#F5F0E6";
  ctx.font = "bold 42px sans-serif";
  const words = visual.title.split(" ");
  const line1 = words.slice(0, 2).join(" ");
  const line2 = words.slice(2).join(" ");
  ctx.fillText(line1, 54, 232);
  if (line2) {
    ctx.fillText(line2, 54, 290);
  }

  // Accent metric pill bar
  ctx.fillStyle = visual.accent;
  ctx.fillRect(54, 344, 420, 56);
  ctx.strokeStyle = "#F5F0E6";
  ctx.lineWidth = 3;
  ctx.strokeRect(54, 344, 420, 56);
  ctx.fillStyle = visual.accent === "#3155F5" ? "#F5F0E6" : "#151515";
  ctx.font = "bold 22px monospace";
  ctx.fillText(`>> ${visual.metric}`, 74, 380);

  // Right preview telemetry card inside laptop display
  ctx.fillStyle = "#222222";
  ctx.fillRect(600, 126, 368, 396);
  ctx.strokeStyle = visual.accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(600, 126, 368, 396);

  ctx.fillStyle = "#E9FF45";
  ctx.font = "bold 16px monospace";
  ctx.fillText("ACTIVE ARCHITECTURE", 626, 168);

  // Stylized chart / UI bars representing real agency deliverables
  const barHeights = [110, 155, 195, 145, 225];
  barHeights.forEach((h, i) => {
    const bx = 632 + i * 62;
    const by = 450 - h;
    ctx.fillStyle = i === barHeights.length - 1 ? visual.accent : "#3155F5";
    ctx.fillRect(bx, by, 42, h);
    ctx.strokeStyle = "#F5F0E6";
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, 42, h);
  });

  // Bottom status ticker on laptop screen
  ctx.fillStyle = "#1E1E1E";
  ctx.fillRect(26, screenH - 72, screenW - 52, 44);
  ctx.fillStyle = "#E9FF45";
  ctx.font = "bold 16px monospace";
  ctx.fillText("+ ONE PARTNER · ALL DIGITAL SYSTEMS UNDER ONE ROOF +", 54, screenH - 44);
  ctx.restore();
}

/** Creates a soft elliptical contact-shadow texture so the laptop sits grounded on the ivory stage without heavy shadow maps. */
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    gradient.addColorStop(0, "rgba(21, 21, 21, 0.36)");
    gradient.addColorStop(0.55, "rgba(21, 21, 21, 0.14)");
    gradient.addColorStop(1, "rgba(21, 21, 21, 0.0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Loads the workspace laptop.glb asset into Three.js, preserves its original materials, and scrubs 3D rotation smoothly from progressRef. */
export function Laptop3DStage({
  progressRef,
  activeStage,
  reducedMotion,
}: Laptop3DStageProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const initialStageRef = useRef<number>(activeStage);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [loadPercent, setLoadPercent] = useState<number | null>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let pmremGenerator: THREE.PMREMGenerator | null = null;
    let envRenderTarget: THREE.WebGLRenderTarget | null = null;
    let roomEnv: RoomEnvironment | null = null;
    let shadowTexture: THREE.CanvasTexture | null = null;
    let shadowPlaneGeo: THREE.PlaneGeometry | null = null;
    let shadowPlaneMat: THREE.MeshBasicMaterial | null = null;
    let loadedSceneRoot: THREE.Object3D | null = null;
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let isInViewport = true;

    try {
      const width = container.clientWidth || 720;
      const height = container.clientHeight || 540;
      const isCompact = width < 640;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
      camera.position.set(0, 1.15, isCompact ? 6.95 : 6.15);
      camera.lookAt(0, -0.05, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      // Cap pixel ratio for crisp edges without excessive GPU fill cost
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCompact ? 1.5 : 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "block h-full w-full";
      container.appendChild(renderer.domElement);

      // Neutral studio softbox environment reflections so metallic chassis and matte keys read clearly
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      roomEnv = new RoomEnvironment();
      envRenderTarget = pmremGenerator.fromScene(roomEnv, 0.04);
      scene.environment = envRenderTarget.texture;

      // Balanced studio 3-point lighting: ivory key + subtle cobalt edge + hemisphere fill
      const hemiLight = new THREE.HemisphereLight(0xf5f0e6, 0x262626, 0.65);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.55);
      keyLight.position.set(3.8, 5.5, 4.6);
      scene.add(keyLight);

      const cobaltRimLight = new THREE.DirectionalLight(0x3155f5, 0.95);
      cobaltRimLight.position.set(-4.5, 2.4, -3.2);
      scene.add(cobaltRimLight);

      const warmBackRim = new THREE.DirectionalLight(0xf5f0e6, 0.75);
      warmBackRim.position.set(4.2, 1.8, -4.0);
      scene.add(warmBackRim);

      // Grounded contact shadow below the laptop pivot
      shadowTexture = createContactShadowTexture();
      shadowPlaneGeo = new THREE.PlaneGeometry(3.5, 2.6);
      shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
      });
      const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.set(0, -0.92, 0);
      scene.add(shadowPlane);

      // Dynamic Web Guru Studio display canvas synced to LaptopScreen material UV layout
      const screenCanvas = document.createElement("canvas");
      screenCanvas.width = 1024;
      screenCanvas.height = 1024;
      drawStageScreenCanvas(screenCanvas, initialStageRef.current);
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.flipY = false;
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.needsUpdate = true;
      screenCanvasRef.current = screenCanvas;
      screenTextureRef.current = screenTexture;

      // Pivot group centered cleanly at origin so Y-axis scroll rotation never wobbles
      const laptopPivot = new THREE.Group();
      scene.add(laptopPivot);

      const maxAnisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        isCompact ? 2 : 4
      );
      screenTexture.anisotropy = maxAnisotropy;

      const loader = new GLTFLoader();
      loader.load(
        MODEL_URL,
        (gltf) => {
          if (disposed) return;

          const model = gltf.scene;
          loadedSceneRoot = model;

          // Normalize dimensions uniformly while strictly preserving original proportions and hardware materials
          const initialBox = new THREE.Box3().setFromObject(model);
          const size = initialBox.getSize(new THREE.Vector3());
          const center = initialBox.getCenter(new THREE.Vector3());
          const maxExtent = Math.max(size.x, size.y, size.z) || 1;
          const targetSpan = isCompact ? 2.5 : 2.75;
          const uniformScale = targetSpan / maxExtent;

          model.scale.setScalar(uniformScale);
          model.position.set(
            -center.x * uniformScale,
            -center.y * uniformScale,
            -center.z * uniformScale
          );

          // Bind Web Guru display texture only to LaptopScreen; preserve all hardware body/keyboard materials
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mats = Array.isArray(child.material)
                ? child.material
                : [child.material];
              for (const mat of mats) {
                if (!mat) continue;

                if (
                  mat.name === "LaptopScreen" &&
                  mat instanceof THREE.MeshStandardMaterial
                ) {
                  mat.map?.dispose();
                  mat.emissiveMap?.dispose();
                  mat.map = screenTexture;
                  mat.emissiveMap = screenTexture;
                  mat.emissive = new THREE.Color(0xffffff);
                  mat.emissiveIntensity = 0.72;
                  mat.roughness = 0.72;
                  mat.metalness = 0.05;
                  mat.needsUpdate = true;
                  continue;
                }

                if ("map" in mat && mat.map instanceof THREE.Texture) {
                  mat.map.anisotropy = maxAnisotropy;
                }
                if (
                  "emissiveMap" in mat &&
                  mat.emissiveMap instanceof THREE.Texture
                ) {
                  mat.emissiveMap.anisotropy = maxAnisotropy;
                }
              }
            }
          });

          laptopPivot.add(model);

          // Initial 3/4 orientation cleanly displaying entire laptop silhouette
          laptopPivot.rotation.set(0.14, -0.72, -0.015);
          renderer?.render(scene, camera);
          setLoadStatus("ready");
        },
        (progressEvent) => {
          if (disposed) return;
          if (progressEvent.total > 0) {
            const pct = Math.min(
              99,
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            setLoadPercent(pct);
          } else {
            setLoadPercent(null);
          }
        },
        (error) => {
          console.error("Failed to load /models/laptop.glb:", error);
          if (!disposed) {
            setErrorMessage(
              "Could not load the 3D laptop hardware model (/models/laptop.glb)."
            );
            setLoadStatus("error");
          }
        }
      );

      // Pause WebGL render loop automatically when scrolled completely out of view
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isInViewport = entry.isIntersecting;
          }
        },
        { rootMargin: "200px 0px" }
      );
      intersectionObserver.observe(container);

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const nextWidth = Math.max(entry.contentRect.width, 1);
          const nextHeight = Math.max(entry.contentRect.height, 1);
          const compactNow = nextWidth < 640;
          const aspect = nextWidth / nextHeight;
          camera.aspect = aspect;
          // Keep full laptop silhouette framed cleanly across short-wide and narrow-tall desktop aspect ratios
          const aspectPad = aspect < 1.15 ? 0.75 : aspect > 1.75 ? 0.35 : 0;
          camera.position.z = (compactNow ? 6.95 : 6.15) + aspectPad;
          camera.updateProjectionMatrix();
          renderer?.setSize(nextWidth, nextHeight);
        }
      });
      resizeObserver.observe(container);

      let smoothProgress = progressRef.current || 0;
      const timer = new THREE.Timer();
      timer.connect(document);

      /** Synchronizes laptop 3D rotation, subtle tilt, and framing to continuous scroll progress with delta-time damping. */
      function renderFrame(timestamp?: number) {
        rafId = window.requestAnimationFrame(renderFrame);
        if (!isInViewport || !renderer) return;

        timer.update(timestamp);
        const delta = Math.min(timer.getDelta(), 0.05);
        const targetProgress = THREE.MathUtils.clamp(progressRef.current || 0, 0, 1);

        if (reducedMotion) {
          smoothProgress = targetProgress;
        } else {
          const lerpAlpha = 1 - Math.exp(-8.5 * delta);
          smoothProgress += (targetProgress - smoothProgress) * lerpAlpha;
        }

        // Scroll-driven sweep from -41 deg left 3/4 -> dead-on center -> +65 deg right 3/4 hardware profile
        const targetRotY = -0.72 + smoothProgress * 1.85;
        const targetRotX = 0.14 + Math.sin(smoothProgress * Math.PI * 2) * 0.07;
        const targetRotZ = -0.015 + Math.sin(smoothProgress * Math.PI * 2) * 0.025;
        const floatY = Math.sin(smoothProgress * Math.PI * 2) * 0.045;

        laptopPivot.rotation.set(targetRotX, targetRotY, targetRotZ);
        laptopPivot.position.set(0, floatY, 0);

        shadowPlane.scale.setScalar(1 + floatY * 0.15);
        renderer.render(scene, camera);
      }

      rafId = window.requestAnimationFrame(renderFrame);

      return () => {
        disposed = true;
        window.cancelAnimationFrame(rafId);
        timer.dispose();
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();

        if (loadedSceneRoot) {
          loadedSceneRoot.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry?.dispose();
              const mats = Array.isArray(child.material)
                ? child.material
                : [child.material];
              for (const mat of mats) {
                if (!mat) continue;
                for (const value of Object.values(mat)) {
                  if (value instanceof THREE.Texture) {
                    value.dispose();
                  }
                }
                mat.dispose();
              }
            }
          });
        }

        screenTextureRef.current?.dispose();
        screenTextureRef.current = null;
        screenCanvasRef.current = null;
        shadowPlaneGeo?.dispose();
        shadowPlaneMat?.dispose();
        shadowTexture?.dispose();
        envRenderTarget?.dispose();
        roomEnv?.dispose();
        pmremGenerator?.dispose();

        if (renderer?.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer?.dispose();
      };
    } catch (error) {
      console.error("WebGL 3D Laptop initialization failed:", error);
      queueMicrotask(() => {
        if (!disposed) {
          setErrorMessage(
            "WebGL 3D viewport is unavailable on this browser configuration."
          );
          setLoadStatus("error");
        }
      });
    }
  }, [progressRef, reducedMotion]);

  // Repaint the Web Guru Neo-Brutalist laptop screen graphic smoothly when the active service stage changes
  useEffect(() => {
    initialStageRef.current = activeStage;
    const canvas = screenCanvasRef.current;
    const texture = screenTextureRef.current;
    if (!canvas || !texture) return;
    drawStageScreenCanvas(canvas, activeStage);
    texture.needsUpdate = true;
  }, [activeStage]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mountRef}
        aria-label={`Interactive 3D laptop showcase — currently highlighting stage 0${activeStage + 1}`}
        role="img"
        className="h-full w-full"
      />

      {/* Crisp Neo-Brutalist loading progress state */}
      {loadStatus === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <div className="border-2 border-ink bg-acid px-5 py-3 text-center shadow-[4px_4px_0px_#151515]">
            <span className="block font-mono text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
              Loading 3D Laptop Asset
              {loadPercent !== null ? ` // ${loadPercent}%` : "..."}
            </span>
          </div>
        </div>
      )}

      {/* Honest explicit failure state (no fake fallback stock image) */}
      {loadStatus === "error" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-sm border-2 border-ink bg-orange p-5 text-ivory shadow-[5px_5px_0px_#151515]">
            <p className="font-mono text-xs font-bold uppercase">
              3D Render Unavailable
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {errorMessage ||
                "Unable to initialize the 3D laptop model in this environment."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
