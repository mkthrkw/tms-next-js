import { useActionHandler } from "@/hooks/useActionHandler";
import { TicketNestedData } from "../type";
import { updateTicket } from "../actions";
import { dayStart, tzDate } from '@formkit/tempo';
import { getDateOnlyShortStyle } from '@/lib/tempo/actions';
import { TicketSchemaType } from "../schema";

export function useTicketUpdate({
  modalProps,
  updateProps,
}:{
  modalProps:TicketNestedData | null,
  updateProps:(params:Partial<TicketNestedData>) => void,
}) {

  const { handleAction } = useActionHandler({
    action: updateTicket,
  });

  const handleBlur = async (inputValues: TicketSchemaType) => {
    if(!modalProps) return;

    const changedParams = Object.entries(inputValues).find(([key,value]) => {
      const modalProp = modalProps[key as keyof TicketNestedData];
      const isChangedDate = value instanceof Date && modalProp instanceof Date;
      if(isChangedDate) {
        return getDateOnlyShortStyle(value) !== getDateOnlyShortStyle(modalProp);
      }
      return value !== modalProp;
    });

    if(!changedParams) return;
    if(changedParams[1] instanceof Date) {
      changedParams[1] = tzDate(dayStart(changedParams[1]), 'UTC');
    }
    const params = Object.fromEntries([changedParams]);
    handleAction(params, modalProps.id);
    updateProps(params);
  }

  return { handleBlur };
}