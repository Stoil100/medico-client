import { z } from "zod";

export const adminLoginSchema = (t: (args: string) => string) =>
    z.object({
        email: z.string().email({ message: t("email") }),
        password: z.string().min(8, { message: t("password") }),
    });
export type AdminLoginType = z.infer<ReturnType<typeof adminLoginSchema>>;

export const addModeratorSchema = (t: (args: string) => string) =>
    z.object({
        firstName: z.string().min(2, {
            message: t("firstName"),
        }),
        secondName: z.string().optional(),
        lastName: z.string().min(2, {
            message: t("lastName"),
        }),
        type: z.enum(["doctor", "pharmacy", "citizen", "medicament"]),
        email: z.string().email({
            message: t("email"),
        }),
        password: z.string().min(8, {
            message: t("password"),
        }),
    });
export type AddModeratorType = z.infer<
    ReturnType<typeof addModeratorSchema>
>;
