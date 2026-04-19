import { CalendarDays, Clock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR_CONFIG } from "@/config/webinar";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden gradient-hero">
      {/* Animated gradient orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(221,83%,53%,0.25)] blur-[120px] animate-float-blob pointer-events-none" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[hsl(199,89%,48%,0.2)] blur-[100px] animate-float-blob pointer-events-none"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[hsl(260,70%,60%,0.12)] blur-[80px] animate-float-blob pointer-events-none"
        style={{ animationDelay: "8s" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full liquid-glass-dark px-4 py-1.5 text-sm font-medium text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
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
              <CalendarDays className="h-4 w-4 text-blue-400" />
              {WEBINAR_CONFIG.date}
            </div>
            <div className="flex items-center gap-2 liquid-glass-dark px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-400" />
              {WEBINAR_CONFIG.time}
            </div>
            <div className="flex items-center gap-2 liquid-glass-dark px-4 py-2 rounded-full">
              <User className="h-4 w-4 text-blue-400" />
              {WEBINAR_CONFIG.speaker}
            </div>
          </div>

          {/* Price */}
          <div className="text-2xl md:text-3xl font-bold text-white">
            <span className="liquid-glass-dark px-6 py-2 rounded-full inline-block">
              {WEBINAR_CONFIG.price}
            </span>
          </div>

          {/* CTA */}
          <Button variant="cta" size="lg" className="text-base md:text-lg px-8 py-6 rounded-xl shadow-[0_0_30px_hsl(221,83%,53%,0.4)]" onClick={onRegisterClick}>
            Daftar Sekarang
          </Button>
        </div>

        {/* Benefits */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-8">
            Apa yang Akan Anda Dapatkan?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {WEBINAR_CONFIG.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 liquid-glass-dark rounded-xl p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm md:text-base text-white/85">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom decoration */}
      <svg
        aria-hidden
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          fill="hsl(220, 30%, 96%)"
          d="M0,120 C80,80 160,160 240,120 C320,80 400,160 480,120 C560,80 640,160 720,120 C800,80 880,160 960,120 C1040,80 1120,160 1200,120 C1280,80 1360,160 1440,120 L1440,200 L0,200 Z"
          opacity="0.7"
        />
        <path
          fill="hsl(220, 30%, 96%)"
          d="M0,160 C100,130 200,180 300,160 C400,130 500,180 600,160 C700,130 800,180 900,160 C1000,130 1100,180 1200,160 C1300,130 1400,180 1440,160 L1440,200 L0,200 Z"
        />
      </svg>
    </section>
  );
};

export default HeroSection;
