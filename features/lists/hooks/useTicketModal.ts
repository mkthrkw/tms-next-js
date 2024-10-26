import { getTicketNestedData } from "@/features/tickets/actions";
import { TicketNestedData } from "@/features/tickets/type";
import { useRef, useState } from "react";

export const useTicketModal = () => {
  const ticketDialog = useRef<HTMLDialogElement>(null);
  const [ticketModalProps, setTicketModalProps] = useState<TicketNestedData | null>(null);

  const setTicketNestedData = async (ticketId:string) => {
    const ticketNestedData:TicketNestedData = await getTicketNestedData(ticketId);
    if (ticketNestedData.from_period) {
      ticketNestedData.from_period = new Date(ticketNestedData.from_period);
    }
    if (ticketNestedData.to_period) {
      ticketNestedData.to_period = new Date(ticketNestedData.to_period);
    }
    setTicketModalProps(ticketNestedData);
  };
  const handleTicketModalOpen = (ticketId:string) => {
    setTicketNestedData(ticketId);
    ticketDialog.current?.showModal();
  }
  const updateTicketModalProps = (params:Partial<TicketNestedData>) => {
    setTicketModalProps((prev) => {
      if(!prev) return null;
      return {
        ...prev,
        ...params,
        updated_at:new Date()
      };
    });
  };

  return { ticketDialog, ticketModalProps ,updateTicketModalProps, handleTicketModalOpen, setTicketNestedData };
}