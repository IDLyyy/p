import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Star } from "lucide-react";

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  background: string;
  referralCode: string;
  ticketType: "vip" | "regular";
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [form, setForm] = useState<RegistrationData>({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    background: "",
    referralCode: "",
    ticketType: "regular",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = "Nama lengkap wajib diisi";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email tidak valid";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Nomor WhatsApp tidak valid";
    if (!form.profession.trim()) e.profession = "Profesi wajib diisi";
    if (!form.background.trim()) e.background = "Latar belakang wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const update = (field: keyof RegistrationData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="registration-form" className="py-16 md:py-24">
      <div className="container max-w-2xl">
        <div className="liquid-glass-card rounded-2xl shadow-elevated p-6 md:p-10 animate-scale-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Formulir Pendaftaran
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Isi data diri Anda untuk mendaftar webinar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Ticket Type */}
            <div className="space-y-2">
              <Label htmlFor="ticketType">Pilih Paket</Label>
              <Select value={form.ticketType} onValueChange={(v) => update("ticketType", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">
                    <span className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      VIP — Rp 75.000
                    </span>
                  </SelectItem>
                  <SelectItem value="regular">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-slate-400" />
                      Reguler — Rp 50.000
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input id="fullName" placeholder="Masukkan nama lengkap" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input id="email" type="email" placeholder="contoh@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            {/* Profession */}
            <div className="space-y-2">
              <Label htmlFor="profession">Profesi</Label>
              <Input id="profession" placeholder="Tuliskan profesi Anda" value={form.profession} onChange={(e) => update("profession", e.target.value)} />
              {errors.profession && <p className="text-sm text-destructive">{errors.profession}</p>}
            </div>

            {/* Background */}
            <div className="space-y-2">
              <Label htmlFor="background">Latar Belakang</Label>
              <Textarea id="background" placeholder="Ceritakan pendidikan atau pengalaman Anda yang relevan..." rows={3} value={form.background} onChange={(e) => update("background", e.target.value)} />
              {errors.background && <p className="text-sm text-destructive">{errors.background}</p>}
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <Label htmlFor="referralCode">Kode Referral <span className="text-muted-foreground text-xs">(opsional)</span></Label>
              <Input id="referralCode" placeholder="Masukkan kode referral jika ada" value={form.referralCode} onChange={(e) => update("referralCode", e.target.value.toUpperCase())} />
            </div>

            <Button type="submit" variant="cta" size="lg" className="w-full text-base rounded-xl py-6">
              Lanjut ke Pembayaran
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
