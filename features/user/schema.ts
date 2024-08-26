import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください' })
    .min(1, { message: 'メールアドレスは空欄に出来ません' })
    .max(100, { message: 'メールアドレスが長すぎます' }),
  name: z
    .string()
    .max(30, { message: '名前は30文字以内にしてください' })
    .nullable(),
});

export type UserSchemaType = z.infer<typeof userSchema>;