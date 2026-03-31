import React from "react";

// Composant pour chaque ligne de contact
const ContactItem = ({ label, value, href, isExternal }) => (
    <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem",
        borderRadius: "12px",
        background: "rgba(80, 140, 255, 0.03)",
        border: "1px solid rgba(80, 140, 255, 0.08)",
        transition: "transform 0.2s, background 0.2s",
    }}
    onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(80, 140, 255, 0.08)";
        e.currentTarget.style.transform = "translateX(10px)";
    }}
    onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(80, 140, 255, 0.03)";
        e.currentTarget.style.transform = "translateX(0)";
    }}
    >
        <span style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "#5a8fff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            minWidth: "100px"
        }}>
            {label}
        </span>
        
        <a 
            href={href}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            style={{
                color: "#c8d8ff",
                textDecoration: "none",
                fontSize: "0.95rem",
                wordBreak: "break-all",
                transition: "color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#508cff"}
            onMouseLeave={e => e.currentTarget.style.color = "#c8d8ff"}
        >
            {value}
        </a>
    </div>
);

export default function Contact() {
    return (
        <section id="contact" style={{ paddingBottom: "6rem" }}>
            {/* ── Titre ── */}
            <div style={{ textAlign: "center", padding: "5rem 1rem 3.5rem" }}>
                <p style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: "rgba(80,140,255,0.55)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                }}>
                    Réseaux & Mail
                </p>
                <h2 style={{
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    fontWeight: 700,
                    color: "#c8d8ff",
                    letterSpacing: "-0.03em",
                    margin: 0
                }}>
                    Contact
                </h2>
                <div style={{
                    width: "40px", height: "3px",
                    background: "linear-gradient(90deg, #3a6fff, #1a4fd6)",
                    borderRadius: "99px",
                    margin: "1.2rem auto 0",
                    boxShadow: "0 0 12px rgba(60,110,255,0.4)",
                }} />
            </div>

            {/* ── Carte de Contact ── */}
            <div style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "2rem",
                borderRadius: "20px",
                border: "1px solid rgba(80,140,255,0.12)",
                background: "rgba(13,17,23,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}>
                <p style={{
                    color: "rgba(160, 190, 255, 0.7)",
                    textAlign: "center",
                    marginBottom: "2.5rem",
                    fontSize: "1.05rem"
                }}>
                    Besoin d'un collaborateur ou d'échanger sur un projet ? <br/>
                    Je suis disponible sur les plateformes suivantes :
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <ContactItem 
                        label="Université" 
                        value="enzo.lamour.etu@univ-lille.fr" 
                        href="mailto:enzo.lamour.etu@univ-lille.fr" 
                    />
                    <ContactItem 
                        label="Personnel" 
                        value="lamourenzo@gmail.com" 
                        href="mailto:lamourenzo@gmail.com" 
                    />
                    <ContactItem 
                        label="LinkedIn" 
                        value="linkedin.com/in/lamour-enzo" 
                        href="https://www.linkedin.com/in/lamour-enzo-4464a6270/" 
                        isExternal
                    />
                    <ContactItem 
                        label="GitHub" 
                        value="github.com/Gradlar" 
                        href="https://github.com/Gradlar" 
                        isExternal
                    />
                </div>
            </div>
        </section>
    );
}