export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full p-4 text-center flex justify-center items-center border-t border-white/20 bg-[#050a15]/80 backdrop-blur-md z-50">
            <p className=" font-fira text-sm text-zinc-400">&copy; {new Date().getFullYear()} MOZ. All rights reserved.</p>
        </footer>
    )
}