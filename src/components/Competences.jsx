import React from 'react';

// ── Séparateur ───────────────────────────────────────────────────────────────
const Divider = () => (
    <div style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(80,140,255,0.18))",
    }} />
);

// ── Sous-titre de section ────────────────────────────────────────────────────
const SectionTitle = ({ children }) => (
    <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <p style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "rgba(80,140,255,0.55)",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(80,140,255,0.2)",
            paddingBottom: "4px",
        }}>
            {children}
        </p>
    </div>
);

// ── Carte techno (logo + label) ──────────────────────────────────────────────
const TechCard = ({ src, alt, label }) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1.25rem 1rem",
        borderRadius: "16px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        width: "110px",
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
        <img src={src} alt={alt} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
        <p style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "rgba(160,190,255,0.85)",
            margin: 0,
        }}>
            {label}
        </p>
    </div>
);

// ── Carte savoir-être / autre ────────────────────────────────────────────────
const SoftCard = ({ title, sub }) => (
    <div style={{
        padding: "1.1rem 1.4rem",
        borderRadius: "14px",
        border: "1px solid rgba(80,140,255,0.1)",
        background: "rgba(13,17,23,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
        <p style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#c8d8ff",
            margin: "0 0 0.5rem",
        }}>
            {title}
        </p>
        <div style={{
            width: "24px", height: "2px",
            background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
            borderRadius: "99px",
            marginBottom: "0.5rem",
            boxShadow: "0 0 8px rgba(60,110,255,0.35)",
        }} />
        <p style={{
            fontSize: "0.78rem",
            color: "rgba(160,190,255,0.55)",
            margin: 0,
        }}>
            {sub}
        </p>
    </div>
);

// ── Composant principal ───────────────────────────────────────────────────────
const Competences = () => {
    const techs = [
        { src: "https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg",                      alt: "Java",   label: "Java"   },
        { src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Database-postgres.svg",          alt: "SQL",    label: "SQL"    },
        { src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",    alt: "HTML",   label: "HTML"   },
        { src: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",                  alt: "CSS",    label: "CSS"    },
        { src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",     alt: "C",      label: "C"      },
        { src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",                   alt: "Git",    label: "Git"    },
        { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",                 alt: "React",  label: "React"  },
    ];

    const softSkills = [
        { title: "Gérer une deadline",   sub: "Compétence en organisation" },
        { title: "Travailler en équipe", sub: "Collaboration efficace"     },
        { title: "Persévérant",          sub: "Résilience et détermination"},
        { title: "Ponctuel",             sub: "Respect des délais"         },
    ];

    const autres = [
        { title: "Permis",  sub: "Catégorie B" },
        { title: "Anglais", sub: "Niveau B2"   },
    ];

    return (
        <>
            <section id="competences" />

            {/* ── Titre ── */}
            <div style={{ textAlign: "center", padding: "5rem 1rem 1rem" }}>
                <p style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: "rgba(80,140,255,0.55)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                }}>
                    Savoir-faire
                </p>
                <h1 style={{
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    fontWeight: 700,
                    color: "#c8d8ff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                }}>
                    Mes Compétences
                </h1>
                <div style={{
                    width: "40px", height: "3px",
                    background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
                    borderRadius: "99px",
                    margin: "1rem auto 0",
                    boxShadow: "0 0 12px rgba(60,110,255,0.4)",
                }} />
            </div>

            {/* ── Informatique ── */}
            <SectionTitle>Informatique</SectionTitle>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                padding: "0 1.5rem 2rem",
                maxWidth: "900px",
                margin: "0 auto",
            }}>
                {techs.map(t => <TechCard key={t.label} {...t} />)}
            </div>

            <Divider />

            {/* ── Savoir-être ── */}
            <SectionTitle>Savoir-être</SectionTitle>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                padding: "0 1.5rem 2rem",
                maxWidth: "900px",
                margin: "0 auto",
            }}>
                {softSkills.map(s => <SoftCard key={s.title} {...s} />)}
            </div>

            <Divider />

            {/* ── Autre ── */}
            <SectionTitle>Autre</SectionTitle>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                padding: "0 1.5rem 5rem",
                maxWidth: "900px",
                margin: "0 auto",
            }}>
                {autres.map(a => <SoftCard key={a.title} {...a} />)}
            </div>
        </>
    );
};

export default Competences;