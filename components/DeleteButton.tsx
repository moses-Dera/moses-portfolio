"use client";

import { useTransition, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

export function DeleteButton({ id, onDelete, className, children }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    startTransition(async () => {
      await onDelete(id);
    });
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setShowConfirm(true)} 
        disabled={isPending}
        className={className || "text-red-500 hover:text-red-400 font-mono text-xs border border-red-500/30 px-2 py-1 bg-red-500/10 shrink-0 disabled:opacity-50"}
      >
        {isPending ? "DELETING..." : (children || "DELETE")}
      </button>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-red-500/30 p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)] max-w-md w-full text-left"
            >
              <h3 className="text-xl font-jetbrains font-bold text-red-500 mb-2">{"// SYSTEM_WARNING"}</h3>
              <p className="text-foreground/70 font-mono text-sm mb-6 leading-relaxed">
                Are you absolutely sure you want to delete this record? This action is permanent and cannot be undone.
              </p>
              
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 font-mono text-xs border border-border/40 text-foreground hover:bg-foreground/10 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 font-mono text-xs font-bold border border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors"
                >
                  CONFIRM.DELETE()
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
