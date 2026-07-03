"use client";

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa"
import { motion } from "framer-motion"


export default function Home(){
  return (
    <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-8 items-stretch justify-center min-h-[80vh] relative">
      
      {/* LEFT COLUMN: Title and Description */}
      <div className="flex-1 flex flex-col justify-center items-start gap-4 relative z-10"> 
        <div className="flex flex-col text-2xl sm:text-4xl md:text-5xl font-extrabold font-jetbrains text-foreground">
          <div className="ml-8 text-accent">{"\\\\.."}</div>
          <div>MOSES C. OKONKWO</div>
          <div className="ml-8 text-accent">{"..\\\\"}</div>
        </div>
        
        <div className="font-fira text-lg sm:text-xl border-b border-foreground pb-1 text-foreground inline-block mt-4">
          Full-stack Software Engineer
        </div>

        <p className="font-mono text-sm md:text-base w-full lg:w-3/4 text-foreground/70 leading-relaxed mt-4">
          I build full-stack applications with robust backend systems<br/>
          and clean interfaces. Full-Stack Software Engineer<br/>
          specializing in APIs, databases, and modern frontend<br/>
          frameworks. {"---.-.---"}
        </p>
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

        <button className="font-jetbrains text-sm px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
          <Link href="/project">View project</Link>
        </button>
      </div>
    </div>
  )
}