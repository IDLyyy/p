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
    align: "left" as const,
  },
  {
    name: "KH Syihabuddin Abdul Mu'iz",
    title: "Pimpinan Ma'had Tahfizhul Qur'an Isy Karima",
    photo: pakSyhab,
    desc: "Seorang ulama dan pendidik Al-Qur'an yang berpengaruh dalam membina generasi muda. Dikenal dengan penyampaian yang mendalam dan relevan, beliau mengajarkan pentingnya membangun mindset sukses yang seimbang antara spiritualitas dan kehidupan dunia, khususnya dalam menjalankan usaha dan menjaga istiqomah.",
    align: "right" as const,
  },
];

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <>
      {/* ═══════════ SLIDE 1: HERO — like sss3.png ═══════════ */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* White background with bg1.jpg ornamental pattern */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#ffffff",
          }}
        />

        {/* Gold corner ornaments (top-left, top-right) */}
        <div className="absolute top-3 left-3 md:top-5 md:left-5 z-10 text-3xl md:text-4xl opacity-80 select-none">🏮</div>
        <div className="absolute top-3 right-3 md:top-5 md:right-5 z-10 text-3xl md:text-4xl opacity-80 select-none">🏮</div>
        {/* Gold corner ornament (bottom-right) */}
        <div className="absolute bottom-6 right-4 md:bottom-10 md:right-8 z-10 opacity-60 select-none">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
            <rect x="12" y="12" width="16" height="16" rx="2" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
            <rect x="20" y="20" width="16" height="16" rx="2" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Logos */}
        <div className="absolute top-4 left-14 md:top-6 md:left-16 z-20 flex items-center gap-2">
          <img src={marverLogo} alt="Marver" className="h-8 w-8 md:h-10 md:w-10 rounded-lg object-cover shadow-sm" />
          <img src={logoIsyKarima} alt="ISY Karima" className="h-8 w-8 md:h-10 md:w-10 rounded-lg object-cover shadow-sm" />
        </div>

        <div className="container py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Title — teal/azure gradient like sss3 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span
                style={{
                  background: "linear-gradient(135deg, #0891b2 0%, #1a56db 50%, #0a1e5e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {WEBINAR_CONFIG.title}
              </span>
            </h1>

            <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#4b5563" }}>
              {WEBINAR_CONFIG.subtitle}
            </p>

            {/* Meta info pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #0891b2, #1a56db)" }}
              >
                <CalendarDays className="h-4 w-4" />
                {WEBINAR_CONFIG.date}
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #1a56db, #0a1e5e)" }}
              >
                <Clock className="h-4 w-4" />
                {WEBINAR_CONFIG.time}
              </div>
            </div>

            {/* Speaker names */}
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#1a56db" }}>
              <User className="h-4 w-4 inline mr-1 -mt-0.5" />
              {WEBINAR_CONFIG.speaker}
            </p>

            {/* CTA */}
            <Button
              variant="cta"
              size="lg"
              className="text-base md:text-lg px-10 py-6 rounded-xl shadow-lg"
              onClick={() =>
                document
                  .getElementById("pricing-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ SLIDE 2: SPEAKERS — like sss2.png, white bg ═══════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-white">
        {/* bg1.jpg ornamental background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
          }}
        />

        <div className="container max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#1a56db" }}>
              Pembicara
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0a1e5e" }}>
              Belajar Langsung dari Para Ahli
            </h2>
          </div>

          <div className="space-y-8">
            {speakers.map((speaker, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1a2e5e 0%, #1e3a6e 50%, #162b55 100%)",
                }}
              >
                <div
                  className={`flex flex-col ${
                    speaker.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  {/* Photo */}
                  <div className="w-full md:w-[280px] shrink-0 p-6 md:p-8 flex justify-center">
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="w-40 h-48 md:w-48 md:h-56 object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 text-center md:text-left">
                    <p className="text-sm md:text-base leading-relaxed text-white/80 italic mb-6">
                      {speaker.desc}
                    </p>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {speaker.name}
                      </h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: "#60a5fa" }}>
                        {speaker.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SLIDE 3: Pricing — like sss1.png ═══════════ */}
      <div id="pricing-section">
        <PricingSection onRegisterClick={onRegisterClick} />
      </div>
    </>
  );
};

export default HeroSection;
