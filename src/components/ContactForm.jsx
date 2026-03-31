import { useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isSending, setIsSending] = useState(false);

    // Style commun pour les inputs
    const inputStyle = {
        width: "100%",
        padding: "0.8rem 1rem",
        borderRadius: "12px",
        background: "rgba(80, 140, 255, 0.05)",
        border: "1px solid rgba(80, 140, 255, 0.2)",
        color: "#c8d8ff",
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            alert('Veuillez valider le CAPTCHA avant de soumettre le formulaire.');
            return;
        }

        setIsSending(true);
        const templateParams = { name, email, message };

        try {
            await emailjs.send(
                'service_3wus19q',
                'template_jp1fk83',
                templateParams,
                'QqI5thbNrhK2yh12J'
            );
            alert('Email envoyé avec succès !');
            setName('');
            setEmail('');
            setMessage('');
            setCaptchaValue(null);
        } catch (error) {
            alert('Erreur lors de l\'envoi de l\'email.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" style={{ 
            display: "flex", 
            justifyContent: "center", 
            padding: "8rem 1rem 4rem", 
            scrollMarginTop: "2rem" 
        }}>
            <div style={{
                width: "100%",
                maxWidth: "600px",
                padding: "2.5rem",
                borderRadius: "24px",
                border: "1px solid rgba(80, 140, 255, 0.15)",
                background: "rgba(13, 17, 23, 0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#c8d8ff",
                    textAlign: "center",
                    marginBottom: "2rem",
                    letterSpacing: "-0.02em"
                }}>
                    Envoyez-moi un <span style={{ color: "#5a8fff" }}>Message</span>
                </h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    
                    {/* Nom */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "rgba(160,190,255,0.6)", fontWeight: 600, marginLeft: "4px" }}>NOM</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Votre nom"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#5a8fff";
                                e.target.style.boxShadow = "0 0 15px rgba(90,143,255,0.15)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "rgba(80, 140, 255, 0.2)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "rgba(160,190,255,0.6)", fontWeight: 600, marginLeft: "4px" }}>EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="votre@email.com"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#5a8fff";
                                e.target.style.boxShadow = "0 0 15px rgba(90,143,255,0.15)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "rgba(80, 140, 255, 0.2)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "rgba(160,190,255,0.6)", fontWeight: 600, marginLeft: "4px" }}>MESSAGE</label>
                        <textarea
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            placeholder="Comment puis-je vous aider ?"
                            style={{ ...inputStyle, resize: "none" }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#5a8fff";
                                e.target.style.boxShadow = "0 0 15px rgba(90,143,255,0.15)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "rgba(80, 140, 255, 0.2)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* CAPTCHA - On centre le widget */}
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        margin: "0.5rem 0",
                        transform: "scale(0.9)", // Légère réduction pour mobile
                    }}>
                        <ReCAPTCHA
                            sitekey={"6LcxApoqAAAAAFhEv_exwO6F7vnShnUmmlzhk2af"}
                            onChange={handleCaptchaChange}
                            theme="dark" // Thème sombre pour le Captcha
                        />
                    </div>

                    {/* Bouton Submit */}
                    <button 
                        type="submit" 
                        disabled={isSending}
                        style={{
                            padding: "1rem",
                            borderRadius: "12px",
                            border: "none",
                            background: isSending 
                                ? "rgba(80,140,255,0.2)" 
                                : "linear-gradient(135deg, #3a6fff 0%, #1a4fd6 100%)",
                            color: isSending ? "rgba(255,255,255,0.5)" : "#fff",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: isSending ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: isSending ? "none" : "0 0 20px rgba(58, 111, 255, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                            if (!isSending) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 5px 25px rgba(58, 111, 255, 0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSending) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 0 20px rgba(58, 111, 255, 0.3)";
                            }
                        }}
                    >
                        {isSending ? 'Transmission en cours...' : 'Envoyer le message'}
                    </button>
                </form>
            </div>
        </section>
    );
}