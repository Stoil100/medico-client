import { z } from "zod";

export const doctorSchema = (t: (args: string) => string) =>
    z.object({
        prescriptions: z.array(
            z.object({
                patient: z.string({ message: t("patient") }),
                medicaments: z
                    .array(
                        z.object({
                            number: z
                                .number()
                                .min(1, { message: t("medicaments.number") }),
                            value: z
                                .string()
                                .min(1, { message: t("medicaments.value") }),
                        })
                    )
                    .min(1, { message: t("medicaments.required") }),
                ucn: z.string().length(10, { message: t("ucn") }),
            })
        ),
    });
export type DoctorType = z.infer<ReturnType<typeof doctorSchema>>;
