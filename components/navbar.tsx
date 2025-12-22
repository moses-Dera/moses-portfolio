"use client"
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 h-[10vh] sticky top-0 left-0 right-0 flex flex-row justify-center items-center px-2 sm:px-5 p-4 backdrop-blur-md"
        >
            <Link href="/" className="w-2/10">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-xl sm:text-3xl font-extrabold font-fira flex justify-start items-center"
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xl sm:text-3xl font-extrabold font-fira">M.</span>
                    </motion.div>
                </motion.div>
            </Link>
            <div className="w-8/10 flex flex-row justify-center items-center gap-1 sm:gap-2">
                <ul className="flex flex-row justify-center items-center gap-4 sm:gap-5" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                    <motion.li
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-2 border-dashed hover:border-none p-1"
                    >
                        <Link href="/skill">Skills</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-2 border-dashed hover:border-none p-1"
                    >
                        <Link href="/project">Work</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-2 border-b-2 border-dashed hover:border-none p-1"
                    >
                        <Link href="/contact">Contact</Link>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    )
}