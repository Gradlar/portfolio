import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import de tes composants
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Homepage from './pages/HomePage.jsx';
import ExperiencesPage from './pages/ExperiencesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';
import ContactRedirector from './utils/ContactRedirector.jsx';

const Layout = ({ children }) => {
    return (
        <div className="App" style={{ background: "#0d1117", minHeight: "100vh", display: "flex", flexDirection: "column", position: 'relative', overflow: 'hidden' }}>
            
            {/* ── FOND TACHES BLEUTÉES ── */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                {[
                    { w: 600, h: 500, left: '-15%', top: '0%',   dur: '20s', delay: '0s'   },  
                    { w: 500, h: 600, left: '85%',  top: '5%',   dur: '25s', delay: '-8s'  }, 
                    { w: 700, h: 400, left: '-20%', top: '45%',  dur: '18s', delay: '-4s'  },  
                    { w: 400, h: 500, left: '85%',  top: '55%',  dur: '22s', delay: '-12s' },  
                    { w: 450, h: 450, left: '-10%', top: '80%',  dur: '15s', delay: '-6s'  }, 
                ].map((blob, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width:  blob.w,
                        height: blob.h,
                        left:   blob.left,
                        top:    blob.top,
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(50, 100, 220, 0.13) 0%, rgba(30, 60, 180, 0.06) 50%, transparent 75%)',
                        filter: 'blur(40px)',
                        animation: `blobDrift ${blob.dur} ease-in-out infinite alternate`,
                        animationDelay: blob.delay,
                        willChange: 'transform',
                    }} />
                ))}
            </div>

            <style>{`
                @keyframes blobDrift {
                    0%   { transform: translate(0px, 0px)   scale(1);    }
                    33%  { transform: translate(30px, -20px) scale(1.05); }
                    66%  { transform: translate(-20px, 15px) scale(0.97); }
                    100% { transform: translate(15px, 25px)  scale(1.03); }
                }
            `}</style>

            <ScrollToTop />
            <Header />
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <ContactRedirector />
            <Layout>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    
                    <Route path="/experiences" element={<ExperiencesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projets" element={<ProjectsPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </StrictMode>
);