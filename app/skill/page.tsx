"use client"
import { motion } from "framer-motion";

export default function Skill(){
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen p-8 flex flex-col gap-10 overflow-x-hidden relative z-10"
        >
            <div className="w-full flex justify-end mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-jetbrains font-extrabold text-accent text-right"
                >
                    SKILLS{" //"}
                </motion.h1>
            </div>
                
            <div className="flex flex-col gap-32 relative w-full">
                    
                    {/* SKILL 01 - LEFT */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-start text-left w-full max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-accent font-bold text-xl font-jetbrains">01</span>
                            <div className="w-16 h-[1px] bg-border"></div>
                        </div>
                        <h2 className="text-3xl font-bold font-jetbrains mb-4 text-foreground hover:text-(--color-accent) transition-colors">System Architecture & Backend Engineering</h2>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/70">
                            Architecting high-concurrency distributed systems and resilient microservices. I specialize in designing scalable RESTful APIs, implementing robust message queues, and optimizing complex database interactions to handle intensive data loads across enterprise platforms.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
                            <img src="https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" />
                            <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
                            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
                            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
                            <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity" />
                            <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
                            <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
                            <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
                            <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                            <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
                            <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
                            <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
                        </div>
                    </motion.div>

                    {/* SKILL 02 - RIGHT */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-end text-right w-full max-w-3xl self-end"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-[1px] bg-border"></div>
                            <span className="text-accent font-bold text-xl font-jetbrains">02</span>
                        </div>
                        <h2 className="text-3xl font-bold font-jetbrains mb-4 text-foreground hover:text-green-400 transition-colors">Cloud Infrastructure & DevOps</h2>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/70">
                            Transitioning legacy applications into cost-optimized, zero-downtime serverless environments. I manage containerized architectures, orchestrate seamless CI/CD pipelines, and deploy highly available infrastructure on Google Cloud Platform and Cloudflare edge networks.
                        </p>
                        <div className="flex flex-wrap justify-end gap-2">
                            <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
                            <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="GoogleCloud" />
                            <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
                            <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
                            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
                            <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
                            <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
                        </div>
                    </motion.div>

                    {/* SKILL 03 - LEFT */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-start text-left w-full max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-accent font-bold text-xl font-jetbrains">03</span>
                            <div className="w-16 h-[1px] bg-border"></div>
                        </div>
                        <h2 className="text-3xl font-bold font-jetbrains mb-4 text-foreground hover:text-orange-400 transition-colors">Enterprise Security & Access Control</h2>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/70">
                            Building strict security layers utilizing Zero Trust Network Access (ZTNA). I implement rigid role-based access control (RBAC), secure JWT authentication flows, and deploy mandatory API security headers to safeguard sensitive telemetry and user data.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
                            <img src="https://img.shields.io/badge/Zero_Trust_(ZTNA)-4A4A4A?style=for-the-badge" alt="Zero Trust (ZTNA)" />
                            <img src="https://img.shields.io/badge/RBAC-4A4A4A?style=for-the-badge" alt="RBAC" />
                            <img src="https://img.shields.io/badge/API_Security-4A4A4A?style=for-the-badge" alt="API Security" />
                        </div>
                    </motion.div>

                    {/* SKILL 04 - RIGHT */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-end text-right w-full max-w-3xl self-end"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-[1px] bg-border"></div>
                            <span className="text-accent font-bold text-xl font-jetbrains">04</span>
                        </div>
                        <h2 className="text-3xl font-bold font-jetbrains mb-4 text-foreground hover:text-purple-400 transition-colors">AI / LLM Integration</h2>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/70">
                            Engineering intelligent workflows by integrating Large Language Models and AI toolchains. I build context-aware AI operations, predictive analysis features, and specialized RAG pipelines to automate complex business processes.
                        </p>
                        <div className="flex flex-wrap justify-end gap-2">
                            <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
                            <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
                            <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
                            <img src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" />
                        </div>
                    </motion.div>
                </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-16 flex flex-row justify-end items-center"
            >
                <a 
                    href="https://docs.google.com/document/d/e/2PACX-1vSOShDb0gpP72mjfOVAZn_Ihv3YII7O3IdCmaVAu_ppQLF00ZbXJ7KrTx-hCTLJvNhVSDyfARtrV2vj/pub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-accent/10 border border-accent/30 text-accent font-jetbrains font-bold text-lg transition-all hover:bg-accent hover:text-white hover:border-accent shadow-[0_0_20px_rgba(79,70,229,0.15)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
                >
                    <span className="tracking-widest">{"//"} EXTRACT_RESUME</span>
                    <span className="font-mono transition-transform duration-300 group-hover:translate-x-2">{"->"}</span>
                </a>
            </motion.div>
        </motion.div>
    )
}