"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when navigating
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-50 h-[10vh] sticky top-0 left-0 right-0 flex flex-row justify-between items-center px-4 sm:px-8 p-4 bg-background/40 backdrop-blur-xl border-b border-border/40"
            >
                <Link href="/" className="flex-shrink-0 z-50">
                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-start items-center"
                >
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-start font-fira text-(--color-accent) leading-[0.85] font-bold text-sm sm:text-base"
                    >
                        <span className="translate-x-[2px] -translate-y-[2px] whitespace-pre">{` \\\\..`}</span>
                        <span className="whitespace-pre">{`..\\\\`}</span>
                    </motion.div>
                </motion.div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden sm:flex flex-row justify-end items-center w-full ml-4">
                    <ul className="flex flex-row justify-end items-center gap-6 ml-auto" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                        <motion.li whileHover={{ scale: 1.1, y: -2 }} className="text-xl font-light border-2 border-dashed hover:border-none p-2">
                            <Link href="/skill">Skills</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, y: -2 }} className="text-xl font-light border-2 border-dashed hover:border-none p-2">
                            <Link href="/experience">Experience</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, y: -2 }} className="text-xl font-light border-2 border-dashed hover:border-none p-2">
                            <Link href="/project">Projects</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1, y: -2 }} className="text-xl font-light border-2 border-b-2 border-dashed hover:border-none p-2">
                            <Link href="/contact">Contact</Link>
                        </motion.li>
                    </ul>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="sm:hidden flex items-center z-50">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-foreground focus:outline-none">
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Full-Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center sm:hidden"
                    >
                        <ul className="flex flex-col items-center gap-8" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                            <motion.li whileHover={{ scale: 1.1 }} className="text-3xl font-light tracking-widest border-b border-dashed pb-2">
                                <Link href="/skill">Skills</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} className="text-3xl font-light tracking-widest border-b border-dashed pb-2">
                                <Link href="/experience">Experience</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} className="text-3xl font-light tracking-widest border-b border-dashed pb-2">
                                <Link href="/project">Projects</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} className="text-3xl font-light tracking-widest border-b border-dashed pb-2">
                                <Link href="/contact">Contact</Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}