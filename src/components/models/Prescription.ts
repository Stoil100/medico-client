import { Doctor } from "./Doctor";
import { Medicament } from "./Medicament";

export type Prescription ={
    id: string;
    name: string;
    status: "active" | "fulfilled" | "invalid";
    issuedDate: string;
    expirationDate: string;
    medicaments: Medicament[];
    doctor: Doctor;
}
