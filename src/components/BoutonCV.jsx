import React, { useState } from 'react';

function BoutonCV() {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        display: "inline-block",
        padding: "12px 32px",
        fontSize: "0.9rem",
        fontWeight: "700",
        color: isHovered ? "#ffffff" : "#c8d8ff",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        background: isHovered ? "rgba(80, 140, 255, 0.2)" : "rgba(80, 140, 255, 0.05)",
        border: `1px solid ${isHovered ? "#508cff" : "rgba(80, 140, 255, 0.4)"}`,
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isHovered ? "0 0 20px rgba(80, 140, 255, 0.4)" : "none",
        textDecoration: "none",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
    };

    return (
        <a 
            href="https://gradlar.github.io/portfolio/cv.pdf" 
            download="LamourEnzo.pdf"
            style={{ textDecoration: 'none', display: 'block', width: '100%' }}
        >
            <div
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Petit trait décoratif sur le côté */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: isHovered ? '0' : '20%',
                    width: '2px',
                    height: isHovered ? '100%' : '60%',
                    backgroundColor: '#508cff',
                    transition: 'all 0.3s ease'
                }} />

                Télécharger Mon CV
            </div>
        </a>
    );
}

export default BoutonCV;