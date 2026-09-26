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

// ── Wrapper d'animation au scroll ────────────────────────────────────────────
// Un seul mouvement d'entrée par bloc (pas par carte individuelle) : fondu +
// léger déplacement vers le haut la première fois que le bloc est visible.
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

// ── Séparateur ───────────────────────────────────────────────────────────────
const Divider = () => (
    <div style={{
        width: "100%", maxWidth: "900px", margin: "0 auto",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(80,140,255,0.18), transparent)",
    }} />
);

// ── Sous-titre de section ────────────────────────────────────────────────────
const SectionTitle = ({ children }) => (
    <div style={{ textAlign: "center", padding: "3rem 1rem 1.75rem" }}>
        <p style={{
            display: "inline-block", fontSize: "0.72rem", fontWeight: 500,
            letterSpacing: "0.12em", color: "rgba(80,140,255,0.55)",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(80,140,255,0.2)", paddingBottom: "4px",
        }}>
            {children}
        </p>
    </div>
);

// ── Titre de sous-catégorie ───────────────────────────────────────────────────
const SubCategoryTitle = ({ children }) => (
    <p style={{
        fontSize: "0.78rem", fontWeight: 600,
        color: "#80aaff", marginBottom: "0.6rem",
    }}>
        {children}
    </p>
);

