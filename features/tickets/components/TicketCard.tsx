"use client";
import { useContext, useEffect, useState } from "react";
import { Ticket } from "../type";
import { OpenTicketModalContext } from "@/features/lists/components/ListColumn";
import { getDateOnlyShortStyle } from "@/lib/tempo/actions";

export function TicketCard({ ticket }: { ticket: Ticket }) {

  const openTicketModal = useContext(OpenTicketModalContext);
  const hasPeriod = ticket.from_period || ticket.to_period;

  return (
    <button
      onClick={() => openTicketModal(ticket.id)}
      className="text-left w-full shadow-sm rounded-xl px-4 py-1 bg-base-100 text-base-content h-16 overflow-y-hidden"
    >
      <h4 className="text-lg border-b-2 border-base-200/20">{ticket.title}</h4>
      {hasPeriod && (
        <div className="flex text-xs text-base-content/50">
          <div className="w-10">
            期間:
          </div>
          <div className="flex justify-between w-full">
            <div>{getDateOnlyShortStyle(ticket.from_period)}</div>
            <div> 〜 </div>
            <div>{getDateOnlyShortStyle(ticket.to_period)}</div>
          </div>
        </div>
      )}
    </button>
  );
}