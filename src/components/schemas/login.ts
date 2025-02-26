import { z } from "zod";

export const loginSchema = (t: (args: string) => string) =>
    z.object({
      email: z.string().email({ message: t("email") }),
      password: z.string().min(8, { message: t("password") }),
    });
export type LoginType = z.infer<ReturnType<typeof loginSchema>>;