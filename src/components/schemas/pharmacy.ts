import { z } from "zod";
export const addMedicamentsSchema = z.object({
    medicaments: z.array(
        z.object({
            id: z.number(),
            value: z.string().min(1, "Полето е задължително"),
            number: z.number().min(1, "Поне един брой"),
        })
    ),
});
export const listPrescriptionsSchema = z.object({
    ucn: z.string().length(10, { message: "UCN must be 10 characters long" }),
    prescriptions: z.array(
        z.object({
            id: z.number(),
            medicament: z.string(),
            quantity: z.number(),
            fulfilled: z.boolean(),
        })
    ),
});