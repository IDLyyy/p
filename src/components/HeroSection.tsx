import { CalendarDays, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";
import marverLogo from "@/assets/marver.jpg";
import logoIsyKarima from "@/assets/logo-isy-karima.jpg";
import bgImage from "@/assets/bg1.jpg";
import pakMulyono from "@/assets/Pak_Mulyono.png";
import pakSyhab from "@/assets/pak_syhab.png";
import PricingSection from "@/components/PricingSection";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const speakers = [
  {
    name: "Abah Mulyono",
    title: "CEO PT Turrima Agro Mas",
    photo: pakMulyono,
    desc: "Seorang pengusaha visioner asal Sragen yang berhasil membangun bisnis pupuk organik hingga menembus pasar internasional seperti Afrika dan Timur Tengah. Dengan pengalaman puluhan tahun, beliau dikenal mampu mengembangkan usaha dari nol hingga skala ekspor, serta menghadapi tantangan bisnis global dengan strategi yang tepat dan berkelanjutan.",
  },
  {
    name: "KH Syihabuddin Abdul Mu'iz",
    title: "Pimpinan Ma'had Tahfizhul Qur'an Isy Karima",
    photo: pakSyhab,
    desc: "Seorang ulama dan pendidik Al-Qur'an yang berpengaruh dalam membina generasi muda. Dikenal dengan penyampaian yang mendalam dan relevan, beliau mengajarkan pentingnya membangun mindset sukses yang seimbang antara spiritualitas dan kehidupan dunia, khususnya dalam menjalankan usaha dan menjaga istiqomah.",
  },
];

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <>
      {/* ═══════════ SLIDE 1: HERO ═══════════ */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Azure → Navy Blue gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #007FFF 0%, #1a56db 30%, #1e3a8a 60%, #0a1e5e 85%, #091540 100%)",
          }}
        />

        {/* bg1.jpg overlay with blend */}
        <div
          className="absolute inset-0 z-[1] opacity-25"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(210,100%,60%,0.2)] blur-[120px] animate-float-blob pointer-events-none z-[2]" />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(220,100%,40%,0.18)] blur-[100px] animate-float-blob pointer-events-none z-[2]"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[hsl(200,80%,50%,0.12)] blur-[80px] animate-float-blob pointer-events-none z-[2]"
          style={{ animationDelay: "8s" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-[3]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Logos - top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2">
          <img src={marverLogo} alt="Marver" className="h-8 w-8 md:h-10 md:w-10 rounded-lg object-cover" />
          <img src={logoIsyKarima} alt="ISY Karima" className="h-8 w-8 md:h-10 md:w-10 rounded-lg object-cover" />
        </div>

        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full liquid-glass-dark px-4 py-1.5 text-sm font-medium text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Pendaftaran Dibuka
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-gradient-hero">{WEBINAR_CONFIG.title}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              {WEBINAR_CONFIG.subtitle}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-base text-white/80">
              <div className="flex items-center gap-2 liquid-glass-dark px-4 py-2 rounded-full">
                <CalendarDays className="h-4 w-4 text-cyan-400" />
                {WEBINAR_CONFIG.date}
              </div>
              <div className="flex items-center gap-2 liquid-glass-dark px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-cyan-400" />
                {WEBINAR_CONFIG.time}
              </div>
              <div className="flex items-center gap-2 liquid-glass-dark px-4 py-2 rounded-full">
                <User className="h-4 w-4 text-cyan-400" />
                {WEBINAR_CONFIG.speaker}
              </div>
            </div>

            {/* CTA */}
            <Button variant="cta" size="lg" className="text-base md:text-lg px-8 py-6 rounded-xl shadow-[0_0_30px_hsl(210,100%,50%,0.4)]" onClick={onRegisterClick}>
              Daftar Sekarang
            </Button>
          </div>
        </div>

        {/* Wave bottom decoration */}
        <svg
          aria-hidden
          className="absolute bottom-0 left-0 w-full pointer-events-none z-[4]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            fill="#0a1e5e"
            d="M0,120 C80,80 160,160 240,120 C320,80 400,160 480,120 C560,80 640,160 720,120 C800,80 880,160 960,120 C1040,80 1120,160 1200,120 C1280,80 1360,160 1440,120 L1440,200 L0,200 Z"
            opacity="0.5"
          />
          <path
            fill="#0e2463"
            d="M0,160 C100,130 200,180 300,160 C400,130 500,180 600,160 C700,130 800,180 900,160 C1000,130 1100,180 1200,160 C1300,130 1400,180 1440,160 L1440,200 L0,200 Z"
          />
        </svg>
      </section>

      {/* ═══════════ SLIDE 2: SPEAKERS ═══════════ */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0e2463 0%, #132e6e 30%, #1a3a7a 60%, #0a1e5e 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[hsl(210,100%,50%,0.06)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-[hsl(220,90%,40%,0.06)] blur-[80px] pointer-events-none" />

        <div className="container max-w-5xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-3">
            Pembicara
          </h2>
          <p className="text-center text-blue-200/60 mb-12 max-w-lg mx-auto">
            Belajar langsung dari para ahli di bidangnya
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {speakers.map((speaker, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden border border-blue-400/20 hover:border-blue-400/40 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(26,54,138,0.8) 0%, rgba(15,30,80,0.9) 100%)",
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-400/20 via-cyan-400/10 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-[1] p-6 md:p-8 flex flex-col items-center text-center space-y-4">
                  {/* Photo */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/40 blur-md opacity-60" />
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-blue-300/30 shadow-lg"
                    />
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {speaker.name}
                    </h3>
                    <p className="text-sm md:text-base text-cyan-300 font-semibold mt-1">
                      {speaker.title}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-blue-100/70 leading-relaxed max-w-md">
                    {speaker.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave transition to pricing */}
        <svg
          aria-hidden
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#111111"
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 C1300,80 1380,40 1440,60 L1440,120 L0,120 Z"
            opacity="0.8"
          />
          <path
            fill="#0d0d0d"
            d="M0,80 C150,110 350,50 500,80 C700,110 900,50 1100,80 C1250,100 1380,60 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </section>

      {/* ═══════════ SLIDE 3: Pricing Section with VIP & Regular ═══════════ */}
      <PricingSection onRegisterClick={onRegisterClick} />
    </>
  );
};

export default HeroSection;
