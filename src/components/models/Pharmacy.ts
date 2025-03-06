import { Medicament } from "@/components/models/Medicament";
import { Doctor } from "@/components/models/Doctor";

export interface Pharmacy {
    id: string
    name: string
    // address: string
    lat: number
    lng: number
    // distance?: string
}

export interface PharmacyOwnerBranch {
    id: string
    name: string
}

export interface PharmacistPrescriptions {
    id: string;
    name: string;
    issuedDate: string;
    expirationDate: string;
    medicaments: Medicament[];
    doctor: Doctor;
}