// ── Niveau (points, pas de barre décorative) ─────────────────────────────────
const LevelDots = ({ level, max = 5 }) => (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`Niveau ${level} sur ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
            <div key={i} style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: i < level ? "#508cff" : "rgba(80,140,255,0.18)",
            }} />
        ))}
    </div>
);

// ── Chip techno "coeur de stack" (mise en avant) ─────────────────────────────
const CoreTechChip = ({ src, alt, label, level, note }) => (
    <div style={{
        display: "flex", alignItems: "center", gap: "0.9rem",
        padding: "1rem 1.25rem", borderRadius: "14px",
        border: "1px solid rgba(80,140,255,0.28)",
        background: "rgba(80,140,255,0.06)",
        minWidth: "220px",
        transition: "border-color 0.2s, background 0.2s",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.55)";
            e.currentTarget.style.background = "rgba(80,140,255,0.1)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.28)";
            e.currentTarget.style.background = "rgba(80,140,255,0.06)";
        }}
    >
        <img src={src} alt={alt} style={{ width: "30px", height: "30px", objectFit: "contain", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#c8d8ff" }}>{label}</p>
            <p style={{ margin: "1px 0 5px", fontSize: "0.74rem", color: "rgba(160,190,255,0.6)" }}>{note}</p>
            <LevelDots level={level} />
        </div>
    </div>
);

// ── Chip techno secondaire (compacte) ────────────────────────────────────────
const TechChip = ({ src, alt, label, level }) => (
    <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.6rem 0.9rem", borderRadius: "99px",
        border: "1px solid rgba(80,140,255,0.12)",
        background: "rgba(13,17,23,0.4)",
    }}>
        <img src={src} alt={alt} style={{ width: "18px", height: "18px", objectFit: "contain", flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 500, color: "#c8d8ff", whiteSpace: "nowrap" }}>{label}</p>
        <LevelDots level={level} />
    </div>
);

// ── Ligne soft skill (liste, pas de carte) ───────────────────────────────────
const SoftSkillRow = ({ icon, title, text, isLast }) => (
    <div style={{
        display: "flex", gap: "0.85rem", alignItems: "flex-start",
        padding: "0.85rem 0.25rem",
        borderBottom: isLast ? "none" : "1px solid rgba(80,140,255,0.08)",
    }}>
        <span style={{ fontSize: "1.05rem", lineHeight: 1.4 }}>{icon}</span>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(190,205,255,0.8)", lineHeight: 1.55 }}>
            <span style={{ fontWeight: 600, color: "#c8d8ff" }}>{title}. </span>
            {text}
        </p>
    </div>
);

// ── Chip simple (Autre) ──────────────────────────────────────────────────────
const SimpleChip = ({ title, sub }) => (
    <div style={{
        display: "flex", alignItems: "baseline", gap: "0.5rem",
        padding: "0.6rem 1rem", borderRadius: "99px",
        border: "1px solid rgba(80,140,255,0.12)",
        background: "rgba(13,17,23,0.4)",
    }}>
        <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600, color: "#c8d8ff" }}>{title}</p>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(160,190,255,0.55)" }}>{sub}</p>
    </div>
);

// ── Composant principal ───────────────────────────────────────────────────────
const Competences = () => {
    const coreStack = [
        {
            src: "https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg",
            alt: "Java", label: "Java · Spring Boot", level: 4,
            note: "Backend CEVDPilot (CA2BM)",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            alt: "React", label: "React · TypeScript", level: 4,
            note: "Frontend CEVDPilot + CHEQA",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Database-postgres.svg",
            alt: "SQL", label: "SQL · BDD", level: 4,
            note: "Modélisation, requêtes complexes",
        },
    ];

    const otherTechs = [
        { src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg", alt: "Git", label: "Git · GitHub", level: 4 },
        { src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", alt: "HTML", label: "HTML · CSS", level: 3 },
        { src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", alt: "C", label: "C", level: 3 },
    ];

    const softManiereDetre = [
<<<<<<< HEAD
        { icon: "🧭", title: "Posture professionnelle", text: "Intégré une équipe expérimentée dès le premier jour, à l'aise dans un cadre structuré." },
        { icon: "🧘", title: "Gestion du stress", text: "Sous pression (CHEQA, livraison en 1 semaine), je priorise et communique plutôt que de subir." },
        { icon: "🔄", title: "Adaptabilité", text: "Rejoint un projet existant sans tout casser, en apprenant vite les conventions en place." },
        { icon: "💪", title: "Engagement", text: "Responsable de modules complets sur CEVDPilot, exigeant sur la qualité du code livré." },
    ];

    const softCommunication = [
        { icon: "🗣️", title: "Communication", text: "Sais adapter mon discours technique face à un public non-développeur." },
        { icon: "👂", title: "Écoute", text: "Je reformule systématiquement pour vérifier que j'ai bien compris le besoin." },
        { icon: "✅", title: "Feedback", text: "Je prends les retours de code comme un levier de progression, pas une critique." },
    ];

    const softCollectif = [
        { icon: "🤝", title: "Équipe", text: "Je coordonne mieux en groupe qu'en solo, j'anticipe les dépendances entre tâches." },
        { icon: "⚡", title: "Initiative", text: "Je propose des améliorations non demandées quand je vois un point faible." },
        { icon: "🔧", title: "Désaccords", text: "Je cherche des critères objectifs pour trancher plutôt que d'imposer mon avis." },
=======
        {
            icon: "🧘",
            title: "Gestion du stress",
            situation: "Lors du projet CHEQA, livraison en une semaine avec 5 développeurs.",
            analyse: "J'ai appris à prioriser les fonctionnalités critiques et à communiquer clairement sur les blocages.",
            profil: "Le stress me pousse à décomposer les problèmes complexes en tâches actionnables.",
        },
        {
            icon: "🔄",
            title: "Adaptabilité",
            situation: "À la CA2BM, j'ai transformé des codes Python existants en code Java Spring JPA.",
            analyse: "J'ai su monter rapidement en compétences sur les nouveaux outils et conventions.",
            profil: "Je me sens à l'aise pour apprendre de nouvelles technos. La curiosité technique me permet d'avancer sans tout comprendre avant d'agir.",
        },
        {
            icon: "💪",
            title: "Engagement & responsabilités",
            situation: "Sur CEVDPilot, j'ai été responsable de modules complets avec un impact financier réel (360 000 €/an d'optimisation).",
            analyse: "Savoir que mon travail avait un impact concret a renforcé mon sens des responsabilités.",
            profil: "Je m'investis pleinement quand je comprends le sens de ma contribution.",
        },
    ];

    const softCommunication = [
        {
            icon: "🗣️",
            title: "Communication professionnelle",
            situation: "Présentations du projet CEVDPilot. Présentations du projet CHEQA devant le porteur de projet externe.",
            analyse: "J'ai travaillé ma capacité à vulgariser les choix techniques en adaptant le niveau de détail au public.",
            profil: "Je préfère une communication directe et illustrée par des exemples concrets.",
        },
        {
            icon: "👂",
            title: "Écoute & reformulation",
            situation: "Lors des ateliers de cadrage du projet CHEQA avec le porteur de projet.",
            analyse: "Reformuler les besoins du client m'a permis d'éviter les malentendus.",
            profil: "J'écoute avant de répondre. La reformulation est mon réflexe pour valider la compréhension mutuelle.",
        },
        {
            icon: "✅",
            title: "Réception des feedbacks",
            situation: "Feedback des utilisateurs de CEVDPilot sur l'interface.",
            analyse: "Les utilisateurs trouvaient certains éléments graphiques confus. J'ai modifié l'affichage et les couleurs.",
            profil: "Je reçois le feedback comme une chance de mieux servir les utilisateurs.",
        },
    ];

    const softCollectif = [
        {
            icon: "🤝",
            title: "Travail en équipe",
            situation: "Projet CHEQA : 5 développeurs, 1 semaine, livraison à un client réel.",
            analyse: "J'ai appris à ne pas travailler en silo et à anticiper les dépendances entre les tâches.",
            profil: "Je fonctionne mieux en équipe. La dynamique de groupe me stimule.",
        },
        {
            icon: "⚡",
            title: "Prise d'initiative",
            situation: "Sur CEVDPilot, j'ai proposé une couche de validation des données côté API.",
            analyse: "Cette initiative a réduit les erreurs de saisie en production et m'a valu plus d'autonomie.",
            profil: "Je n'attends pas qu'on me demande d'améliorer quelque chose si je vois un problème.",
        },
        {
            icon: "🔧",
            title: "Gestion des désaccords",
            situation: "Lors du projet CHEQA, désaccord sur la stack technique en début de sprint.",
            analyse: "J'ai proposé de lister les critères objectifs pour trancher collectivement.",
            profil: "Je cherche d'abord à comprendre la position de l'autre. J'utilise les faits comme terrain neutre.",
        },
>>>>>>> 3f0c1410c523f644ace9e76ea0bd822ffd178bdb
    ];

    const autres = [
        { title: "Permis", sub: "Catégorie B" },
        { title: "Anglais", sub: "Niveau B2" },
    ];

    const listGroupStyle = {
        maxWidth: "620px", margin: "0 auto 2rem",
        padding: "0.25rem 1.25rem",
        borderRadius: "14px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.35)",
    };

    return (
        <>
            <section id="competences" />

            {/* ── Titre ── */}
            <Reveal style={{ textAlign: "center", padding: "5rem 1rem 1rem" }}>
                <p style={{
                    fontSize: "0.75rem", letterSpacing: "0.15em",
                    color: "rgba(80,140,255,0.55)", textTransform: "uppercase", marginBottom: "0.5rem",
                }}>
                    Savoir-faire
                </p>
                <h1 style={{
                    fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700,
                    color: "#c8d8ff", letterSpacing: "-0.03em", lineHeight: 1.15,
                }}>
                    Mes Compétences
                </h1>
                <div style={{
                    width: "40px", height: "3px",
                    background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
                    borderRadius: "99px", margin: "1rem auto 0",
                    boxShadow: "0 0 12px rgba(60,110,255,0.4)",
                }} />
            </Reveal>

            {/* ── Stack technique ── */}
            <SectionTitle>Stack technique</SectionTitle>
            <Reveal style={{ padding: "0 1.5rem 1rem", maxWidth: "960px", margin: "0 auto" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.9rem" }}>
                    {coreStack.map(t => <CoreTechChip key={t.label} {...t} />)}
                </div>
            </Reveal>
            <Reveal delay={0.1} style={{ padding: "0 1.5rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem" }}>
                    {otherTechs.map(t => <TechChip key={t.label} {...t} />)}
                </div>
            </Reveal>

            <Divider />

            {/* ── Soft Skills ── */}
            <SectionTitle>Compétences comportementales</SectionTitle>

            <Reveal style={listGroupStyle}>
                <SubCategoryTitle>Manière d'être</SubCategoryTitle>
                {softManiereDetre.map((s, i) => (
                    <SoftSkillRow key={s.title} {...s} isLast={i === softManiereDetre.length - 1} />
                ))}
            </Reveal>

            <Reveal delay={0.05} style={listGroupStyle}>
                <SubCategoryTitle>Manière de communiquer</SubCategoryTitle>
                {softCommunication.map((s, i) => (
                    <SoftSkillRow key={s.title} {...s} isLast={i === softCommunication.length - 1} />
                ))}
            </Reveal>

            <Reveal delay={0.1} style={listGroupStyle}>
                <SubCategoryTitle>Manière de travailler avec les autres</SubCategoryTitle>
                {softCollectif.map((s, i) => (
                    <SoftSkillRow key={s.title} {...s} isLast={i === softCollectif.length - 1} />
                ))}
            </Reveal>

            <Divider />

            {/* ── Autre ── */}
            <SectionTitle>Autre</SectionTitle>
            <Reveal style={{ padding: "0 1.5rem 5rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
                    {autres.map(a => <SimpleChip key={a.title} {...a} />)}
                </div>
            </Reveal>
        </>
    );
};

export default Competences;