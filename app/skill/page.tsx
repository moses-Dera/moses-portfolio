"use client"
import { motion } from "framer-motion";

export default function Skill(){
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen p-8 flex flex-col gap-10"
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold font-jetbrains text-center mb-12"
                >
                    Skills & Expertise
                </motion.h1>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="backdrop-blur-sm border rounded-lg p-6 hover:bg-white/10 transition-all" 
                        style={{
                            backgroundColor: 'var(--color-border)', 
                            borderColor: 'var(--color-border)',
                            clipPath: 'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))'
                        }}
                    >
                        <h2 className="text-xl font-bold font-jetbrains mb-4">Full-Stack Engineering</h2>
                        <p className="mb-4 text-sm leading-relaxed" style={{color: 'var(--color-text)'}}>
                            Designing and building complete applications—from backend systems to modern user interfaces.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-300/10 text-blue-800 rounded-full text-xs font-mono">Python</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-800 rounded-full text-xs font-mono">FastAPI</span>
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-800 rounded-full text-xs font-mono">Node.js</span>
                            <span className="px-3 py-1 bg-gray-300/10 text-gray-800 rounded-full text-xs font-mono">Express</span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-800 rounded-full text-xs font-mono">React</span>
                            <span className="px-3 py-1 bg-gray-500/20 text-gray-800 rounded-full text-xs font-mono">Next.js</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="backdrop-blur-sm border rounded-lg p-6 hover:bg-white/10 transition-all" 
                        style={{
                            backgroundColor: 'var(--color-border)', 
                            borderColor: 'var(--color-border)',
                            clipPath: 'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))'
                        }}
                    >
                        <h2 className="text-xl font-bold font-jetbrains mb-4">DevOps & Deployment</h2>
                        <p className="mb-4 text-sm leading-relaxed" style={{color: 'var(--color-text)'}}>
                            Shipping applications to production with automated deployment and environment configuration.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-yellow-100/10 text-yellow-800 rounded-full text-xs font-mono">Serverless</span>
                            <span className="px-3 py-1 bg-blue-200/10 text-blue-800 rounded-full text-xs font-mono">Docker</span>
                            <span className="px-3 py-1 bg-purple-200/50 text-purple-800 rounded-full text-xs font-mono">CI/CD</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="backdrop-blur-sm border rounded-lg p-6 hover:bg-white/10 transition-all" 
                        style={{
                            backgroundColor: 'var(--color-border)', 
                            borderColor: 'var(--color-border)',
                            clipPath: 'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))'
                        }}
                    >
                        <h2 className="text-xl font-bold font-jetbrains mb-4">Security-First Development</h2>
                        <p className="mb-4 text-sm leading-relaxed" style={{color: 'var(--color-text)'}}>
                            Applying secure coding practices and system design principles throughout the development lifecycle.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/20 text-red-800 rounded-full text-xs font-mono">Auth</span>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-800 rounded-full text-xs font-mono">OWASP</span>
                            <span className="px-3 py-1 bg-indigo-200/20 text-indigo-800 rounded-full text-xs font-mono">Access Control</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="h-50 flex flex-row justify-center items-center overflow-hidden"
            >
                <div className="p-4 px-15 border-2 border-solid rounded-tr-2xl rounded-bl-2xl font-jetbrains text-2xl font-bold transition-transform animate-pulse">
                    <a href="https://docs.google.com/document/d/e/2PACX-1vSOShDb0gpP72mjfOVAZn_Ihv3YII7O3IdCmaVAu_ppQLF00ZbXJ7KrTx-hCTLJvNhVSDyfARtrV2vj/pub" target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </div>
            </motion.div>
        </motion.div>
    )
}