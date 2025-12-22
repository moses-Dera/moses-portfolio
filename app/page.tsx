"use client";

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter, FaCertificate } from "react-icons/fa"


export default function Home(){
  return (
    <div className="h-[80vh] flex flex-col sm:flex-row md:flex-row lg:flex-row">
      <div className=" flex-2 sm:flex-2 md:flex-2 lg:flex-1 flex flex-col justify-end sm:justify-center items-start lg:items-start p-4 sm:p-4 gap-4"> 
        <span className=" h-fit sm:h-20 flex flex-col justify-center items-center text-lg sm:text-2xl font-extrabold font-jetbrains lg:text-left ">
          <div>\\..</div>
          <div>MOSES C. OKONKWO</div>
          <div>..\\</div>
          
        </span>
        <span className="font-fira border-b-2 border-double ">Full-stack Software Engineer</span>

        <span className="font-extralight text-sm w-2/3 font-mono  sm:text-sm text-left lg:text-left  lg:px-0  border-b-2 border-double">I build full-stack applications with robust backend systems and clean interfaces.
          Full-Stack Software Engineer specializing in APIs, databases, and modern frontend frameworks.___-_-___
        </span>
      </div>
      <div className="flex-1 p-5">
        {/* <div className="h-1/2"></div> */}
        <div className="h-full flex flex-col gap-4 justify-end items-end sm:items-end">
          <div className="flex gap-4">
            <a href="https://github.com/moses-Dera" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/m-chidera-okonkwo/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.credly.com/users/moses-okonkwo" target="_blank" rel="noopener noreferrer">
              <FaCertificate size={24} className="hover:scale-110 transition-transform" />
            </a>
            <a href="https://x.com/0x_moze" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="hover:scale-110 transition-transform" />
            </a>
          </div>
          <button className="font-bold p-1  border-2 hover:border-none 
          transition-transform
          clip-path: polygon(28% 0, 100% 0, 100% 35%, 100% 77%, 70% 100%, 0 100%, 0% 70%, 0 32%);
          ">
            <Link href="/project">View project</Link>
          </button>
        </div>
      </div>
    </div>
  )
}