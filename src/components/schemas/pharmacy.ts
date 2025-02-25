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
    ucn: z.string(),
    prescriptions: z
      .array(
        z.object({
          id: z.number(),
          medicaments: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              quantity: z.number(),
              fulfilled: z.boolean(),
            }),
          ),
        }),
      )
      .optional(),
  })
  