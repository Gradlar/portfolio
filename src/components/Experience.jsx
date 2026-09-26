import React, { useEffect, useRef, useState } from 'react';

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

// ── Wrapper d'animation au scroll (un mouvement par bloc, pas par carte) ─────
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
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [reducedMotion]);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
                willChange: "opacity, transform",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

// ── Carte d'expérience clé (mise en avant) ───────────────────────────────────
const ExpCard = ({ title, role, items, description }) => (
    <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "18px",
        border: "1px solid rgba(80,140,255,0.14)",
        background: "rgba(13,17,23,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "1.75rem 2rem",
        transition: "border-color 0.25s, transform 0.25s",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.4)";
            e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.14)";
            e.currentTarget.style.transform = "translateY(0)";
        }}
    >
        <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#c8d8ff",
                letterSpacing: "-0.01em",
                margin: "0 0 0.5rem 0"
            }}>
                {title}
            </h3>
            <div style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                background: "rgba(80,140,255,0.1)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#5a8fff",
            }}>
                {role}
            </div>
        </div>

        {description && (
            <p style={{
                fontSize: "0.92rem",
                color: "rgba(160,190,255,0.75)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
            }}>
                {description}
            </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {items.map((item, i) => (
                <li key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "0.88rem",
                    color: "rgba(160,190,255,0.9)",
                    lineHeight: 1.6,
                }}>
                    <span style={{
                        marginTop: "8px",
                        width: "8px",
                        height: "2px",
                        background: "#5a8fff",
                        borderRadius: "2px",
                        flexShrink: 0,
                    }} />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

// ── Ligne d'expérience secondaire (jobs étudiants, condensés) ────────────────
const CompactExpRow = ({ title, role, items, isLast }) => (
    <div style={{
        padding: "1rem 0.25rem",
        borderBottom: isLast ? "none" : "1px solid rgba(80,140,255,0.08)",
    }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.4rem" }}>
            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "#c8d8ff" }}>{title}</p>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "#5a8fff" }}>{role}</p>
        </div>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(160,190,255,0.65)", lineHeight: 1.6 }}>
            {items.join(" — ")}
        </p>
    </div>
);

const Experience = () => {
    const keyExperiences = [
        {
            title: "CA2BM — Communauté d'Agglomération des 2 Baies en Montreuillois (Alternance)",
            role: "Développeur — Service informatique",
            description: "J'ai contribué au développement de DechPilot, une application web interne dédiée à la gestion et au suivi des pesées dans les déchetteries de la collectivité.",
            items: [
                "Développement d'une application Spring Boot (Java 21) avec API REST",
                "Intégration d'une authentification LDAP et sécurisation JWT / Spring Security",
                "Conception et alimentation d'un tableau de bord interactif (Thymeleaf, JavaScript)",
                "Gestion de base de données relationnelle (MariaDB, Spring Data JPA)",
            ],
        },
        {
            title: "Starter Week — Projet universitaire intensif",
            role: "Développeur (Équipe de 5)",
            description: "Développement express d'une application pour un porteur de projet en une semaine sous méthodologie agile.",
            items: [
                "Gestion de projet agile (sprints, daily stand-up)",
                "Travail en équipe sous forte contrainte de temps",
                "Communication directe avec un client externe",
                "Livraison d'un MVP (Produit Minimum Viable) fonctionnel",
            ],
        },
    ];

    const otherExperiences = [
        {
            title: "E.Leclerc Étaples-Sur-Mer",
            role: "Employé de rayon (Été 2024)",
            items: ["Organisation et gestion des stocks", "Service à la clientèle et travail d'équipe", "Autonomie et prise d'initiatives"],
        },
        {
            title: "Intermarché Saint-Étienne-au-Mont",
            role: "Hôte de caisse (Été 2022)",
            items: ["Gestion de la caisse et accueil clientèle", "Polyvalence (mise en rayon et préparation drive)"],
        },
        {
            title: "Médiathèque de Saint-Étienne-au-Mont",
            role: "Maintenance informatique (Stage 2022)",
            items: ["Maintenance préventive du parc informatique", "Formation et assistance aux utilisateurs", "Configuration réseau de base"],
        },
    ];

    return (
        <section id="experiences">
            <Reveal style={{ textAlign: "center", padding: "8rem 1rem 3rem" }}>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.3em", color: "#508cff", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>
                    Parcours
                </p>
                <h2 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 800,
                    color: "#c8d8ff",
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 50px rgba(80,140,255,0.3)",
                    margin: 0
                }}>
                    Mes Expériences
                </h2>
                <div style={{
                    width: "60px", height: "4px",
                    background: "linear-gradient(90deg, #508cff, transparent)",
                    borderRadius: "99px",
                    margin: "1.5rem auto 0",
                }} />
            </Reveal>

            {/* ── Expériences clés ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 1rem 3rem" }}>
                {keyExperiences.map((exp, i) => (
                    <Reveal key={exp.title} delay={i * 0.08}>
                        <ExpCard {...exp} />
                    </Reveal>
                ))}
            </div>

            {/* ── Autres expériences ── */}
            <Reveal style={{
                maxWidth: "800px", margin: "0 auto", padding: "0 1.25rem 8rem",
            }}>
                <p style={{
                    fontSize: "0.78rem", fontWeight: 600, color: "#80aaff",
                    marginBottom: "0.5rem", paddingLeft: "0.25rem",
                }}>
                    Jobs étudiants & stage
                </p>
                <div style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(80,140,255,0.1)",
                    background: "rgba(13,17,23,0.35)",
                    padding: "0.25rem 1.25rem",
                }}>
                    {otherExperiences.map((exp, i) => (
                        <CompactExpRow key={exp.title} {...exp} isLast={i === otherExperiences.length - 1} />
                    ))}
                </div>
            </Reveal>
        </section>
    );
};

export default Experience;