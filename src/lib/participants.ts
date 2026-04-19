import { type RegistrationData } from "@/components/RegistrationForm";

export interface Participant {
  id: string;
  registrationData: RegistrationData;
  paymentMethod: string;
  proofFileName: string;
  registeredAt: string;
  status: "pending" | "verified" | "rejected";
}

const STORAGE_KEY = "webinar_participants";

export const getParticipants = (): Participant[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addParticipant = (
  registrationData: RegistrationData,
  paymentMethod: string,
  proofFileName: string
): Participant => {
  const participant: Participant = {
    id: crypto.randomUUID(),
    registrationData,
    paymentMethod,
    proofFileName,
    registeredAt: new Date().toISOString(),
    status: "pending",
  };
  const participants = getParticipants();
  participants.push(participant);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  return participant;
};

export const updateParticipantStatus = (id: string, status: Participant["status"]) => {
  const participants = getParticipants();
  const index = participants.findIndex((p) => p.id === id);
  if (index !== -1) {
    participants[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  }
};

export const deleteParticipant = (id: string) => {
  const participants = getParticipants().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
};
