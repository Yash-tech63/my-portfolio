import React, { useRef, useState, useEffect } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Html, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// =====================================================
// PROJECT DATA
// =====================================================

const projects = [
    {
        id: "01",
        title: "AI MOCK INTERVIEW",
        category: "FULL-STACK DEVELOPMENT",
        subtitle: "AI-Powered Mock Interview System",
        description:
            "An AI-powered mock interview platform that helps users practice interview scenarios through a structured workflow. Users can authenticate, select their target role and skills, and receive AI-assisted interview questions and feedback.",
        objective:
            "To make interview preparation more interactive and accessible through AI-assisted question generation and feedback.",
        implementation:
            "Built a React frontend connected to a Node.js and Express backend through REST APIs. Integrated Google Gemini API for AI-assisted question generation and feedback, with MongoDB for data management and JWT for authentication.",
        features: [
            "User registration and authentication",
            "Role and skill-based interview setup",
            "AI-assisted question generation",
            "AI-assisted interview feedback",
            "Frontend and backend REST API integration"
        ],
        stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
        live: "https://interview-dr4v.vercel.app/",
        github: ""
    },
    {
        id: "02",
        title: "SMART HEALTHCARE",
        category: "FULL-STACK DEVELOPMENT",
        subtitle: "Smart Healthcare Management Platform",
        description:
            "A healthcare platform concept designed to simplify common patient interactions. It covers patient accounts, doctor discovery, appointments, and OPD token management workflows.",
        objective:
            "To provide a centralized digital platform for healthcare-related interactions and improve the organization of common clinic workflows.",
        implementation:
            "Developed the frontend using React, Vite, and Tailwind CSS. Structured backend functionality using Node.js and Express.js with MongoDB for data management and REST API-based communication.",
        features: [
            "Patient account workflows",
            "Doctor discovery",
            "Appointment management workflows",
            "OPD token workflows",
            "Digital queue status and patient-record features planned"
        ],
        stack: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        live: "https://abhimanyu-seven.vercel.app/",
        github: ""
    },
    {
        id: "03",
        title: "HEXAWARE WEBSITE",
        category: "FRONTEND DEVELOPMENT",
        subtitle: "Hexaware Technology Website",
        description:
            "A responsive Hexaware-inspired website developed using Angular and TypeScript. The project focuses on reusable UI components, consistent styling, and responsive page layouts.",
        objective:
            "To create a clean and responsive corporate website interface with a structured and reusable frontend architecture.",
        implementation:
            "Built the frontend with Angular and TypeScript, using HTML5, CSS3, and Tailwind CSS to create reusable components and responsive layouts.",
        features: [
            "Responsive website layout",
            "Reusable Angular UI components",
            "Tailwind CSS styling",
            "Consistent visual design",
            "Improved interface usability"
        ],
        stack: ["Angular", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85",
        live: "https://hexaware-5aqb.vercel.app/",
        github: ""
    }
];

// =====================================================
// CENTER DISC GLSL SHADER
// =====================================================

const DiscShader = shaderMaterial(
    { uTime: 0 },
    `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    `
    uniform float uTime;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv - 0.5;
      float radius = length(uv);
      float angle = atan(uv.y, uv.x);

      float grain = (hash(floor(vUv * 650.0)) - 0.5) * 0.07;
      float brushed = sin(radius * 850.0) * 0.022;

      float wave = sin(angle * 3.0 - uTime * 0.8 + radius * 13.0);
      float reflection = smoothstep(0.1, 1.0, wave) * 0.20;
      float radialLight = (1.0 - smoothstep(0.0, 0.65, radius)) * 0.12;

      vec3 color = vec3(0.28, 0.29, 0.27);
      color += grain + brushed + reflection + radialLight;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ DiscShader });

// =====================================================
// ANIMATED CENTER DISC
// =====================================================

function CenterDisc() {
    const material = useRef();

    useFrame(({ clock }) => {
        if (material.current) {
            material.current.uTime = clock.elapsedTime;
        }
    });

    return (
        <group position={[0, 0, 0.05]}>
            <mesh>
                <circleGeometry args={[1.08, 128]} />
                <discShader ref={material} />
            </mesh>

            <mesh position={[0, 0, -0.02]}>
                <ringGeometry args={[1.09, 1.105, 128]} />
                <meshBasicMaterial color="#a5a69e" />
            </mesh>

            <Html center position={[0, 0, 0.1]} style={{ pointerEvents: "none" }}>
                <div className="projects-disc-label">
                    <span>SELECTED WORK</span>
                    <strong>03</strong>
                    <small>2024 — PRESENT</small>
                </div>
            </Html>
        </group>
    );
}

