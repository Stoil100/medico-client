import { z } from "zod";

export const moderatorCitizenSchema = z.object({
    firstName: z.string({ message: "Полето е задължително" }),
    middleName: z.string({ message: "Полето е задължително" }),
    lastName: z.string({ message: "Полето е задължително" }),
    ucn: z.string().length(10, "Невалидно ЕГН"),
    email: z.string().email(),
    password: z.string(),
});

export const moderatorMedicamentSchema = z.object({
    medicaments: z
        .array(
            z.object({
                name: z.string({ message: "Полето е задължително" }),
                atc: z.string().min(1, "Полето е задължително"),
                activeIngridients: z.array(
                    z.object({
                        id: z.string(),
                        value: z.string().min(1, "Полето е задължително"),
                    })
                ),
            })
        )
        .min(1, "Полето е задължително"),
});

export const moderatorDoctorSchema = z.object({
    firstName: z.string({ message: "Полето е задължително" }),
    middleName: z.string({ message: "Полето е задължително" }),
    lastName: z.string({ message: "Полето е задължително" }),
    uin: z.string().length(10, "Невалиден УИН"),
    email: z.string().email(),
    password: z.string(),
});

export const moderatorPharmacistSchema = z.object({
    firstName: z.string({ message: "Полето е задължително" }),
    middleName: z.string({ message: "Полето е задължително" }),
    lastName: z.string({ message: "Полето е задължително" }),
    pharmacy: z.string().min(1, "Полето е задължително"),
});

export const moderatorPharmacySchema = z.object({
    name: z.string({ message: "Полето е задължително" }),
    owner: z.string({ message: "Полето е задължително" }),
    ownerEmail: z.string().email(),
    ownerPassword: z.string(),
});
