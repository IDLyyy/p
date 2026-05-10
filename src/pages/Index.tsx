import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import RegistrationForm, { type RegistrationData } from "@/components/RegistrationForm";
import PaymentSection from "@/components/PaymentSection";
import SuccessPage from "@/components/SuccessPage";
import { addParticipant } from "@/lib/participants";

type Step = "hero" | "register" | "payment" | "success";

const Index = () => {
  const [step, setStep] = useState<Step>("hero");
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    setStep("register");
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleRegistration = (data: RegistrationData) => {
    setRegistrationData(data);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSuccess = async (orderId: string, status: string) => {
    if (registrationData) {
      await addParticipant(registrationData, "midtrans", orderId);
    }
    setStep("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "success") return <SuccessPage ticketType={registrationData?.ticketType || "regular"} />;

  return (
    <div className="min-h-screen">
      {(step === "hero" || step === "register") && (
        <>
          <HeroSection onRegisterClick={scrollToForm} />
          {step === "register" && (
            <div ref={formRef}>
              <RegistrationForm onSubmit={handleRegistration} />
            </div>
          )}
        </>
      )}
      {step === "payment" && registrationData && (
        <PaymentSection
          registrationData={registrationData}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStep("register")}
        />
      )}
    </div>
  );
};

export default Index;
