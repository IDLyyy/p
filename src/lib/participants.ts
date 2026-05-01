import { supabase } from "@/integrations/supabase/client";
import { type RegistrationData } from "@/components/RegistrationForm";

export interface Participant {
  id: string;
  registrationData: RegistrationData;
  paymentMethod: string;
  proofFileName: string;
  registeredAt: string;
  status: "pending" | "verified" | "rejected";
  paymentStatus?: string;
  amount?: number;
}

// Map DB row to Participant
function rowToParticipant(row: Record<string, unknown>): Participant {
  return {
    id: row.id as string,
    registrationData: {
      fullName: row.full_name as string,
      email: row.email as string,
      phone: row.phone as string,
      profession: row.profession as string,
      background: row.background as string,
      referralCode: (row.referral_code as string) || "",
      ticketType: (row.ticket_type as "vip" | "regular") || "regular",
    },
    paymentMethod: "midtrans",
    proofFileName: (row.order_id as string) || "",
    registeredAt: row.registered_at as string,
    status: row.status as "pending" | "verified" | "rejected",
    paymentStatus: row.payment_status as string,
    amount: row.amount as number,
  };
}

export const getParticipants = async (): Promise<Participant[]> => {
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("registered_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch participants:", error);
    return [];
  }
  return (data || []).map(rowToParticipant);
};

export const addParticipant = async (
  registrationData: RegistrationData,
  paymentMethod: string,
  proofFileName: string
): Promise<Participant | null> => {
  const { data, error } = await supabase
    .from("participants")
    .insert({
      full_name: registrationData.fullName,
      email: registrationData.email,
      phone: registrationData.phone,
      profession: registrationData.profession,
      background: registrationData.background,
      referral_code: registrationData.referralCode || null,
      ticket_type: registrationData.ticketType || "regular",
      order_id: proofFileName,
      payment_status: "PAID",
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to add participant:", error);
    return null;
  }
  return rowToParticipant(data);
};

export const updateParticipantStatus = async (
  id: string,
  status: Participant["status"]
) => {
  const { error } = await supabase
    .from("participants")
    .update({ status })
    .eq("id", id);

  if (error) console.error("Failed to update status:", error);
};

export const deleteParticipant = async (id: string) => {
  const { error } = await supabase
    .from("participants")
    .delete()
    .eq("id", id);

  if (error) console.error("Failed to delete participant:", error);
};
