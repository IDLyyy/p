import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { CheckCircle2, MessageCircle } from "lucide-react";

interface SuccessPageProps {
  ticketType?: "vip" | "regular";
}

const SuccessPage = ({ ticketType = "regular" }: SuccessPageProps) => {
  const [countdown, setCountdown] = useState(10);

  const whatsappLink =
    ticketType === "vip"
      ? WEBINAR_CONFIG.whatsappGroupLinkVip
      : WEBINAR_CONFIG.whatsappGroupLinkRegular;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open(whatsappLink, "_blank");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [whatsappLink]);

  return (
    <section className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-lg text-center animate-scale-in">
        <div className="liquid-glass-card rounded-2xl shadow-elevated p-8 md:p-12 space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Pendaftaran Berhasil! 🎉
          </h1>

          <p className="text-muted-foreground">
            Terima kasih telah mendaftar <strong className="text-foreground">{WEBINAR_CONFIG.title}</strong>. 
            Bukti pembayaran Anda sedang kami verifikasi.
          </p>

          <div className="rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
            <p>📅 {WEBINAR_CONFIG.date}</p>
            <p>🕐 {WEBINAR_CONFIG.time}</p>
            <p>🎫 Paket: {ticketType === "vip" ? "VIP" : "Reguler"}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Anda akan dialihkan ke grup WhatsApp {ticketType === "vip" ? "VIP" : "Reguler"} dalam <strong className="text-primary">{countdown} detik</strong>...
            </p>
            <Button
              variant="cta"
              size="lg"
              className="w-full rounded-xl py-6 text-base gap-2"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <MessageCircle className="h-5 w-5" />
              Gabung Grup WhatsApp Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
