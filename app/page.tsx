"use client";

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa"


export default function Home(){
  return (
    <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-8 items-stretch justify-center min-h-[80vh] relative">
      
      {/* LEFT COLUMN: Title and Description */}
      <div className="flex-1 flex flex-col justify-center items-start gap-4 z-10"> 
        <div className="flex flex-col text-2xl sm:text-4xl md:text-5xl font-extrabold font-jetbrains text-white">
          <div className="ml-8">{"\\\\.."}</div>
          <div>MOSES C. OKONKWO</div>
          <div className="ml-8">{"..\\\\"}</div>
        </div>
        
        <div className="font-fira text-lg sm:text-xl border-b border-white pb-1 text-white inline-block mt-4">
          Full-stack Software Engineer
        </div>

        <p className="font-mono text-sm md:text-base w-full lg:w-3/4 text-zinc-400 leading-relaxed mt-4">
          I build full-stack applications with robust backend systems and clean interfaces. Full-Stack Software Engineer specializing in APIs, databases, and modern frontend frameworks.<span className="tracking-widest ml-2">---.-.---</span>
        </p>
      </div>

      {/* RIGHT COLUMN: Socials and Button (Bottom Right) */}
      <div className="flex-1 flex flex-col justify-end items-end z-10 pb-4">
        
        <div className="flex gap-5 mb-4">
          <a href="https://github.com/moses-Dera" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-400 transition-colors">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/m-chidera-okonkwo/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-400 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.credly.com/users/moses-okonkwo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-400 transition-colors">
            <FaCertificate size={24} />
          </a>
          <a href="https://x.com/0x_moze" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-400 transition-colors">
            <FaTwitter size={24} />
          </a>
        </div>

        <button className="font-jetbrains text-sm px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors">
          <Link href="/project">View project</Link>
        </button>

      </div>
    </div>
  )
}