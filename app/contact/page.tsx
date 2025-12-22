"use client"
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen p-8 flex flex-col items-center justify-center"
        >
            <div className="max-w-2xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold font-jetbrains mb-8"
                >
                    Get In Touch
                </motion.h1>

                <p className="text-lg mb-12 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    Ready to collaborate on your next project? Let&apos;s discuss how we can build something amazing together.
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="backdrop-blur-sm border p-8 hover:bg-white/5 transition-all"
                    style={{
                        backgroundColor: 'var(--color-border)',
                        borderColor: 'var(--color-border)',
                        clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                    }}
                >
                    <h2 className="text-2xl font-jetbrains mb-6">Let&apos;s Connect</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full p-3 border-2 bg-transparent font-mono"
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
                            className="w-full p-3 border-2 bg-transparent font-mono"
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
                            rows={4}
                            className="w-full p-3 border-2 bg-transparent font-mono resize-none"
                            style={{
                                borderColor: 'var(--color-accent)',
                                color: 'var(--color-text)',
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 text-white font-semibold transition-all hover:scale-105"
                            style={{
                                backgroundColor: sent ? 'green' : 'var(--color-accent)',
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                            }}
                        >
                            {sending ? 'Sending...' : sent ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex gap-6 justify-center mt-8"
                >
                    <a href="https://github.com/moses-Dera" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={28} className="hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://www.linkedin.com/in/m-chidera-okonkwo/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={28} className="hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://www.credly.com/users/moses-okonkwo" target="_blank" rel="noopener noreferrer">
                        <FaCertificate size={28} className="hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                    <a href="https://x.com/0x_moze" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={28} className="hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                    </a>
                </motion.div>
            </div>
        </motion.div>
    )
}