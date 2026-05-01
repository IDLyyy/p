import { useEffect, useRef } from "react";
import { CheckCircle2, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onRegisterClick: () => void;
}

/* ─── Particle types ─── */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

/* ─── Canvas particle renderer ─── */
const useParticleCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  type: "crown" | "star",
  color: string
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 6,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.6 - 0.2,
        opacity: Math.random() * 0.5 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const drawCrown = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("👑", 0, 0);
      ctx.restore();
    };

    const drawStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      const spikes = 5;
      const outerR = p.size;
      const innerR = p.size / 2;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI / spikes) * i - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        if (type === "crown") drawCrown(p);
        else drawStar(p);

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity += (Math.random() - 0.5) * 0.01;
        p.opacity = Math.max(0.1, Math.min(0.6, p.opacity));

        if (p.y < -20) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, type, color]);
};

/* ─── VIP Benefits ─── */
const vipBenefits = [
  "Background khusus",
  "E-Sertifikat",
  "Prioritas pertanyaan",
  "Rekaman Zoom",
  "Grup khusus terpisah",
];

/* ─── Regular Benefits ─── */
const regularBenefits = [
  "Background peserta",
  "E-Sertifikat",
  "Grup khusus",
];

/* ─── Floating crypto/gold ornaments SVG ─── */
const CryptoOrnaments = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
    {/* Bitcoin symbols */}
    <svg className="absolute top-[8%] left-[3%] w-10 h-10 text-yellow-500/15 animate-float-blob" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 11.5V7.5H13C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5H11.5M11.5 11.5H13.5C14.33 11.5 15 12.17 15 13C15 13.83 14.33 14.5 13.5 14.5H11.5M11.5 11.5V14.5M11.5 7.5V6M11.5 7.5H10M11.5 14.5V16M11.5 14.5H10M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2S22 6.48 22 12S17.52 22 12 22Z"/>
    </svg>
    <svg className="absolute top-[20%] right-[8%] w-8 h-8 text-yellow-400/12 animate-float-blob" style={{animationDelay:'3s'}} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 11.5V7.5H13C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5H11.5M11.5 11.5H13.5C14.33 11.5 15 12.17 15 13C15 13.83 14.33 14.5 13.5 14.5H11.5M11.5 11.5V14.5M11.5 7.5V6M11.5 7.5H10M11.5 14.5V16M11.5 14.5H10M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2S22 6.48 22 12S17.52 22 12 22Z"/>
    </svg>
    {/* Dollar signs */}
    <div className="absolute top-[60%] left-[6%] text-3xl text-green-400/10 animate-float-blob" style={{animationDelay:'6s'}}>$</div>
    <div className="absolute top-[35%] right-[4%] text-2xl text-green-400/10 animate-float-blob" style={{animationDelay:'2s'}}>$</div>
    {/* Gold coins / chart icons */}
    <svg className="absolute bottom-[15%] left-[12%] w-10 h-10 text-yellow-500/12 animate-float-blob" style={{animationDelay:'5s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"/>
    </svg>
    <svg className="absolute top-[10%] left-[45%] w-8 h-8 text-amber-400/10 animate-float-blob" style={{animationDelay:'7s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l4-4 4 4 4-8 6 6"/>
    </svg>
    <svg className="absolute bottom-[25%] right-[10%] w-9 h-9 text-yellow-400/10 animate-float-blob" style={{animationDelay:'9s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 17l3-5 3 3 4-7"/>
    </svg>
    {/* Ethereum */}
    <svg className="absolute bottom-[8%] right-[30%] w-7 h-7 text-blue-300/10 animate-float-blob" style={{animationDelay:'4s'}} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM12 22.25l-6.25-8.5L12 17.5l6.25-3.75L12 22.25z"/>
    </svg>
    <div className="absolute top-[50%] left-[30%] text-xl text-yellow-500/8 animate-float-blob" style={{animationDelay:'10s'}}>₿</div>
    <div className="absolute top-[75%] right-[20%] text-lg text-amber-400/8 animate-float-blob" style={{animationDelay:'8s'}}>💰</div>
  </div>
);

const PricingSection = ({ onRegisterClick }: PricingSectionProps) => {
  const vipCanvasRef = useRef<HTMLCanvasElement>(null);
  const regCanvasRef = useRef<HTMLCanvasElement>(null);

  useParticleCanvas(vipCanvasRef, "crown", "#FFD700");
  useParticleCanvas(regCanvasRef, "star", "#C0C0C0");

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)",
      }}
    >
      {/* Crypto ornaments background */}
      <CryptoOrnaments />

      {/* Background ornaments */}
      <div className="absolute inset-0 pointer-events-none z-[0]">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[hsl(45,100%,50%,0.04)] blur-[80px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-[hsl(221,83%,53%,0.04)] blur-[80px]" />
      </div>

      <div className="container max-w-5xl relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-3">
          Pilih Paket Pendaftaran
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-lg mx-auto">
          Pilih paket yang sesuai dengan kebutuhan Anda
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* ═══════════ VIP CARD ═══════════ */}
          <div className="relative group order-2 md:order-1">
            {/* Particle canvas */}
            <canvas
              ref={vipCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-2xl"
            />

            {/* Glow border */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 opacity-60 blur-sm group-hover:opacity-90 transition-opacity duration-500 animate-pulse-glow" />

            {/* Card */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#1a1505] via-[#1c1a0e] to-[#0f0d05] border border-yellow-500/30 overflow-hidden z-[5]">
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none animate-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 30%, rgba(255,215,0,0.15) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Floating glow orbs */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-yellow-500/10 blur-xl animate-float-blob" />
              <div className="absolute bottom-8 left-4 w-16 h-16 rounded-full bg-amber-500/10 blur-lg animate-float-blob" style={{ animationDelay: "3s" }} />

              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 px-3 py-1 rounded-full">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                    VIP
                  </span>
                </div>
                <span className="text-xs text-yellow-500/60 font-medium">
                  ★ TERBATAS
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                    Rp 75.000
                  </span>
                </div>
                <p className="text-yellow-500/50 text-sm mt-1">per orang</p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {vipBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-yellow-100/80">{b}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                onClick={onRegisterClick}
                className="w-full py-6 rounded-xl text-base font-bold bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
              >
                <Crown className="h-5 w-5 mr-2" />
                Daftar VIP Sekarang
              </Button>
            </div>
          </div>

          {/* ═══════════ REGULAR CARD ═══════════ */}
          <div className="relative group order-1 md:order-2">
            {/* Particle canvas */}
            <canvas
              ref={regCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-2xl"
            />

            {/* Glow border */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500 opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-500" />

            {/* Card */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#0d0f14] via-[#111520] to-[#0a0c12] border border-slate-500/20 overflow-hidden z-[5]">
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none animate-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 30%, rgba(192,192,192,0.12) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Floating glow orbs */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-slate-400/8 blur-xl animate-float-blob" />
              <div className="absolute bottom-6 left-4 w-12 h-12 rounded-full bg-blue-400/6 blur-lg animate-float-blob" style={{ animationDelay: "5s" }} />

              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 bg-slate-500/15 border border-slate-500/25 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-slate-300" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Reguler
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-400">
                    Rp 50.000
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1">per orang</p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {regularBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300/80">{b}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                onClick={onRegisterClick}
                className="w-full py-6 rounded-xl text-base font-bold bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-500 hover:to-gray-600 text-white shadow-[0_0_20px_rgba(148,163,184,0.15)] hover:shadow-[0_0_30px_rgba(148,163,184,0.25)] transition-all duration-300"
              >
                <Star className="h-5 w-5 mr-2" />
                Daftar Reguler
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
