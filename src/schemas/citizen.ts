import { z } from "zod";

export const citizenLoginSchema = (t: (args: string) => string) =>
    z.object({
        email: z.string().email({ message: t("email") }),
        password: z.string().min(3, { message: t("password") }),
    });
export type CitizenLoginType = z.infer<ReturnType<typeof citizenLoginSchema>>;