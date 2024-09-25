"use client";
import { useContext, useEffect, useState } from "react";
import { Ticket } from "../type";
import { TicketModalContext } from "@/features/lists/components/ListColumn";

export function TicketCard({ ticket }: { ticket: Ticket }) {

  const openTicketModal = useContext(TicketModalContext);
  const getDisplayPeriod = (period: Date) => {
    if(period){
      return period.toLocaleDateString();
    }else{
      return '';
    }
  }

  return (
    <button
      onClick={() => openTicketModal(ticket)}
      className="text-left w-full shadow-sm rounded-xl px-4 py-1 bg-base-100 text-base-content h-16 overflow-y-hidden"
    >
      <h4 className="text-lg border-b-2 border-base-200/20">{ticket.title}</h4>
      <div className="flex text-xs text-base-content/50">
        <div className="w-10">
          期限:
        </div>
        <div className="flex justify-between w-full">
          <div>{getDisplayPeriod(ticket.from_period)}</div>
          <div> 〜 </div>
          <div>{getDisplayPeriod(ticket.to_period)}</div>
        </div>
      </div>
    </button>
  );
}