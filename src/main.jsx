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
        <div className="App" style={{ background: "#0d1117", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <ScrollToTop />
            <Header />
            <main style={{ flex: 1 }}>
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