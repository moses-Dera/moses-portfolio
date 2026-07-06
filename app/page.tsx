"use client";

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getResumeUrl } from "./actions"

export default function Home(){
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    getResumeUrl().then(url => {
      if (url) setResumeUrl(url);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-8 items-stretch justify-center min-h-[80vh] relative max-w-6xl mx-auto w-full pt-10 pb-32">
      
      {/* LEFT COLUMN: Title and Description */}
      <div className="flex-1 flex flex-col justify-center items-start gap-4 relative z-10"> 
        <div className="flex flex-col text-2xl sm:text-4xl md:text-5xl font-extrabold font-jetbrains text-foreground">
          <div className="ml-8 text-accent">{"\\\\.."}</div>
          <div>MOSES C. OKONKWO</div>
          <div className="ml-8 text-accent">{"..\\\\"}</div>
        </div>
        
        <div className="font-fira text-lg sm:text-xl border-b-2 border-accent pb-1 text-foreground font-semibold inline-block mt-4 drop-shadow-md">
          Software Engineer // Backend & AI Systems
        </div>

        <p className="font-mono text-sm md:text-base w-full lg:w-3/4 text-foreground font-medium leading-relaxed mt-6 drop-shadow-lg">
          Building scalable backend infrastructure and intelligent AI workflows. I specialize in system architecture, designing high-concurrency APIs, and integrating Large Language Models (LLMs) to engineer resilient, data-driven applications.
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

        <div className="flex gap-4">
          {resumeUrl && (
            <>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="font-jetbrains text-sm px-4 py-2 border-2 border-accent text-foreground font-bold hover:bg-accent hover:text-white transition-colors bg-background/50 backdrop-blur-sm drop-shadow-md">
                View Resume
              </a>
              <a href={`/api/download-resume?url=${encodeURIComponent(resumeUrl)}`} download="Moses_Okonkwo_Resume.pdf" className="font-jetbrains text-sm px-4 py-2 border border-foreground/50 text-foreground font-medium hover:bg-foreground hover:text-background transition-colors flex items-center gap-2 bg-background/30 backdrop-blur-sm drop-shadow-md">
                Extract Resume <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </a>
            </>
          )}
          <button className="font-jetbrains text-sm px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors font-bold bg-background/30 backdrop-blur-sm drop-shadow-md">
            <Link href="/project">View project</Link>
          </button>
        </div>
      </div>
    </div>
  )
}