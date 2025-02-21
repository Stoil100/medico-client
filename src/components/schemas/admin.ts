import { z } from "zod";

export const addModeratorSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    secondName: z.string().optional(),
    surname: z.string().min(2, {
        message: "Surname must be at least 2 characters.",
    }),
    role: z.enum(["doctor", "pharmacy", "citizen", "medicaments"]),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});
