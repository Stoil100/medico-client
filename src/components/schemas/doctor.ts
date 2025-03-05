import { z } from "zod";

export const doctorLoginSchema = (t: (args: string) => string) =>
    z.object({
        email: z.string().email({ message: t("email") }),
        password: z.string().min(8, { message: t("password") }),
    });
export type DoctorLoginType = z.infer<ReturnType<typeof doctorLoginSchema>>;

export const searchCitizenSchema = (t: (args: string) => string) =>
    z.object({
        // patient: z.string({ message: t("patient") }),
        ucn: z.string().length(10, { message: t("ucn") }),
    });

export type SearchCitizenType = z.infer<ReturnType<typeof searchCitizenSchema>>;

export const issuePrescriptionSchema = (t: (args: string) => string) =>
    z.object({
        citizenId: z.string().uuid(),
        name: z.string().min(3, { message: t("name") }),
        medicaments: z
            .array(
                z.object({
                    quantity: z.number().min(1, { message: t("number") }),
                    officialName: z.string().min(1, { message: t("value") }),
                })
            )
            .min(1, { message: t("required") }),
    });

export type IssuePrescriptionType = z.infer<
    ReturnType<typeof issuePrescriptionSchema>
>;
