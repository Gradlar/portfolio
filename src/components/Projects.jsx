import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";

// Imports d'images inchangés
import imageProjetJava     from "../assets/TrajetProjet.png";
import imageProjetBDD      from "../assets/BDDProjet.jpg";
import imageProjetAgile    from "../assets/AgileProjet.png";
import imageProjetIris     from "../assets/IrisProjet.png";
import imageProjetDechPilot from "../assets/DechPilotProjet.jpg";
import imageProjetCheqa from "../assets/CheqaProjet.jpg";

// ── Détection "prefers-reduced-motion" ───────────────────────────────────────
const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const handler = (e) => setReduced(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return reduced;
};

// ── Wrapper d'animation au scroll (un mouvement par carte projet) ────────────
const Reveal = ({ children, delay = 0, style = {} }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const reducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (reducedMotion) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [reducedMotion]);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
                willChange: "opacity, transform",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

// ── Chip de techno ────────────────────────────────────────────────────────────
const Tag = ({ children }) => (
    <span style={{
        display: "inline-block",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        color: "#80aaff",
        background: "rgba(80, 140, 255, 0.1)",
        border: "1px solid rgba(80, 140, 255, 0.3)",
        borderRadius: "4px",
        padding: "3px 10px",
        marginRight: "8px",
        marginBottom: "8px",
    }}>
        {children}
    </span>
);

// ── Carte chiffre-clé ──────────────────────────────────────────────────────────
const EcoCard = ({ label, value, sub }) => (
    <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(80, 140, 255, 0.2)",
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        minWidth: "140px",
    }}>
        <p style={{ fontSize: "0.7rem", color: "rgba(160, 190, 255, 0.6)", marginBottom: "4px", letterSpacing: "0.05em" }}>{label}</p>
        <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#c8d8ff", margin: 0 }}>{value}</p>
        <p style={{ fontSize: "0.65rem", color: "rgba(160, 190, 255, 0.5)", marginTop: "4px" }}>{sub}</p>
    </div>
);

// ── Lien "En savoir plus" ──────────────────────────────────────────────────────
const MoreLink = ({ href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: "inline-block",
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#508cff",
            textDecoration: "none",
            borderBottom: "1px solid rgba(80,140,255,0.35)",
            paddingBottom: "1px",
            transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#c8d8ff"; e.currentTarget.style.borderColor = "#c8d8ff"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#508cff"; e.currentTarget.style.borderColor = "rgba(80,140,255,0.35)"; }}
    >
        Consulter le projet
    </a>
);

// ── Séparateur ───────────────────────────────────────────────────────────────
const Divider = () => (
    <div style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(80, 140, 255, 0.3), transparent)",
    }} />
);

// ── Carte projet ─────────────────────────────────────────────────────────────
const ProjectCard = ({ image, alt, title, tags, children, extra, reverse, onImageClick }) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        padding: "6rem 2rem",
        maxWidth: "1100px",
        margin: "0 auto",
        alignItems: "center",
    }}
        className={`lg:flex-row${reverse ? "-reverse" : ""} lg:!flex-row`}
    >
        {/* Image */}
        <div
            onClick={onImageClick}
            style={{
                flexShrink: 0,
                cursor: "zoom-in",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(80, 140, 255, 0.2)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
                maxWidth: "400px",
                width: "100%",
                position: "relative"
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.borderColor = "rgba(80, 140, 255, 0.5)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(80, 140, 255, 0.2)";
            }}
        >
            <img src={image} alt={alt} style={{ display: "block", width: "100%", height: "auto", filter: "brightness(0.9) contrast(1.1)" }} />
        </div>

        {/* Contenu */}
        <div style={{ flex: 1, textAlign: "left" }}>
            <h2 style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#c8d8ff",
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
            }}>
                {title}
            </h2>

            {tags && (
                <div style={{ marginBottom: "1.25rem" }}>
                    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
            )}

            <p style={{ color: "rgba(160, 190, 255, 0.8)", lineHeight: 1.8, fontSize: "1rem", textAlign: "justify" }}>
                {children}
            </p>

            {extra}
        </div>
    </div>
);

