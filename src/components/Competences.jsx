import React from 'react';

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
    <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
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

// ── Titre de sous-catégorie soft skills ──────────────────────────────────────
const SubCategoryTitle = ({ children }) => (
    <div style={{ width: "100%", maxWidth: "960px", margin: "1.5rem auto 0.5rem", padding: "0 1.5rem" }}>
        <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "#508cff", textTransform: "uppercase", marginBottom: "0.4rem",
        }}>
            {children}
        </p>
        <div style={{ height: "1px", background: "linear-gradient(to right, rgba(80,140,255,0.35), transparent)" }} />
    </div>
);

// ── Barre de niveau ──────────────────────────────────────────────────────────
const LevelBar = ({ level, max = 5 }) => (
    <div style={{ display: "flex", gap: "4px", margin: "0.6rem 0" }}>
        {Array.from({ length: max }).map((_, i) => (
            <div key={i} style={{
                height: "3px", flex: 1, borderRadius: "99px",
                background: i < level
                    ? "linear-gradient(90deg, #3a6fff, #80aaff)"
                    : "rgba(80,140,255,0.12)",
                boxShadow: i < level ? "0 0 5px rgba(60,110,255,0.4)" : "none",
            }} />
        ))}
    </div>
);

// ── Carte techno enrichie ────────────────────────────────────────────────────
const TechCard = ({ src, alt, label, level, levelLabel, context, knowHow }) => (
    <div style={{
        display: "flex", flexDirection: "column", gap: "0.5rem",
        padding: "1.25rem 1.4rem", borderRadius: "16px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.5)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        width: "280px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "default",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.35)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(30,80,200,0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src={src} alt={alt} style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "#c8d8ff" }}>{label}</p>
                <p style={{ margin: 0, fontSize: "0.68rem", color: "#508cff", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{levelLabel}</p>
            </div>
        </div>
        <LevelBar level={level} />
        <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(128,170,255,0.45)", margin: "0 0 2px", fontWeight: 600 }}>Contexte</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(160,190,255,0.65)", lineHeight: 1.55, margin: 0 }}>{context}</p>
        </div>
        <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(128,170,255,0.45)", margin: "0 0 2px", fontWeight: 600 }}>Savoir-faire</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(160,190,255,0.65)", lineHeight: 1.55, margin: 0 }}>{knowHow}</p>
        </div>
    </div>
);

// ── Carte soft skill enrichie ────────────────────────────────────────────────
const SoftSkillCard = ({ icon, title, situation, analyse, profil }) => (
    <div style={{
        display: "flex", flexDirection: "column", gap: "0.6rem",
        padding: "1.4rem 1.5rem", borderRadius: "16px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.5)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        width: "300px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "default",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.35)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(30,80,200,0.15)";
            e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
        }}
    >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.3rem" }}>{icon}</span>
            <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#c8d8ff" }}>{title}</p>
        </div>
        <div style={{
            width: "30px", height: "2px",
            background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
            borderRadius: "99px",
            boxShadow: "0 0 8px rgba(60,110,255,0.35)",
        }} />

        {/* Situation */}
        <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(128,170,255,0.45)", margin: "0 0 3px", fontWeight: 600 }}>
                Situation concrète
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(160,190,255,0.7)", lineHeight: 1.6, margin: 0 }}>{situation}</p>
        </div>

        {/* Analyse */}
        <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(128,170,255,0.45)", margin: "0 0 3px", fontWeight: 600 }}>
                Analyse
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(160,190,255,0.7)", lineHeight: 1.6, margin: 0 }}>{analyse}</p>
        </div>

        {/* Profil personnel */}
        <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(128,170,255,0.45)", margin: "0 0 3px", fontWeight: 600 }}>
                Mon fonctionnement
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(160,190,255,0.7)", lineHeight: 1.6, margin: 0 }}>{profil}</p>
        </div>
    </div>
);

// ── Carte simple (Autre) ─────────────────────────────────────────────────────
const SimpleCard = ({ title, sub }) => (
    <div style={{
        padding: "1.1rem 1.4rem", borderRadius: "14px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.5)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        minWidth: "160px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "default",
    }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.35)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(30,80,200,0.15)";
            e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(80,140,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
        }}
    >
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#c8d8ff", margin: "0 0 0.5rem" }}>{title}</p>
        <div style={{
            width: "24px", height: "2px",
            background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
            borderRadius: "99px", marginBottom: "0.5rem",
            boxShadow: "0 0 8px rgba(60,110,255,0.35)",
        }} />
        <p style={{ fontSize: "0.78rem", color: "rgba(160,190,255,0.55)", margin: 0 }}>{sub}</p>
    </div>
);

