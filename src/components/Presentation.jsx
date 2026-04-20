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

                {/* Badge statut */}
                <p style={{
                    fontSize: '0.75rem', letterSpacing: '0.25em',
                    color: '#508cff', textTransform: 'uppercase',
                    fontWeight: 700, marginBottom: '1rem',
                }}>
                    Alternant · Développeur Full Stack
                </p>

                <h1 className="mb-5 text-5xl font-bold" style={{
                    color: '#c8d8ff',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 40px rgba(80,140,255,0.4)',
                }}>
                    Lamour Enzo
                </h1>

                <p className="max-w-lg mx-auto mb-4" style={{
                    color: 'rgba(160, 190, 255, 0.85)',
                    lineHeight: 1.8, fontSize: '1.05rem',
                }}>
                    Étudiant en 3ᵉ année de BUT Informatique à l'IUT A de Villeneuve-d'Ascq,
                    actuellement en alternance à la <strong style={{ color: '#c8d8ff' }}>CA2BM</strong>.
                </p>

                <p className="max-w-lg mx-auto mb-10" style={{
                    color: 'rgba(160, 190, 255, 0.65)',
                    lineHeight: 1.8, fontSize: '0.95rem',
                }}>
                    À la recherche d'un poste de <strong style={{ color: '#80aaff' }}>développeur Full Stack</strong> pour
                    mettre mes compétences en production.
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
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(80, 140, 255, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(80, 140, 255, 0.1)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(80, 140, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    En savoir plus
                </a>
            </div>
        </div>
    );
}