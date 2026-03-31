const ExpCard = ({ title, role, items, description }) => {
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
            <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{
                    fontSize: "1.2rem",
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
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#5a8fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    {role}
                </div>
            </div>

            {description && (
                <p style={{
                    fontSize: "0.95rem",
                    color: "rgba(160,190,255,0.75)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                }}>
                    {description}
                </p>
            )}

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {items.map((item, i) => (
                    <li key={i} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.8rem",
                        fontSize: "0.9rem",
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
};

const Experience = () => {
    const experiences = [
        {
            title: "CA2BM — Communauté d'Agglomération des 2 Baies en Montreuillois (Stage)",
            role: "Développeur — Service informatique",
            description: "J'ai contribué au développement de DechPilot, une application web interne dédiée à la gestion et au suivi des pesées dans les déchetteries de la collectivité.",
            items: [
                "Développement d'une application Spring Boot (Java 17) avec API REST",
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
        {
            title: "E.Leclerc Étaples-Sur-Mer",
            role: "Employé de rayon (Été 2024)",
            items: [
                "Organisation et gestion des stocks",
                "Service à la clientèle et travail d'équipe",
                "Autonomie et prise d'initiatives",
            ],
        },
        {
            title: "Intermarché Saint-Étienne-au-Mont",
            role: "Hôte de caisse (Été 2022)",
            items: [
                "Gestion de la caisse et accueil clientèle",
                "Polyvalence (mise en rayon et préparation drive)",
            ],
        },
        {
            title: "Médiathèque de Saint-Étienne-au-Mont",
            role: "Maintenance Informatique (Stage 2022)",
            items: [
                "Maintenance préventive du parc informatique",
                "Formation et assistance aux utilisateurs",
                "Configuration réseau de base",
            ],
        },
    ];

    return (
        <section id="experiences">
            <div style={{ textAlign: "center", padding: "8rem 1rem 3rem" }}>
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
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "0 1rem 8rem",
            }}>
                {experiences.map((exp, i) => (
                    <ExpCard key={i} {...exp} />
                ))}
            </div>
        </section>
    );
};

export default Experience; 