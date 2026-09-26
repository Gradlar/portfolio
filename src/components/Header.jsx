import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => {
        const burgerCheckbox = document.getElementById("my-drawer-3");
        if (burgerCheckbox) burgerCheckbox.checked = false;
    };

    const navLinks = [
        { label: "Projets",     to: "/projets" },
        { label: "Expériences", to: "/experiences" },
        { label: "Formations",  to: "/about" },
    ];

    const getNavLinkStyle = ({ isActive }) => ({
        fontSize: "0.875rem",
        color: isActive ? "#5a8fff" : "rgba(160, 190, 255, 0.75)",
        background: isActive ? "rgba(80, 140, 255, 0.1)" : "transparent",
        padding: "0.4rem 0.85rem",
        borderRadius: "99px",
        textDecoration: "none",
        transition: "all 0.2s ease",
        fontWeight: isActive ? 600 : 450,
        letterSpacing: "0.01em",
    });

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        transition: "all 0.4s ease",
                        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
                        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
                        backgroundColor: scrolled
                            ? "rgba(13, 17, 23, 0.88)"
                            : "rgba(13, 17, 23, 0.15)",
                        borderBottom: scrolled
                            ? "1px solid rgba(80, 140, 255, 0.15)"
                            : "1px solid rgba(80, 140, 255, 0.06)",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 1.5rem",
                            height: "64px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Logo / Nom */}
                        <NavLink to="/" style={{ textDecoration: 'none' }}>
                            <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c8d8ff" }}>
                                Lamour <span style={{ color: "#5a8fff", fontWeight: 400 }}>Enzo</span>
                            </span>
                        </NavLink>

                        {/* Nav desktop */}
                        <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "0.25rem" }}>
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.label} 
                                    to={link.to} 
                                    style={getNavLinkStyle}
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <HashLink
                                smooth
                                to={`${location.pathname}#contact`}
                                style={{
                                    marginLeft: "0.5rem",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    color: "#fff",
                                    background: "linear-gradient(135deg, #3a6fff 0%, #1a4fd6 100%)",
                                    textDecoration: "none",
                                    borderRadius: "99px",
                                    padding: "0.45rem 1.1rem",
                                    boxShadow: "0 0 16px rgba(60, 110, 255, 0.3)",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                Contact
                            </HashLink>
                        </nav>

                        {/* Burger mobile */}
                        <div className="lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-ghost btn-square" style={{ color: "#c8d8ff" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                    </div>
                </div>
                <div style={{ height: "64px" }} />
            </div>

            {/* ── Sidebar mobile ── */}
            <div className="drawer-side" style={{ zIndex: 100 }}>
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <div
                    style={{
                        minHeight: "100dvh",
                        width: "280px",
                        padding: "2rem 1.5rem",
                        background: "rgba(10, 14, 20, 0.97)",
                        backdropFilter: "blur(24px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    <p style={{ fontSize: "0.75rem", color: "rgba(80, 140, 255, 0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
                        Navigation
                    </p>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            onClick={closeMenu}
                            style={({ isActive }) => ({
                                display: "block",
                                padding: "0.65rem 0.75rem",
                                borderRadius: "10px",
                                textDecoration: "none",
                                color: isActive ? "#5a8fff" : "rgba(160, 190, 255, 0.85)",
                                background: isActive ? "rgba(80, 140, 255, 0.1)" : "transparent",
                                transition: "0.2s"
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <HashLink                        
                        smooth
                        to={`${location.pathname}#contact`}
                        onClick={closeMenu}
                        style={{
                            marginTop: "1.5rem",
                            padding: "0.8rem",
                            textAlign: "center",
                            borderRadius: "12px",
                            textDecoration: "none",
                            background: "linear-gradient(135deg, #508cff 0%, #1a4fd6 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                            boxShadow: "0 0 20px rgba(80, 140, 255, 0.3)",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow = "0 0 30px rgba(80, 140, 255, 0.5)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(80, 140, 255, 0.3)";
                        }}
                    >
                        Contactez-moi
                    </HashLink>
                </div>
            </div>
        </div>
    );
}