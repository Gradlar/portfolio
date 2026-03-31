import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            width: '100%',
            padding: '4rem 1rem 3rem',
            position: 'relative',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Ligne de séparation stylisée */}
            <div style={{
                width: '100%',
                maxWidth: '1100px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(80, 140, 255, 0.3), transparent)',
                marginBottom: '2rem'
            }} />

            <aside style={{ textAlign: 'center', zIndex: 1 }}>
                {/* Logo ou Initiales optionnels */}
                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#508cff',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                    textShadow: '0 0 15px rgba(80, 140, 255, 0.5)'
                }}>
                    Lamour Enzo
                </div>

                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(160, 190, 255, 0.6)',
                    letterSpacing: '0.02em',
                    margin: 0,
                    fontWeight: 400
                }}>
                    Copyright © {currentYear} 
                    <span style={{ color: '#c8d8ff', margin: '0 8px', fontWeight: 500 }}>•</span> 
                    Lamour Enzo
                    <span style={{ color: '#c8d8ff', margin: '0 8px', fontWeight: 500 }}>•</span> 
                    Tous droits réservés
                </p>

                {/* Petite lueur de rappel en bas */}
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    height: '100px',
                    background: 'radial-gradient(ellipse at center, rgba(30, 80, 200, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
            </aside>
        </footer>
    );
}