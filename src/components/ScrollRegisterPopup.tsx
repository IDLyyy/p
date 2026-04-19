import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollRegisterPopupProps {
  onRegisterClick: () => void;
}

const DISMISS_KEY = "register_popup_dismissed";

const ScrollRegisterPopup = ({ onRegisterClick }: ScrollRegisterPopupProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      if (scrolled > threshold) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const handleRegister = () => {
    onRegisterClick();
    handleClose();
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-slide-up-glass">
      <div className="liquid-glass rounded-2xl p-4 md:p-5 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-accent/25 blur-2xl pointer-events-none" />

        <button
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute top-2 right-2 p-1.5 rounded-full text-foreground/60 hover:text-foreground hover:bg-white/40 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex items-center gap-3 md:gap-4">
          <div className="shrink-0 h-11 w-11 md:h-12 md:w-12 rounded-xl gradient-primary flex items-center justify-center shadow-card">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm md:text-base leading-tight">
              Kuota terbatas — daftar sekarang!
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 truncate">
              Amankan kursi webinar Anda hari ini.
            </p>
          </div>
          <Button
            variant="cta"
            size="sm"
            onClick={handleRegister}
            className="rounded-xl shrink-0 px-4"
          >
            Daftar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScrollRegisterPopup;
