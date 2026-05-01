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
    const count = 14;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 6,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.15,
        opacity: Math.random() * 0.4 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
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
      ctx.shadowBlur = 6;
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
        p.opacity += (Math.random() - 0.5) * 0.008;
        p.opacity = Math.max(0.08, Math.min(0.5, p.opacity));

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
  "Strategi Bisnis",
  "Prioritas Pertanyaan",
  "Sertifikat",
  "Background Khusus",
  "Tiket Webinar",
];

/* ─── Regular Benefits ─── */
const regularBenefits = [
  "Tiket Webinar",
  "Strategi Bisnis",
  "Sertifikat",
];

/* ─── Floating crypto/finance ornaments ─── */
const CryptoOrnaments = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
    {/* Chart icons */}
    <svg className="absolute top-[6%] left-[3%] w-10 h-10 text-yellow-500/20 animate-float-blob" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l4-4 4 4 4-8 6 6"/>
    </svg>
    <svg className="absolute top-[15%] right-[5%] w-12 h-12 text-green-400/15 animate-float-blob" style={{animationDelay:'3s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l4-4 4 4 4-8 6 6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 7l4 0 0 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    {/* Bitcoin circles */}
    <svg className="absolute top-[50%] left-[2%] w-10 h-10 text-yellow-500/15 animate-float-blob" style={{animationDelay:'5s'}} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 11.5V7.5H13C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5H11.5M11.5 11.5H13.5C14.33 11.5 15 12.17 15 13C15 13.83 14.33 14.5 13.5 14.5H11.5M11.5 11.5V14.5M11.5 7.5V6M11.5 7.5H10M11.5 14.5V16M11.5 14.5H10M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2S22 6.48 22 12S17.52 22 12 22Z"/>
    </svg>

    {/* Dollar signs */}
    <div className="absolute top-[70%] left-[8%] text-3xl text-green-400/12 animate-float-blob" style={{animationDelay:'6s'}}>$</div>
    <div className="absolute top-[30%] right-[3%] text-2xl text-green-400/12 animate-float-blob" style={{animationDelay:'2s'}}>$</div>

    {/* Gold coins */}
    <svg className="absolute bottom-[12%] left-[15%] w-9 h-9 text-yellow-500/12 animate-float-blob" style={{animationDelay:'7s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10l4-4 4 4"/>
    </svg>

    {/* Stock chart right side */}
    <svg className="absolute top-[8%] right-[15%] w-12 h-12 text-yellow-400/10 animate-float-blob" style={{animationDelay:'4s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 17l3-5 3 3 4-7"/>
    </svg>

    {/* Bitcoin bottom-right */}
    <svg className="absolute bottom-[8%] right-[5%] w-8 h-8 text-yellow-500/10 animate-float-blob" style={{animationDelay:'9s'}} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 11.5V7.5H13C13.83 7.5 14.5 8.17 14.5 9C14.5 9.83 13.83 10.5 13 10.5H11.5M11.5 11.5H13.5C14.33 11.5 15 12.17 15 13C15 13.83 14.33 14.5 13.5 14.5H11.5M11.5 11.5V14.5M11.5 7.5V6M11.5 7.5H10M11.5 14.5V16M11.5 14.5H10M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2S22 6.48 22 12S17.52 22 12 22Z"/>
    </svg>

    {/* Dollar → Bitcoin */}
    <div className="absolute bottom-[20%] left-[35%] text-sm text-yellow-500/10 animate-float-blob" style={{animationDelay:'10s'}}>
      <span className="text-green-400/15">$</span> → <span className="text-yellow-500/15">₿</span>
    </div>

    {/* Misc finance */}
    <svg className="absolute top-[40%] right-[10%] w-8 h-8 text-yellow-400/8 animate-float-blob" style={{animationDelay:'8s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M4 12h16M7 7l10 10M17 7l-10 10"/>
    </svg>

    {/* Gold bar icon */}
    <svg className="absolute bottom-[35%] right-[25%] w-10 h-10 text-amber-400/10 animate-float-blob" style={{animationDelay:'11s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="14" width="18" height="6" rx="1"/><rect x="5" y="8" width="14" height="6" rx="1"/><rect x="7" y="2" width="10" height="6" rx="1"/>
    </svg>
  </div>
);

const PricingSection = ({ onRegisterClick }: PricingSectionProps) => {
  const vipCanvasRef = useRef<HTMLCanvasElement>(null);
  const regCanvasRef = useRef<HTMLCanvasElement>(null);

  useParticleCanvas(vipCanvasRef, "crown", "#FFD700");
  useParticleCanvas(regCanvasRef, "star", "#9ca3af");

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      <CryptoOrnaments />

      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-yellow-400">
            Paket Pendaftaran
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Pilih Paket yang Sesuai
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* ═══════════ TIKET VIP — gold border like sss1.png ═══════════ */}
          <div className="relative group">
            <canvas
              ref={vipCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-2xl"
            />

            {/* Gold border glow */}
            <div className="absolute -inset-[2px] rounded-2xl animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, #d4a017, #f0c040, #d4a017)",
                opacity: 0.7,
                filter: "blur(2px)",
              }}
            />

            {/* Card inner */}
            <div className="relative rounded-2xl overflow-hidden z-[5]"
              style={{
                background: "#1a1a1a",
                border: "2px solid #d4a017",
              }}
            >
              {/* Inner gold border accent */}
              <div className="mx-4 mt-4 mb-2 rounded-xl border border-yellow-600/40 px-4 py-2 text-center">
                <span className="font-bold text-lg" style={{ color: "#f0c040" }}>Tiket Vip</span>
              </div>

              <div className="p-6 pt-3 space-y-4">
                {vipBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-yellow-400 font-bold mt-0.5">•</span>
                    <span className="font-semibold text-white text-base">-{b}</span>
                  </div>
                ))}

                <div className="pt-4">
                  <Button
                    onClick={onRegisterClick}
                    className="w-full py-5 rounded-lg text-base font-bold transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: "2px solid #d4a017",
                      color: "#f0c040",
                    }}
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ TIKET REGULER — gray border like sss1.png ═══════════ */}
          <div className="relative group">
            <canvas
              ref={regCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-2xl"
            />

            {/* Gray border glow */}
            <div className="absolute -inset-[2px] rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #6b7280, #9ca3af, #6b7280)",
                opacity: 0.4,
                filter: "blur(2px)",
              }}
            />

            {/* Card inner */}
            <div className="relative rounded-2xl overflow-hidden z-[5]"
              style={{
                background: "#1a1a1a",
                border: "2px solid #6b7280",
              }}
            >
              {/* Inner gray border accent */}
              <div className="mx-4 mt-4 mb-2 rounded-xl border border-gray-500/40 px-4 py-2 text-center">
                <span className="font-bold text-lg text-gray-300">Tiket Reguler</span>
              </div>

              <div className="p-6 pt-3 space-y-4">
                {regularBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-gray-400 font-bold mt-0.5">•</span>
                    <span className="font-semibold text-white text-base">-{b}</span>
                  </div>
                ))}

                <div className="pt-4">
                  <Button
                    onClick={onRegisterClick}
                    className="w-full py-5 rounded-lg text-base font-bold transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: "2px solid #6b7280",
                      color: "#d1d5db",
                    }}
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
