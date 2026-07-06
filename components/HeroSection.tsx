"use client";

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa"
import { motion } from "framer-motion"
import { DecryptedText } from "./DecryptedText"

export default function HeroSection(){

  return (
    <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-8 items-stretch justify-center relative max-w-6xl mx-auto w-full">
      
      {/* LEFT COLUMN: Title and Description */}
      <div className="flex-1 flex flex-col justify-center items-start gap-4 relative z-10"> 
        <div className="flex flex-col text-3xl sm:text-5xl md:text-6xl font-extrabold font-jetbrains text-foreground">
          <div className="ml-8 text-accent">{"\\\\.."}</div>
          <DecryptedText text="MOSES C. OKONKWO" delay={500} speed={40} revealPerTick={0.8} />
          <div className="ml-8 text-accent">{"..\\\\"}</div>
        </div>
        
        <div className="font-fira text-xl sm:text-2xl border-b-2 border-accent pb-1 text-foreground font-bold inline-block mt-4 drop-shadow-md">
          Software Engineer // Backend & AI Systems
        </div>

        <p className="font-mono text-base md:text-lg w-full lg:w-3/4 text-foreground/90 font-semibold leading-relaxed mt-6 drop-shadow-lg">
          System architecture, high-concurrency APIs, and LLM integration — built for real-world constraints.</p>
      </div>

      {/* RIGHT COLUMN: Socials and Button (Bottom Right) */}
      <div className="flex-1 flex flex-col justify-end items-end relative z-10 pb-4">
        
        <div className="flex gap-5 mb-4">
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <a href="https://github.com/moses-Dera" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaGithub size={24} />
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <a href="https://www.linkedin.com/in/m-chidera-okonkwo/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaLinkedin size={24} />
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <a href="https://www.credly.com/users/moses-okonkwo" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaCertificate size={24} />
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <a href="https://x.com/0x_moze" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
              <FaTwitter size={24} />
            </a>
          </motion.div>
        </div>

        <div className="flex gap-4">
          <button className="font-jetbrains text-base px-6 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors font-extrabold bg-background/30 backdrop-blur-sm drop-shadow-md">
            <Link href="#project">View project</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
