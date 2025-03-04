import { z } from "zod";


export const moderatorLoginSchema = (t: (args: string) => string) =>
    z.object({
        email: z.string().email({ message: t("email") }),
        password: z.string().min(8, { message: t("password") })
    });
export type ModeratorLoginType = z.infer<ReturnType<typeof moderatorLoginSchema>>;

export const moderatorCitizenSchema = (t: (args: string) => string) =>
    z.object({
        firstName: z.string({ message: t("firstName") }),
        secondName: z.string({ message: t("secondName") }),
        lastName: z.string({ message: t("lastName") }),
        ucn: z.string().length(10, { message: t("ucn") }),
        email: z.string().email({ message: t("email") }),
        password: z.string().min(8, { message: t("password") })
    });

export type ModeratorCitizenType = z.infer<ReturnType<typeof moderatorCitizenSchema>>;

export const moderatorMedicamentSchema = (t: (args: string) => string) =>
    z.object({
        name: z.string({ message: t("name") }),
        atc: z.string().min(1, { message: t("atc") }),
        activeIngridients: z.array(
            z.object({
                id: z.string(),
                value: z.string().min(1, { message: t("activeIngridients") })
            })
        )
    });

export type ModeratorMedicamentType = z.infer<ReturnType<typeof moderatorMedicamentSchema>>;

export const moderatorDoctorSchema = (t: (args: string) => string) =>
    z.object({
        firstName: z.string({ message: t("firstName") }),
        secondName: z.string({ message: t("secondName") }),
        lastName: z.string({ message: t("lastName") }),
        uin: z.string().length(10, { message: t("uin") }),
        email: z.string().email({ message: t("email") }),
        password: z.string().min(8, { message: t("password") })
    });

export type ModeratorDoctorType = z.infer<ReturnType<typeof moderatorDoctorSchema>>;

// export const moderatorPharmacistSchema = (t: (args: string) => string) =>
//   z.object({
//     firstName: z.string({ message: t("firstName") }),
//     secondName: z.string({ message: t("middleName") }),
//     lastName: z.string({ message: t("lastName") }),
//     pharmacy: z.string().min(1, { message: t("pharmacy") }),
//   });

// export type ModeratorPharmacistType = z.infer<ReturnType<typeof moderatorPharmacistSchema>>;

export const moderatorPharmacySchema = (t: (args: string) => string) =>
    z.object({
        name: z.string({ message: t("name") }),
        ownerName: z.string({ message: t("owner") }),
        ownerEmail: z.string().email({ message: t("ownerEmail") }),
        ownerPassword: z.string().min(8, { message: t("ownerPassword") })
    });

export type ModeratorPharmacyType = z.infer<ReturnType<typeof moderatorPharmacySchema>>;
