import Link from 'next/link';
import { FaTerminal } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative z-10 px-4">
      <div className="relative mb-8 text-center flex flex-col items-center">
        <h1 className="text-8xl md:text-[150px] font-jetbrains font-extrabold text-foreground/5 select-none leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl md:text-5xl font-jetbrains font-bold text-(--color-accent) bg-background/50 px-4 py-2 backdrop-blur-sm">
            {"//"} SYSTEM_FAULT
          </span>
        </div>
      </div>

      <div className="max-w-xl text-center space-y-8 flex flex-col items-center">
        <div className="border-l-4 border-(--color-accent) pl-6 text-left inline-block bg-foreground/5 p-6 shadow-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
          <p className="font-mono text-foreground/80 text-sm md:text-base mb-2 flex items-center gap-2">
            <span className="text-red-500 animate-pulse font-bold">● ERR_NOT_FOUND</span> 
          </p>
          <p className="font-mono text-foreground/70 text-sm md:text-base leading-relaxed">
            The requested architecture node could not be resolved in the current environment configuration. The sector may have been re-routed or decommissioned.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 hover:bg-(--color-accent) hover:text-white transition-all font-jetbrains font-bold uppercase text-sm tracking-widest border border-border group"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            <FaTerminal className="text-(--color-accent) group-hover:text-white transition-colors" />
            INITIALIZE_REDIRECTION
          </Link>
        </div>
      </div>
    </div>
  );
}
