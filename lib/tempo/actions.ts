import { format } from "@formkit/tempo";

export function getDateTimeFullStyle(date: Date | null| undefined) {
  if(!date) return '';
  return format(date, 'YYYY年MM月DD日(d) HH:mm:ss', 'ja');
}

export function getDateOnlyShortStyle(date: Date | null | undefined) {
  if(!date) return '';
  return format(date, 'YYYY/MM/DD', 'ja');
}