// ── Composant principal ───────────────────────────────────────────────────────
const Competences = () => {
    const techs = [
        {
            src: "https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg",
            alt: "Java", label: "Java · Spring Boot",
            level: 4, levelLabel: "Avancé",
            context: "Alternance CA2BM — backend du projet CEVDPilot (gestion de pesées industrielles).",
            knowHow: "API REST, Spring Security, JPA/Hibernate, architecture controller / service / repository.",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            alt: "React", label: "React · TypeScript",
            level: 4, levelLabel: "Avancé",
            context: "Frontend CEVDPilot (CA2BM) et projet universitaire CHEQA (équipe de 5, 1 semaine).",
            knowHow: "Composants réactifs, gestion d'état, consommation d'API REST, typage strict.",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Database-postgres.svg",
            alt: "SQL", label: "SQL · BDD",
            level: 4, levelLabel: "Avancé",
            context: "Projet universitaire BDD et intégration JPA en alternance à la CA2BM.",
            knowHow: "Conception MCD → MLD, requêtes complexes, jointures, agrégations, optimisation des index.",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
            alt: "HTML", label: "HTML · CSS",
            level: 3, levelLabel: "Intermédiaire",
            context: "Intégration de maquettes sur plusieurs projets web universitaires et personnels.",
            knowHow: "Structure sémantique, responsive (Flexbox, Grid), animations CSS.",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
            alt: "C", label: "C",
            level: 3, levelLabel: "Intermédiaire",
            context: "Cours de systèmes et algorithmique en 1ʳᵉ et 2ᵉ année de BUT.",
            knowHow: "Gestion mémoire, pointeurs, structures de données (listes chaînées, arbres).",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
            alt: "Git", label: "Git · GitHub",
            level: 4, levelLabel: "Avancé",
            context: "Utilisé sur tous les projets (CA2BM, universitaires, personnels).",
            knowHow: "Branches, pull requests, résolution de conflits, revue de code.",
        },
    ];

    const softManiereDetre = [
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
    ];

    const autres = [
        { title: "Permis", sub: "Catégorie B" },
        { title: "Anglais", sub: "Niveau B2" },
    ];

    return (
        <>
            <section id="competences" />

            {/* ── Titre ── */}
            <div style={{ textAlign: "center", padding: "5rem 1rem 1rem" }}>
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
            </div>

            {/* ── Informatique ── */}
            <SectionTitle>Compétences Techniques</SectionTitle>
            <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1rem",
                padding: "0 1.5rem 2rem",
                maxWidth: "960px", margin: "0 auto",
            }}>
                {techs.map(t => <TechCard key={t.label} {...t} />)}
            </div>

            <Divider />

            {/* ── Soft Skills ── */}
            <SectionTitle>Compétences Comportementales</SectionTitle>

            <SubCategoryTitle>Manière d'être</SubCategoryTitle>
            <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1rem",
                padding: "1rem 1.5rem 2rem",
                maxWidth: "960px", margin: "0 auto",
            }}>
                {softManiereDetre.map(s => <SoftSkillCard key={s.title} {...s} />)}
            </div>

            <SubCategoryTitle>Manière de communiquer</SubCategoryTitle>
            <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1rem",
                padding: "1rem 1.5rem 2rem",
                maxWidth: "960px", margin: "0 auto",
            }}>
                {softCommunication.map(s => <SoftSkillCard key={s.title} {...s} />)}
            </div>

            <SubCategoryTitle>Manière de travailler avec les autres</SubCategoryTitle>
            <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1rem",
                padding: "1rem 1.5rem 2rem",
                maxWidth: "960px", margin: "0 auto",
            }}>
                {softCollectif.map(s => <SoftSkillCard key={s.title} {...s} />)}
            </div>

            <Divider />

            {/* ── Autre ── */}
            <SectionTitle>Autre</SectionTitle>
            <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1rem",
                padding: "0 1.5rem 5rem",
                maxWidth: "900px", margin: "0 auto",
            }}>
                {autres.map(a => <SimpleCard key={a.title} {...a} />)}
            </div>
        </>
    );
};

export default Competences;