import { z } from "zod";

export const addPharmacistSchema = (t: (args: string) => string) =>
    z.object({
        firstName: z.string({ message: t("firstName") }),
        secondName: z.string({ message: t("secondName") }),
        lastName: z.string({ message: t("lastName") }),
        pharmacy: z.string().min(1, { message: t("pharmacy") }),
    });

export type AddPharmacistType = z.infer<ReturnType<typeof addPharmacistSchema>>;

export const addMedicamentsSchema = (t: (args: string) => string) =>
    z.object({
        medicaments: z.array(
            z.object({
                id: z.number(),
                value: z.string().min(1, { message: t("value") }),
                number: z.number().min(1, { message: t("number") }),
            })
        ),
    });

export type AddMedicamentsType = z.infer<
    ReturnType<typeof addMedicamentsSchema>
>;

export const addBranchSchema = (t: (args: string) => string) =>
    z.object({
        name: z
            .string()
            .min(2, {
                message: t("name.min"),
            })
            .max(50, {
                message: t("name.max"),
            }),
        latitude: z.coerce
            .number()
            .min(-90, { message: t("lat") })
            .max(90, { message: t("lat") }),
        longitude: z.coerce
            .number()
            .min(-180, { message: t("lng") })
            .max(180, { message: t("lng") }),
    });

export type AddBranchType = z.infer<ReturnType<typeof addBranchSchema>>;

export const listPrescriptionsSchema = (t: (args: string) => string) =>
    z.object({
        ucn: z.string().length(10, { message: t("ucn") }),
        prescriptions: z
            .array(
                z.object({
                    id: z.number({ message: t("prescriptionId") }),
                    medicaments: z
                        .array(
                            z.object({
                                id: z.number({ message: t("medicamentId") }),
                                name: z
                                    .string()
                                    .min(1, { message: t("medicamentName") }),
                                quantity: z
                                    .number()
                                    .min(1, { message: t("quantity") }),
                                fulfilled: z.boolean(),
                            })
                        )
                        .min(1, { message: t("medicamentsRequired") }),
                })
            )
            .min(1, { message: t("prescriptionsRequired") })
            .optional(),
    });

export type ListPrescriptionsType = z.infer<
    ReturnType<typeof listPrescriptionsSchema>
>;
