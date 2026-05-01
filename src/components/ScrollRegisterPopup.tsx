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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-elevated p-4 relative">
        <button
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="shrink-0 h-10 w-10 rounded-xl gradient-cta flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm leading-tight">
              Kuota terbatas — daftar sekarang!
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              Amankan kursi webinar Anda hari ini.
            </p>
          </div>
          <Button
            variant="cta"
            size="sm"
            onClick={handleRegister}
            className="rounded-lg shrink-0 px-4 text-xs"
          >
            Daftar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScrollRegisterPopup;
