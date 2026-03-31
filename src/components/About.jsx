import React from "react";

// ── Séparateur (Harmonisé avec Expériences) ──────────────────────────────────
const Divider = () => (
    <div style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(80,140,255,0.2), transparent)",
    }} />
);

// ── Carte Formation (Version Bloc Statique) ──────────────────────────────────
const FormCard = ({ title, degree, period, content }) => {
    return (
        <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            borderRadius: "20px",
            border: "1px solid rgba(80,140,255,0.12)",
            background: "rgba(13,17,23,0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "2rem",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            position: "relative",
            overflow: "hidden"
        }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(80,140,255,0.4)";
                e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
                e.currentTarget.style.background = "rgba(18,25,38,0.7)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(80,140,255,0.1)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(80,140,255,0.12)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(13,17,23,0.4)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Header Formation */}
            <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "10px"
                }}>
                    <h3 style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#c8d8ff",
                        letterSpacing: "-0.01em",
                        margin: 0
                    }}>
                        {title}
                    </h3>
                    <span style={{
                        fontSize: "0.85rem",
                        color: "rgba(160,190,255,0.5)",
                        fontWeight: 500
                    }}>
                        {period}
                    </span>
                </div>
                
                <div style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "6px",
                    background: "rgba(80,140,255,0.1)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#5a8fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "0.75rem"
                }}>
                    {degree}
                </div>
            </div>

            {/* Contenu de la formation */}
            <p style={{
                fontSize: "0.95rem",
                color: "rgba(160,190,255,0.8)",
                lineHeight: 1.7,
                textAlign: "justify",
                margin: 0
            }}>
                {content}
            </p>
        </div>
    );
};

export default function About() {
    const formations = [
        {
            title: "Université de Lille - IUT A",
            degree: "BUT Informatique",
            period: "2022 - Présent",
            content: "Durant cette formation, j'ai acquis des compétences solides en développement logiciel, en gestion de bases de données et en gestion de projets. Les cours m'ont permis de développer une expertise en programmation (Java, SQL, JavaScript) et d'approfondir mes connaissances en architecture des systèmes d'information et en réseaux informatiques."
        },
        {
            title: "Lycée St Joseph - Boulogne-sur-Mer",
            degree: "BACCALAURÉAT Technologique",
            period: "2018 - 2021",
            content: "J'ai obtenu mon baccalauréat technologique où j'ai développé un intérêt particulier pour les sciences informatiques. Cette période m'a permis de renforcer mes compétences en analyse de systèmes, de découvrir le développement web et de me familiariser avec les langages de programmation de base."
        }
    ];

    return (
        <section id="about" style={{ paddingBottom: "8rem" }}>
            {/* Titre Section */}
            <div style={{ textAlign: "center", padding: "8rem 1rem 3rem" }}>
                <p style={{ 
                    fontSize: "0.8rem", 
                    letterSpacing: "0.3em", 
                    color: "#508cff", 
                    textTransform: "uppercase", 
                    marginBottom: "0.75rem", 
                    fontWeight: 700 
                }}>
                    Éducation
                </p>
                <h2 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 800,
                    color: "#c8d8ff",
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 50px rgba(80,140,255,0.3)",
                    margin: 0
                }}>
                    Mes Formations
                </h2>
                <div style={{
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #508cff, transparent)",
                    borderRadius: "99px",
                    margin: "1.5rem auto 0",
                }} />
            </div>

            {/* Liste des cartes avec espacement consistant */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 1rem",
                gap: "2rem" 
            }}>
                {formations.map((f, i) => (
                    <FormCard 
                        key={i}
                        title={f.title}
                        degree={f.degree}
                        period={f.period}
                        content={f.content}
                    />
                ))}
            </div>
        </section>
    );
}