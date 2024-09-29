import { z } from 'zod';

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください。' })
    .max(30, { message: 'タイトルは30文字以内で入力してください。' }),
  description: z
    .string()
    .max(1000, { message: '説明は1000文字以内で入力してください。' })
    .nullish(),
  from_period: z
    .date()
    .nullish(),
  to_period: z
    .date()
    .nullish(),
});

export type TicketSchemaType = z.infer<typeof ticketSchema>;