// =====================================================
// STATIC ORBIT TRACK
// =====================================================

function OrbitTrack({ radius }) {
    return (
        <group>
            <mesh position={[0, 0, -0.08]}>
                <ringGeometry args={[radius - 0.006, radius + 0.006, 180]} />
                <meshBasicMaterial color="#77766a" transparent opacity={0.55} />
            </mesh>

            {Array.from({ length: 60 }, (_, index) => {
                const angle = (index / 60) * Math.PI * 2;

                return (
                    <mesh
                        key={index}
                        position={[
                            Math.sin(angle) * radius,
                            Math.cos(angle) * radius,
                            -0.04
                        ]}
                    >
                        <circleGeometry args={[0.012, 8]} />
                        <meshBasicMaterial color="#999487" />
                    </mesh>
                );
            })}
        </group>
    );
}

// =====================================================
// PROJECT CARD
// =====================================================

function OrbitCard({
    project,
    index,
    total,
    radius,
    activeIndex,
    onSelect,
    rotation
}) {
    const group = useRef();
    const angle = (index / total) * Math.PI * 2;

    useFrame(() => {
        if (!group.current) return;

        const currentAngle = angle + rotation.current;

        group.current.position.set(
            Math.sin(currentAngle) * radius,
            Math.cos(currentAngle) * radius,
            0.12
        );
    });

    const active = index === activeIndex;

    return (
        <group ref={group}>
            <Html center transform distanceFactor={5.7} zIndexRange={[50, 0]}>
                <button
                    type="button"
                    className={`projects-orbit-card ${active ? "is-active" : ""}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        onSelect(index);
                    }}
                >
                    <div className="projects-card-image">
                        <img
                            src={project.image}
                            alt={project.title}
                        />

                        <div className="projects-image-overlay" />

                        <span className="projects-image-index">
                            {project.id} / 0{total}
                        </span>

                        <span className="projects-image-view">VIEW PROJECT ↗</span>
                    </div>

                    <div className="projects-card-bottom">
                        <div>
                            <span className="projects-card-category">
                                {project.category}
                            </span>
                            <h3>{project.title}</h3>
                        </div>
                        <span className="projects-card-arrow">↗</span>
                    </div>
                </button>
            </Html>
        </group>
    );
}

// =====================================================
// GALLERY SCENE
// =====================================================

function GalleryScene({ activeIndex, setActiveIndex }) {
    const rotation = useRef(0);
    const targetRotation = useRef(0);
    const radius = 2.65;
    const total = projects.length;

    useEffect(() => {
        targetRotation.current = -(activeIndex / total) * Math.PI * 2;
    }, [activeIndex, total]);

    useFrame((_, delta) => {
        rotation.current = THREE.MathUtils.damp(
            rotation.current,
            targetRotation.current,
            3.5,
            delta
        );
    });

    return (
        <>
            <OrbitTrack radius={radius} />
            <CenterDisc />

            {projects.map((project, index) => (
                <OrbitCard
                    key={project.id}
                    project={project}
                    index={index}
                    total={total}
                    radius={radius}
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                    rotation={rotation}
                />
            ))}
        </>
    );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Project() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];

    const nextProject = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const previousProject = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section className="projects-section" id="projects">

            <style>{`
        .projects-section {
          --ink: #eeede5;
          --muted: #a09f94;
          --accent: #d58b5c;

          position: relative;
          isolation: isolate;
          background:
            radial-gradient(ellipse at 18% 35%, rgba(180,111,66,.14), transparent 38%),
            radial-gradient(ellipse at 85% 75%, rgba(110,119,99,.10), transparent 35%),
            linear-gradient(135deg, #191a16 0%, #11120f 55%, #1a1b16 100%);

          color: var(--ink);
          min-height: 100vh;
          overflow: hidden;
          padding: 80px max(5vw, 24px);
          font-family: Arial, Helvetica, sans-serif;
        }

        .projects-section * {
          box-sizing: border-box;
        }

        .projects-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .13;
          background-image:
            linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
          background-size: 65px 65px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
        }

        .projects-section::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(213,139,92,.08);
          border-radius: 50%;
          top: 15%;
          left: -300px;
          z-index: -1;
          pointer-events: none;
          box-shadow: 0 0 0 60px rgba(213,139,92,.025),
                      0 0 0 120px rgba(213,139,92,.015);
        }

        .projects-topline {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 22px;
          border-bottom: 1px solid #393a35;
          font-size: 11px;
          letter-spacing: .16em;
          color: var(--muted);
        }

        .projects-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin: 42px 0 10px;
        }

        .projects-heading h2 {
          font-size: clamp(56px, 9vw, 150px);
          line-height: .85;
          font-weight: 700;
          letter-spacing: -.085em;
          margin: 0;
        }

        .projects-heading h2 em {
          color: var(--accent);
          font-weight: 400;
          font-family: Georgia, serif;
        }

        .projects-heading p {
          max-width: 220px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
        }

        .projects-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr);
          align-items: center;
          min-height: 610px;
          gap: 30px;
        }

        .projects-canvas-wrap {
          position: relative;
          height: 600px;
          min-width: 0;
        }

        .projects-canvas-wrap canvas {
          display: block;
        }

        .projects-disc-label {
          width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 7px;
          color: #f1f0e9;
          user-select: none;
        }

        .projects-disc-label span {
          font-size: 9px;
          letter-spacing: .2em;
        }

        .projects-disc-label strong {
          font-size: 58px;
          line-height: 1;
          letter-spacing: -.08em;
          font-weight: 600;
        }

        .projects-disc-label small {
          font-size: 8px;
          letter-spacing: .15em;
          color: #cacbc0;
        }

        .projects-orbit-card {
          width: 245px;
          padding: 7px;
          display: block;
          background: #24251f;
          border: 1px solid rgba(220,218,200,.20);
          color: #f1f0e9;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          overflow: hidden;
          transition: border-color .4s, background .4s;
        }

        .projects-orbit-card:hover,
        .projects-orbit-card.is-active {
          border-color: var(--accent);
          background: #303029;
        }

        .projects-card-image {
          height: 155px;
          position: relative;
          overflow: hidden;
          background: #30312a;
        }

        .projects-card-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: saturate(.75) brightness(.82);
          transition: transform .7s cubic-bezier(.2,.7,.2,1), filter .5s;
        }

        .projects-orbit-card:hover .projects-card-image img,
        .projects-orbit-card.is-active .projects-card-image img {
          transform: scale(1.08);
          filter: saturate(1) brightness(1);
        }

        .projects-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,16,13,.65), transparent 65%);
          pointer-events: none;
        }

        .projects-image-index {
          position: absolute;
          z-index: 2;
          top: 9px;
          left: 9px;
          background: rgba(20,21,18,.85);
          color: #f0eee4;
          font-size: 9px;
          letter-spacing: .12em;
          padding: 6px 8px;
        }

        .projects-image-view {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 2;
          font-size: 8px;
          letter-spacing: .12em;
          color: white;
          opacity: 0;
          transform: translateY(5px);
          transition: .3s;
        }

        .projects-orbit-card:hover .projects-image-view {
          opacity: 1;
          transform: translateY(0);
        }

        .projects-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: end;
          padding: 14px 5px 7px;
          gap: 10px;
        }

        .projects-card-category {
          display: block;
          font-size: 8px;
          letter-spacing: .13em;
          color: #b5a99a;
          margin-bottom: 7px;
        }

        .projects-card-bottom h3 {
          font-size: 13px;
          letter-spacing: -.025em;
          margin: 0;
          font-weight: 600;
        }

        .projects-card-arrow {
          font-size: 23px;
          color: var(--accent);
        }

        .projects-detail {
          border-left: 1px solid #3d3e38;
          padding: 30px 0 30px 38px;
          min-width: 0;
        }

        .projects-detail-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          letter-spacing: .16em;
          color: var(--accent);
        }

        .projects-detail-kicker::before {
          content: "";
          width: 23px;
          height: 1px;
          background: var(--accent);
        }

        .projects-detail h3 {
          font-size: clamp(35px, 4.4vw, 65px);
          line-height: .98;
          letter-spacing: -.07em;
          font-weight: 600;
          margin: 30px 0 16px;
          overflow-wrap: anywhere;
        }

        .projects-detail-subtitle {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 20px;
          color: #c6c5b9;
          margin-bottom: 24px;
        }

        .projects-detail-description,
        .projects-extra p,
        .projects-extra li {
          font-size: 13px;
          line-height: 1.85;
          color: #a6a79d;
        }

        .projects-extra {
          margin-top: 25px;
        }

        .projects-extra h4 {
          color: var(--accent);
          font-size: 10px;
          letter-spacing: .16em;
          margin: 22px 0 9px;
        }

        .projects-extra ul {
          padding-left: 18px;
        }

        .projects-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 25px 0;
        }

        .projects-stack span {
          border: 1px solid #4b4c44;
          padding: 9px 12px;
          font-size: 10px;
          letter-spacing: .07em;
          color: #c8c9bc;
        }

        .projects-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 25px 0;
        }

        .projects-links a {
          color: var(--ink);
          text-decoration: none;
          font-size: 12px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--accent);
        }

        .projects-links a:hover {
          color: var(--accent);
        }

        .projects-controls {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 25px;
          border-top: 1px solid #3d3e38;
        }

        .projects-controls button {
          width: 44px;
          height: 44px;
          background: transparent;
          border: 1px solid #66675d;
          color: var(--ink);
          cursor: pointer;
          font-size: 20px;
          transition: background .2s, border-color .2s;
        }

        .projects-controls button:hover {
          background: #36372f;
          border-color: var(--accent);
        }

        .projects-controls span {
          margin-left: auto;
          font-size: 12px;
          letter-spacing: .12em;
          color: var(--muted);
        }

        .projects-controls strong {
          color: var(--ink);
        }

        .projects-footer {
          border-top: 1px solid #393a35;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: .13em;
        }

        @media (max-width: 900px) {
          .projects-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .projects-canvas-wrap {
            height: 500px;
          }

          .projects-detail {
            border-left: none;
            border-top: 1px solid #3d3e38;
            padding: 35px 0;
          }
        }

        @media (max-width: 520px) {
          .projects-section {
            padding: 60px 18px;
          }

          .projects-heading {
            align-items: start;
            flex-direction: column;
            gap: 20px;
          }

          .projects-heading h2 {
            font-size: 65px;
          }

          .projects-canvas-wrap {
            height: 370px;
          }

          .projects-orbit-card {
            width: 175px;
          }

          .projects-card-image {
            height: 105px;
          }

          .projects-card-bottom h3 {
            font-size: 11px;
          }

          .projects-disc-label {
            transform: scale(.75);
          }

          .projects-footer {
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-orbit-card,
          .projects-card-image img,
          .projects-image-view {
            transition: none;
          }
        }
      `}</style>

            <div className="projects-topline">
                <span>YASH BUNDELA / PORTFOLIO</span>
                <span>CREATIVE DEVELOPMENT — 003</span>
            </div>

            <div className="projects-heading">
                <h2>SELECTED <em>WORK.</em></h2>
                <p>
                    A collection of projects built through
                    curiosity, experimentation, and code.
                </p>
            </div>

            <div className="projects-layout">

                <div className="projects-canvas-wrap">
                    <Canvas
                        orthographic
                        camera={{
                            position: [0, 0, 12],
                            zoom: 78,
                            near: 0.1,
                            far: 100
                        }}
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                    >
                        <GalleryScene
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    </Canvas>
                </div>

                <div className="projects-detail">

                    <div className="projects-detail-kicker">
                        PROJECT {activeProject.id}
                    </div>

                    <h3>{activeProject.title}</h3>

                    <div className="projects-detail-subtitle">
                        {activeProject.subtitle}
                    </div>

                    <p className="projects-detail-description">
                        {activeProject.description}
                    </p>

                    <div className="projects-extra">
                        <h4>OBJECTIVE</h4>
                        <p>{activeProject.objective}</p>

                        <h4>IMPLEMENTATION</h4>
                        <p>{activeProject.implementation}</p>

                        <h4>KEY FEATURES</h4>
                        <ul>
                            {activeProject.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <h4 className="projects-detail-kicker">TECHNOLOGIES</h4>

                    <div className="projects-stack">
                        {activeProject.stack.map((technology) => (
                            <span key={technology}>{technology}</span>
                        ))}
                    </div>

                    <div className="projects-links">
                        {activeProject.github && (
                            <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                                GITHUB ↗
                            </a>
                        )}

                        {activeProject.live && (
                            <a href={activeProject.live} target="_blank" rel="noopener noreferrer">
                                LIVE PROJECT ↗
                            </a>
                        )}
                    </div>

                    <div className="projects-controls">
                        <button type="button" onClick={previousProject} aria-label="Previous project">
                            ←
                        </button>

                        <button type="button" onClick={nextProject} aria-label="Next project">
                            →
                        </button>

                        <span>
                            <strong>0{activeIndex + 1}</strong> / 0{projects.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="projects-footer">
                <span>DESIGNED & DEVELOPED WITH INTENTION</span>
                <span>EXPLORE THE ORBIT / SELECT A PROJECT</span>
            </div>

        </section>
    );
}