"use client"
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";
import { DecryptedText } from './DecryptedText';

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSent(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSent(false), 3000);
            }
        } catch (_error) {
            console.error('Failed to send email:', _error);
        } finally {
            setSending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 max-w-6xl mx-auto w-full px-6 md:px-12 py-0 overflow-hidden relative z-10"
        >
            {/* Left Side: Header & Text */}
            <div className="w-full lg:w-1/2 text-left flex flex-col h-full justify-center relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-jetbrains font-extrabold text-foreground mb-2 sm:mb-4"
                >
                    <DecryptedText text="// CONTACT" delay={200} />
                </motion.h1>

                <p className="text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed text-foreground/90 font-medium">
                    Operating at the intersection of systems engineering and product architecture. Ping me to discuss your next technical challenge.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex gap-4 sm:gap-6 justify-start mt-0 sm:mt-2"
                >
                    <a href="https://github.com/moses-Dera" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://www.linkedin.com/in/m-chidera-okonkwo/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://www.credly.com/users/moses-okonkwo" target="_blank" rel="noopener noreferrer">
                        <FaCertificate className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://x.com/0x_moze" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 text-left">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="backdrop-blur-sm border p-4 lg:p-6 hover:bg-foreground/5 transition-all border-border rounded-lg w-full bg-foreground/5"
                >
                    <h2 className="text-xl sm:text-2xl font-jetbrains mb-3 sm:mb-4 text-foreground font-bold">Let&apos;s Connect</h2>

                    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full p-2 sm:p-2.5 border-2 bg-transparent font-mono text-sm sm:text-base font-medium"
                            style={{
                                borderColor: 'var(--color-accent)',
                                color: 'var(--color-text)',
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full p-2 sm:p-2.5 border-2 bg-transparent font-mono text-sm sm:text-base font-medium"
                            style={{
                                borderColor: 'var(--color-accent)',
                                color: 'var(--color-text)',
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        />
                        <textarea
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={2}
                            className="w-full p-2 sm:p-2.5 border-2 bg-transparent font-mono resize-none text-sm sm:text-base font-medium"
                            style={{
                                borderColor: 'var(--color-accent)',
                                color: 'var(--color-text)',
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-2.5 sm:py-3 mt-2 text-base sm:text-lg text-background font-bold transition-all hover:scale-105"
                            style={{
                                backgroundColor: sent ? 'green' : 'var(--color-accent)',
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                            }}
                        >
                            {sending ? 'Sending...' : sent ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    )
}
