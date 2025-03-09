import { Medicament } from "@/models/Medicament";
import { Doctor } from "@/models/Doctor";

export interface Citizen {
    firstName: string;
    secondName: string;
    lastName: string;
    age: number;
    birthday: string;
    sex: string;
    ucn: string;
    email: string;
}

// interface PersonalDoctor {
//     firstName: string;
//     secondName: string;
//     lastName: string;
//     UIN: string;
//     email: string;
// }

export interface CitizenPrescription {
    id: string;
    name: string;
    status: "active" | "fulfilled" | "invalid";
    issuedDate: string;
    // expirationDate: string;
    medicaments: Medicament[];
    doctor: Doctor;
}

export interface CitizenPharmacy {
    id: string
    name: string
    latitude: number
    longitude: number
}