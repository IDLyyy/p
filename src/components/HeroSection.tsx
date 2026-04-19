import { CalendarDays, Clock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";
import bgMintGrid from "@/assets/bg-mint-grid.jpg";
import leaf from "@/assets/leaf.png";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <section
      className="min-h-[90vh] flex items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgMintGrid})`,
        backgroundRepeat: "repeat",
        backgroundSize: "600px",
      }}
    >
      {/* Soft white overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60 pointer-events-none" />

      {/* Floating leaves */}
      <img src={leaf} alt="" aria-hidden className="absolute top-8 left-4 md:left-16 w-24 md:w-40 -rotate-12 opacity-90 pointer-events-none animate-float-blob" />
      <img src={leaf} alt="" aria-hidden className="absolute top-20 right-4 md:right-20 w-28 md:w-48 rotate-45 opacity-90 pointer-events-none animate-float-blob" style={{ animationDelay: "3s" }} />
      <img src={leaf} alt="" aria-hidden className="absolute bottom-32 left-8 md:left-32 w-20 md:w-32 rotate-180 opacity-80 pointer-events-none animate-float-blob" style={{ animationDelay: "6s" }} />
      <img src={leaf} alt="" aria-hidden className="absolute bottom-48 right-8 md:right-40 w-24 md:w-36 -rotate-45 opacity-85 pointer-events-none animate-float-blob" style={{ animationDelay: "2s" }} />

      <div className="container py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Pendaftaran Dibuka
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            <span className="text-gradient-primary">{WEBINAR_CONFIG.title}</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            {WEBINAR_CONFIG.subtitle}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base text-foreground/80">
            <div className="flex items-center gap-2 liquid-glass px-3 py-1.5 rounded-full">
              <CalendarDays className="h-5 w-5 text-primary" />
              {WEBINAR_CONFIG.date}
            </div>
            <div className="flex items-center gap-2 liquid-glass px-3 py-1.5 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
              {WEBINAR_CONFIG.time}
            </div>
            <div className="flex items-center gap-2 liquid-glass px-3 py-1.5 rounded-full">
              <User className="h-5 w-5 text-primary" />
              {WEBINAR_CONFIG.speaker}
            </div>
          </div>

          {/* Price */}
          <div className="text-2xl md:text-3xl font-bold text-primary">
            {WEBINAR_CONFIG.price}
          </div>

          {/* CTA */}
          <Button variant="cta" size="lg" className="text-base md:text-lg px-8 py-6 rounded-xl" onClick={onRegisterClick}>
            Daftar Sekarang
          </Button>
        </div>

        {/* Benefits */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-8">
            Apa yang Akan Anda Dapatkan?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {WEBINAR_CONFIG.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 liquid-glass rounded-xl p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm md:text-base text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cloud bottom decoration (SVG) */}
      <svg
        aria-hidden
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          fill="white"
          d="M0,120 C80,80 160,160 240,120 C320,80 400,160 480,120 C560,80 640,160 720,120 C800,80 880,160 960,120 C1040,80 1120,160 1200,120 C1280,80 1360,160 1440,120 L1440,200 L0,200 Z"
          opacity="0.95"
        />
        <path
          fill="white"
          d="M0,160 C100,130 200,180 300,160 C400,130 500,180 600,160 C700,130 800,180 900,160 C1000,130 1100,180 1200,160 C1300,130 1400,180 1440,160 L1440,200 L0,200 Z"
        />
      </svg>
    </section>
  );
};

export default HeroSection;
