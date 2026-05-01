import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { CheckCircle2, MessageCircle, CalendarDays, Clock, Ticket } from "lucide-react";

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
    <section className="min-h-screen flex items-center justify-center py-16 bg-white">
      <div className="container max-w-md text-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-elevated p-8 md:p-10 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Pendaftaran Berhasil! 🎉
            </h1>
            <p className="text-sm text-muted-foreground">
              Terima kasih telah mendaftar <strong className="text-foreground">{WEBINAR_CONFIG.title}</strong>
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-foreground space-y-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{WEBINAR_CONFIG.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{WEBINAR_CONFIG.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-muted-foreground" />
              <span>Paket {ticketType === "vip" ? "VIP" : "Reguler"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Anda akan dialihkan ke grup WhatsApp dalam{" "}
              <strong className="text-primary">{countdown} detik</strong>
            </p>
            <Button
              variant="cta"
              size="lg"
              className="w-full rounded-xl py-5 text-sm gap-2"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <MessageCircle className="h-4 w-4" />
              Gabung Grup WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
