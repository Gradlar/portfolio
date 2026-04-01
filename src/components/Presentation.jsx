export default function Presentation() {

    const scrollToCompetences = (e) => {
        e.preventDefault();
        const target = document.querySelector('#competences');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="relative z-10 text-center px-6">
                <h1 className="mb-5 text-5xl font-bold" style={{
                    color: '#c8d8ff',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 40px rgba(80,140,255,0.4)',
                }}>
                    Lamour Enzo
                </h1>
                <p className="max-w-md mx-auto mb-10" style={{
                    color: 'rgba(160, 190, 255, 0.85)',
                    lineHeight: 1.7, fontSize: '1.1rem',
                }}>
                    Actuellement étudiant en 3ᵉ année de BUT Informatique à l'IUT A de Villeneuve-d'Ascq.
                </p>

                <a href="#competences" onClick={scrollToCompetences} style={{
                    display: 'inline-block', padding: '12px 32px',
                    borderRadius: '99px',
                    background: 'rgba(80, 140, 255, 0.1)',
                    border: '1px solid rgba(80, 140, 255, 0.3)',
                    color: '#c8d8ff', textDecoration: 'none',
                    fontSize: '0.95rem', fontWeight: 500,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(80, 140, 255, 0.1)',
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(80, 140, 255, 0.2)';
                        e.currentTarget.style.boxShadow  = '0 0 30px rgba(80, 140, 255, 0.3)';
                        e.currentTarget.style.transform  = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(80, 140, 255, 0.1)';
                        e.currentTarget.style.boxShadow  = '0 0 20px rgba(80, 140, 255, 0.1)';
                        e.currentTarget.style.transform  = 'translateY(0)';
                    }}
                >
                    En savoir plus
                </a>
            </div>
        </div>
    );
}