"use client"
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Footer() {
    const [isDark, setIsDark] = useState(true); // Default assuming prefers-color-scheme dark

    useEffect(() => {
        // On mount, check if there's a stored preference or system preference
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light") {
            setIsDark(false);
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        } else if (storedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            // Check system preference
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDark(systemPrefersDark);
            if (systemPrefersDark) {
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
            } else {
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <footer className="fixed bottom-0 w-full p-4 text-center flex justify-between items-center border-t border-border bg-background/80 backdrop-blur-md z-50">
            <div className="flex-1"></div> {/* Spacer for centering */}
            <p className="font-fira text-sm text-foreground/70">&copy; {new Date().getFullYear()} MOZ. All rights reserved.</p>
            <div className="flex-1 flex justify-end pr-4">
                <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-full border border-border hover:bg-white/10 transition-colors flex items-center justify-center text-foreground"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
            </div>
        </footer>
    )
}