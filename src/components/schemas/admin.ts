import { z } from "zod";

export const addModeratorSchema = (t: (args: string) => string) =>
    z.object({
        firstName: z.string().min(2, {
            message: t("firstName"),
        }),
        secondName: z.string().optional(),
        surname: z.string().min(2, {
            message: t("surname"),
        }),
        role: z.enum(["doctor", "pharmacy", "citizen", "medicaments"]),
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
