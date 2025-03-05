export interface Moderator {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: "doctor" | "citizen" | "medicament" | "pharmacy";
}