export default function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

    const openModal  = (src) => { setCurrentImage(src); setIsModalOpen(true); };
    const closeModal = ()    => { setIsModalOpen(false); setCurrentImage(""); };

    const projects = [
        {
            image: imageProjetDechPilot,
            alt: "Projet CEVDPilot",
            title: "CEVDPilot",
            tags: ["Spring Boot", "JPA", "TypeScript", "REST API"],
            reverse: false,
            description: "Architecture robuste en Spring Boot et TypeScript. Cette solution modernise la gestion des pesées via une interface web haute performance et une API sécurisée par Spring Security.",
            extra: <MoreLink href="https://github.com/Gradlar" />,
        },
        {
            image: imageProjetJava,
            alt: "Projet Java",
            title: "Itinéraire Optimal",
            tags: ["Java", "JavaFX", "Dijkstra", "Graphe"],
            reverse: true,
            description: "Calculateur de trajectoires multi-critères utilisant les graphes. Analyse en temps réel du coût, des émissions de CO₂ et de la durée via Dijkstra et Bellman-Ford.",
            extra: <MoreLink href="https://github.com/Gradlar/TrajetGraphe" />,
        },
        {
            image: imageProjetCheqa,
            alt: "Projet CHEQA",
            title: "CHEQA",
            tags: ["React", "Node.js", "Agile", "Full Stack", "Scrum"],
            reverse: true,
            description: "Application web développée en une semaine pour un porteur de projet externe, dans le cadre d'un projet universitaire à Lille. Travail en équipe de 5 développeurs selon une méthodologie agile (Scrum), de la conception jusqu'à la livraison, avec itérations quotidiennes et revue de sprint finale.",
            extra: (
                <>
                    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", margin: "1.5rem 0" }}>
                        <EcoCard label="Durée" value="1 sem." sub="Livraison sprint" />
                        <EcoCard label="Équipe" value="× 5" sub="Développeurs" />
                    </div>
                    <MoreLink href="https://github.com/Gradlar" />
                </>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: "transparent" }}>
            <section id="projects" />

            {/* ── Titre Section ── */}
            <Reveal style={{ textAlign: "center", padding: "8rem 1rem 2rem" }}>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.3em", color: "#508cff", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>
                    Exploration
                </p>
                <h1 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 800,
                    color: "#c8d8ff",
                    letterSpacing: "-0.03em",
                }}>
                    Projets Réalisés
                </h1>
                <div style={{
                    width: "60px", height: "4px",
                    background: "linear-gradient(90deg, #508cff, transparent)",
                    borderRadius: "99px",
                    margin: "1.5rem auto 0",
                }} />
            </Reveal>

            {/* ── Liste des projets ── */}
            {projects.map((p, i) => (
                <React.Fragment key={p.title}>
                    <Reveal delay={i === 0 ? 0 : 0.05}>
                        <ProjectCard
                            image={p.image}
                            alt={p.alt}
                            title={p.title}
                            tags={p.tags}
                            reverse={p.reverse}
                            onImageClick={() => openModal(p.image)}
                            extra={p.extra}
                        >
                            {p.description}
                        </ProjectCard>
                    </Reveal>
                    {i < projects.length - 1 && <Divider />}
                </React.Fragment>
            ))}

            <div style={{ paddingBottom: "8rem" }} />

            {/* ── Modal ── */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="flex justify-center items-center h-screen"
                overlayClassName="fixed inset-0"
                style={{
                    overlay: {
                        backgroundColor: "rgba(5, 8, 18, 0.9)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        zIndex: 1000,
                    },
                    content: { border: 'none', background: 'none' }
                }}
            >
                <div style={{ position: "relative", border: "1px solid rgba(80, 140, 255, 0.3)", borderRadius: "12px", overflow: "hidden" }}>
                    <button
                        onClick={closeModal}
                        style={{
                            position: "absolute", top: "15px", right: "15px",
                            width: "35px", height: "35px",
                            background: "rgba(80, 140, 255, 0.2)",
                            border: "1px solid rgba(80, 140, 255, 0.4)",
                            borderRadius: "50%",
                            cursor: "pointer", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        ✕
                    </button>
                    <img src={currentImage} alt="Aperçu" style={{ display: "block", maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }} />
                </div>
            </Modal>
        </div>
    );
}