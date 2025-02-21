import { z } from "zod";
export const doctorSchema = z.object({
    prescriptions: z.array(
        z.object({
            patient: z.string({ message: "Полето е задължително" }),
            medicaments: z
                .array(
                    z.object({
                        number: z.number().min(1, "Поне един брой"),
                        value: z.string().min(1, "Полето е задължително"),
                    })
                )
                .min(1, "Полето е задължително"),
            ucn: z.string().length(10, "Невалидно ЕГН"),
        })
    ),
});
