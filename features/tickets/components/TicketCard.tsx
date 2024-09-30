"use client";
import { useContext, useEffect, useState } from "react";
import { Ticket } from "../type";
import { OpenTicketModalContext } from "@/features/lists/components/ListColumn";
import { getDateOnlyShortStyle } from "@/lib/tempo/actions";
import { CompleteBadge } from "@/components/common/CompleteBadge";

export function TicketCard({ ticket }: { ticket: Ticket }) {

  const openTicketModal = useContext(OpenTicketModalContext);
  const hasPeriod = ticket.from_period || ticket.to_period;

  return (
    <button
      onClick={() => openTicketModal(ticket.id)}
      className="flex flex-col text-left w-full shadow-sm rounded-xl px-3 py-2 bg-base-100 text-base-content min-h-20 overflow-y-hidden"
    >
      <div className="flex justify-between w-full">
        <div className="text-xs text-base-content/50">#{ticket.display_id}</div>
        <CompleteBadge completed={ticket.completed} />
      </div>
      <h4 className="text-xl py-1">{ticket.title}</h4>
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