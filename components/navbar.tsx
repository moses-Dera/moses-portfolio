"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar(){
    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 h-[10vh] sticky top-0 left-0 right-0 flex flex-row justify-between items-center px-2 sm:px-5 p-4 border-b-2 backdrop-blur-md"
        >
            <Link href="/" className="w-1/2">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-xl sm:text-3xl font-extrabold font-fira flex justify-start items-center"
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image 
                            src='https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png'
                            alt="logo"
                            width={60}
                            height={90}
                            className="p-1 sm:p-2 mt-2 sm:mt-3 -rotate-18 sm:w-25 sm:h-37.5"
                        />
                    </motion.div>
                </motion.div>
            </Link>
            <div className="w-1/2">
                <ul className="flex flex-row justify-end items-center gap-1 sm:gap-2" style={{fontFamily: 'var(--font-jetbrains)'}}>
                    <motion.li 
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-b-2 border-dashed p-1"
                    >
                        <Link href="/skill">Skills</Link>
                    </motion.li>
                    <motion.li 
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-b-2 border-dashed p-1"
                    >
                        <Link href="/project">Work</Link>
                    </motion.li>
                    <motion.li 
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-sm sm:text-xl font-light border-r-2 border-b-2 border-dashed p-1"
                    >
                        <Link href="/contact">Contact</Link>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    )
}