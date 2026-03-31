import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContactRedirector() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Si l'URL est exactement "/contact"
        if (location.pathname === '/contact') {
            // 1. On change l'URL en interne vers /#contact sans recharger
            navigate('/#contact', { replace: true });

            // 2. On cherche la section et on scroll
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location, navigate]);

    return null;
}