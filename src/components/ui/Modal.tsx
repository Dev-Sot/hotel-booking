"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalProps } from "@/types";
import Icon from "./Icon";

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-ink-800 p-8 text-sand shadow-2xl shadow-black/70 sm:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-sand-muted transition hover:text-white"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            {title && (
              <>
                <span className="hairline mb-5 block" />
                <h3 className="mb-6 pr-8 text-3xl leading-tight">{title}</h3>
              </>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
