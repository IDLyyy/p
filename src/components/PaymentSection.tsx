import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { Loader2, ShieldCheck, Crown, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { RegistrationData } from "@/components/RegistrationForm";

interface PaymentSectionProps {
  registrationData: RegistrationData;
  onSuccess: (orderId: string, status: string) => void;
  onBack: () => void;
}

// Midtrans Snap types
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const SNAP_SCRIPT_URL = "https://app.sandbox.midtrans.com/snap/snap.js";

const PaymentSection = ({ registrationData, onSuccess, onBack }: PaymentSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [snapReady, setSnapReady] = useState(false);

  const isVip = registrationData.ticketType === "vip";
  const amount = isVip ? WEBINAR_CONFIG.amountVip : WEBINAR_CONFIG.amountRegular;
  const priceLabel = isVip ? WEBINAR_CONFIG.priceVip : WEBINAR_CONFIG.priceRegular;

  const handlePay = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-midtrans-transaction", {
        body: { ...registrationData, amount },
      });
      if (error) throw error;
      if (!data?.token) throw new Error("Token Midtrans tidak diterima");

      if (!snapReady) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector(`script[src="${SNAP_SCRIPT_URL}"]`);
          if (existing) {
            setSnapReady(true);
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = SNAP_SCRIPT_URL;
          script.setAttribute("data-client-key", data.client_key);
          script.onload = () => {
            setSnapReady(true);
            resolve();
          };
          script.onerror = () => reject(new Error("Gagal memuat Midtrans"));
          document.body.appendChild(script);
        });
      }

      const orderId: string = data.order_id;

      const isPaid = (result: unknown): boolean => {
        const r = result as Record<string, string> | null;
        const status = r?.transaction_status;
        return status === "capture" || status === "settlement";
      };

      window.snap?.pay(data.token, {
        onSuccess: async (result: unknown) => {
          if (isPaid(result)) {
            await saveSheet(orderId, "PAID");
            toast.success("Pembayaran berhasil!");
            onSuccess(orderId, "PAID");
          } else {
            await saveSheet(orderId, "PENDING");
            toast("Pembayaran menunggu konfirmasi. Silakan selesaikan pembayaran.");
            setLoading(false);
          }
        },
        onPending: async () => {
          await saveSheet(orderId, "PENDING");
          toast("Pembayaran menunggu konfirmasi. Silakan selesaikan pembayaran.");
          setLoading(false);
        },
        onError: () => {
          toast.error("Pembayaran gagal");
          setLoading(false);
        },
        onClose: () => {
          toast("Anda menutup jendela pembayaran");
          setLoading(false);
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error(msg);
      setLoading(false);
    }
  };

  const saveSheet = async (orderId: string, status: string) => {
    try {
      await supabase.functions.invoke("save-to-google-sheet", {
        body: {
          ...registrationData,
          orderId,
          paymentStatus: status,
          amount,
        },
      });
    } catch (e) {
      console.error("Sheets save failed", e);
    }
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white min-h-screen flex items-center">
      <div className="container max-w-xl">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-elevated p-6 md:p-10">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Pembayaran</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ringkasan Pesanan
            </h2>
          </div>

          {/* Ticket badge */}
          <div className="flex justify-center mb-6">
            {isVip ? (
              <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-700">Paket VIP</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-600">Paket Reguler</span>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 mb-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nama</span>
              <span className="font-medium text-foreground">{registrationData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{registrationData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">WhatsApp</span>
              <span className="font-medium text-foreground">{registrationData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paket</span>
              <span className="font-medium text-foreground">{isVip ? "VIP" : "Reguler"}</span>
            </div>
            {registrationData.referralCode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kode Referral</span>
                <span className="font-medium text-foreground">{registrationData.referralCode}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary text-base">{priceLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mb-6">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Pembayaran aman melalui Midtrans
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 rounded-xl py-5"
              onClick={onBack}
              disabled={loading}
            >
              Kembali
            </Button>
            <Button
              variant="cta"
              size="lg"
              className="flex-1 rounded-xl py-5"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                "Bayar Sekarang"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
