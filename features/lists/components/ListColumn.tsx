"use client";
import { ListCard } from './ListCard';
import { ProjectNestedData } from '@/features/projects/type';
import { List } from '../type';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import { customClosestCorners } from '@/lib/dnd_kit/customClosestCorners';
import { TicketCard } from '@/features/tickets/TicketCard';
import { Ticket } from '@/features/tickets/type';
import {
  getMovedLists,
  getMovedTicketsOtherContainer,
  getMovedTicketsSameContainer,
  updateMovedLists,
  updateMovedTickets
} from '@/lib/dnd_kit/actions';


export function ListColumn({projectNestedData}:{projectNestedData:ProjectNestedData}) {
  const [lists, setLists] = useState<List[]>(projectNestedData.lists);
  const [activeTicket, setActiveTicket] = useState<Ticket | undefined>();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={(args) => customClosestCorners(args, projectNestedData)}
      id={projectNestedData.id}
    >
      <SortableContext
        items={lists.map((list) => list.id)}
        id={projectNestedData.id}
        key={projectNestedData.id}
      >
        {lists.map((list:List) => (
          <ListCard list={list} key={list.id} />
        ))}
      </SortableContext>
      {activeTicket && (
        <DragOverlay>
          <TicketCard ticket={activeTicket}/>
        </DragOverlay>
      )}
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveTicket(lists.flatMap((list) => list.tickets).find((ticket) => ticket.id === event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    if(event.active.data.current?.containerId === projectNestedData.id) return;
    const listsWithMovedTickets = getMovedTicketsOtherContainer(event, projectNestedData);
    if (!listsWithMovedTickets) return;
    const { fromList, toList } = listsWithMovedTickets;
    setLists(lists.map((list) => {
      if(list.id === fromList.id){
        return fromList;
      }
      if(list.id === toList.id){
        return toList;
      }
      return list;
    }));
    updateMovedTickets([fromList, toList], projectNestedData.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTicket(undefined);
    if(event.active.data.current?.sortable.containerId === projectNestedData.id){
      const movedLists = getMovedLists(event, lists);
      if(!movedLists) return;
      setLists(movedLists);
      updateMovedLists(movedLists, projectNestedData.id);
    }else{
      const listsWithMovedTickets = getMovedTicketsSameContainer(event, projectNestedData);
      if(!listsWithMovedTickets) return;
      setLists(lists.map((list) => {
        if(list.id === listsWithMovedTickets.id){
          return listsWithMovedTickets;
        }
        return list
      }));
      updateMovedTickets([listsWithMovedTickets], projectNestedData.id);
    }
  }
}